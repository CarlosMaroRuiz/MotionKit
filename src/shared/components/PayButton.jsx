import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../core/context/AuthContext';

const PayButton = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [paymentWindowOpen, setPaymentWindowOpen] = useState(false);
  const [showFallbackLink, setShowFallbackLink] = useState(false);
  
  const { user } = useAuth();
  const API_BASE = import.meta.env.VITE_BASE_URL_API;
  const paymentWindowRef = useRef(null);
  const fallbackUrlRef = useRef('');

  // Cleanup cuando el componente se desmonta
  useEffect(() => {
    return () => {
      if (paymentWindowRef.current && !paymentWindowRef.current.closed) {
        paymentWindowRef.current.close();
      }
    };
  }, []);

  // Escuchar mensajes de la ventana de pago (si tu backend los soporta)
  useEffect(() => {
    const handleMessage = (event) => {
      // Verificar que el mensaje viene de PayPal
      if (event.origin.includes('paypal.com')) {
        if (event.data.type === 'payment_success') {
          setPaymentWindowOpen(false);
          setIsLoading(false);
          // Manejar éxito del pago
          console.log('Pago exitoso:', event.data);
        } else if (event.data.type === 'payment_cancel') {
          setPaymentWindowOpen(false);
          setIsLoading(false);
          setError('Pago cancelado por el usuario');
        }
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const buttonVariants = {
    initial: {
      scale: 1,
      boxShadow: "0px 0px 0px rgba(168, 85, 247, 0)"
    },
    hover: {
      scale: 1.05,
      boxShadow: "0px 0px 20px rgba(168, 85, 247, 0.5)"
    },
    tap: {
      scale: 0.98
    }
  };

  const sparkleVariants = {
    initial: { rotate: 0, scale: 1 },
    hover: {
      rotate: [0, 15, -15, 0],
      scale: [1, 1.2, 1],
      transition: {
        duration: 0.5,
        repeat: Infinity,
        repeatType: "reverse"
      }
    }
  };

  const particles = Array.from({ length: 3 }).map((_, i) => (
    <motion.div
      key={i}
      className="absolute"
      style={{
        width: '8px',
        height: '8px',
        borderRadius: '50%',
        backgroundColor: '#C084FC',
        top: '50%',
        left: '50%',
      }}
      animate={isHovered ? {
        x: [0, (i + 1) * 20 * Math.cos(i * Math.PI / 4)],
        y: [0, (i + 1) * 20 * Math.sin(i * Math.PI / 4)],
        opacity: [0, 1, 0],
      } : {}}
      transition={{
        duration: 0.8,
        repeat: Infinity,
        delay: i * 0.1
      }}
    />
  ));

  const handlePaymentClick = async () => {
    try {
      setIsLoading(true);
      setError(null);
      setShowFallbackLink(false);

      const token = user?.token || '';

      const response = await fetch(`${API_BASE}payment/create-order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'token': token
        },
        body: JSON.stringify({
          amount: 50.0,
          isPremiumUpgrade: true,
          returnUrl: window.location.origin + '/payment/success',
          cancelUrl: window.location.origin + '/payment/cancel'
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Error del servidor: ${response.status}`);
      }

      const data = await response.json();

      if (!data.data?.approvalUrl) {
        throw new Error('No se recibió un enlace de pago válido del servidor');
      }

      const paymentUrl = new URL(data.data.approvalUrl);
      paymentUrl.searchParams.set('source', 'web-app');
      fallbackUrlRef.current = paymentUrl.toString();

      // Configurar las dimensiones y características de la ventana
      const windowFeatures = [
        'width=800',
        'height=600',
        'scrollbars=yes',
        'resizable=yes',
        'toolbar=no',
        'menubar=no',
        'location=no',
        'status=no',
        'noopener',
        'noreferrer'
      ].join(',');

      // Abrir la ventana de pago
      paymentWindowRef.current = window.open(
        paymentUrl.toString(), 
        'paypal_payment', 
        windowFeatures
      );

      // Verificar si el popup fue bloqueado
      if (!paymentWindowRef.current || paymentWindowRef.current.closed) {
        setShowFallbackLink(true);
        setError('Los popups están bloqueados. Usa el enlace de abajo para continuar.');
        setIsLoading(false);
        return;
      }

      setPaymentWindowOpen(true);

      // Monitorear el estado de la ventana
      const checkWindowClosed = setInterval(() => {
        if (paymentWindowRef.current && paymentWindowRef.current.closed) {
          clearInterval(checkWindowClosed);
          setPaymentWindowOpen(false);
          setIsLoading(false);
          
          // Opcional: verificar el estado del pago después de cerrar la ventana
          setTimeout(() => {
            checkPaymentStatus();
          }, 2000);
        }
      }, 1000);

      // Limpiar el intervalo después de 30 minutos (timeout de PayPal)
      setTimeout(() => {
        clearInterval(checkWindowClosed);
        if (paymentWindowRef.current && !paymentWindowRef.current.closed) {
          paymentWindowRef.current.close();
        }
        setPaymentWindowOpen(false);
        setIsLoading(false);
      }, 30 * 60 * 1000);

    } catch (err) {
      console.error('Error en el pago:', err);
      setError(err.message || 'Ocurrió un error al procesar el pago');
      setIsLoading(false);
    }
  };

  // Función para verificar el estado del pago (opcional)
  const checkPaymentStatus = async () => {
    try {
      const token = user?.token || '';
      const response = await fetch(`${API_BASE}payment/status`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'token': token
        }
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          // Pago completado exitosamente
          console.log('Pago verificado como exitoso');
          // Aquí puedes actualizar el estado de la aplicación
        }
      }
    } catch (err) {
      console.log('No se pudo verificar el estado del pago:', err);
    }
  };

  const handleFallbackClick = () => {
    window.open(fallbackUrlRef.current, '_blank');
    setShowFallbackLink(false);
  };

  const cancelPayment = () => {
    if (paymentWindowRef.current && !paymentWindowRef.current.closed) {
      paymentWindowRef.current.close();
    }
    setPaymentWindowOpen(false);
    setIsLoading(false);
    setError('Pago cancelado');
  };

  return (
    <div className="relative">
      {/* Mensaje de error */}
      {error && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute -top-16 left-0 right-0 bg-red-500/20 text-red-400 text-sm py-3 px-4 rounded-lg border border-red-500/30 text-center shadow-lg backdrop-blur-sm"
        >
          <div className="flex items-center justify-center gap-2">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {error}
          </div>
          <button 
            onClick={() => setError(null)}
            className="absolute top-1 right-2 text-red-400 hover:text-red-300"
          >
            ×
          </button>
        </motion.div>
      )}

      {/* Enlace de fallback si el popup es bloqueado */}
      {showFallbackLink && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute -top-20 left-0 right-0 bg-blue-500/20 text-blue-400 text-sm py-3 px-4 rounded-lg border border-blue-500/30 text-center shadow-lg backdrop-blur-sm"
        >
          <button
            onClick={handleFallbackClick}
            className="underline hover:text-blue-300 font-medium"
          >
            Continuar con PayPal →
          </button>
        </motion.div>
      )}

      {/* Indicador de ventana de pago abierta */}
      {paymentWindowOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute -top-24 left-0 right-0 bg-green-500/20 text-green-400 text-sm py-3 px-4 rounded-lg border border-green-500/30 text-center shadow-lg backdrop-blur-sm"
        >
          <div className="flex items-center justify-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            Ventana de pago abierta - Completa tu pago en la nueva pestaña
          </div>
          <button
            onClick={cancelPayment}
            className="mt-2 text-xs underline hover:text-green-300"
          >
            Cancelar pago
          </button>
        </motion.div>
      )}

      {isHovered && !isLoading && particles}

      <motion.button
        className={`relative z-10 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium py-3 px-6 rounded-lg shadow-lg flex items-center gap-2 transition-opacity ${isLoading ? 'opacity-90 cursor-wait' : ''}`}
        variants={buttonVariants}
        initial="initial"
        whileHover={!isLoading ? "hover" : "initial"}
        whileTap={!isLoading ? "tap" : "initial"}
        onHoverStart={() => !isLoading && setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        onClick={!isLoading ? handlePaymentClick : undefined}
        disabled={isLoading}
      >
        {isLoading ? (
          <motion.div 
            className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-1"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        ) : (
          <motion.span
            className="inline-block"
            variants={sparkleVariants}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" clipRule="evenodd" />
            </svg>
          </motion.span>
        )}
        <span>
          {isLoading 
            ? (paymentWindowOpen ? 'Esperando pago...' : 'Procesando...') 
            : 'Adquirir Suscripción'
          }
        </span>
        <motion.div
          className="absolute inset-0 rounded-lg"
          initial={{ background: "linear-gradient(90deg, rgba(168, 85, 247, 0.2), rgba(236, 72, 153, 0.2))" }}
          animate={{
            background: isHovered && !isLoading
              ? "linear-gradient(90deg, rgba(168, 85, 247, 0.4), rgba(236, 72, 153, 0.4))"
              : "linear-gradient(90deg, rgba(168, 85, 247, 0.2), rgba(236, 72, 153, 0.2))"
          }}
          transition={{ duration: 0.3 }}
          style={{ zIndex: -1 }}
        />
      </motion.button>
    </div>
  );
};

export default PayButton;