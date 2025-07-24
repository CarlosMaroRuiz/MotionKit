import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../core/context/AuthContext';
import PasswordStrengthIndicator from './components/PasswordStrengthIndicator';

const RegisterPage = () => {
  const navigate = useNavigate();
  const { register, loading } = useAuth();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Limpiar errores específicos cuando el usuario empiece a escribir
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const email = formData.email || ''; // Proteger contra undefined
    if (!email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!emailRegex.test(email)) {
      newErrors.email = 'Ingresa un email válido';
    }

    // Validar contraseña
    const password = formData.password || ''; // Proteger contra undefined
    if (!password) {
      newErrors.password = 'La contraseña es requerida';
    } else if (password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    }

    // Validar confirmación de contraseña
    const confirmPassword = formData.confirmPassword || ''; // Proteger contra undefined
    if (!confirmPassword) {
      newErrors.confirmPassword = 'Confirma tu contraseña';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    }

    // Validar términos
    if (!formData.acceptTerms) {
      newErrors.acceptTerms = 'Debes aceptar los términos y condiciones';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      console.log('Enviando datos de registro...');
      
      // Asegurar que los datos estén definidos
      const registrationData = {
        email: formData.email?.trim() || '',
        password: formData.password || ''
      };

      if (!registrationData.email || !registrationData.password) {
        throw new Error('Email y contraseña son requeridos');
      }
      
      const result = await register(registrationData);
      
      console.log('Registro completado:', result);
      
      // Mostrar mensaje de éxito si es necesario
      if (result.message) {
        console.log('Mensaje del servidor:', result.message);
      }
      
      // Redirección automática a /components después del registro exitoso
      navigate('/login', { replace: true });
      
    } catch (err) {
      console.error('Error en registro:', err);
      
      // Manejar diferentes tipos de errores
      let errorMessage = err.message;
      
      // Si es un error de red o servidor
      if (errorMessage.includes('fetch')) {
        errorMessage = 'Error de conexión. Verifica tu conexión a internet.';
      } else if (errorMessage.includes('500')) {
        errorMessage = 'Error del servidor. Inténtalo más tarde.';
      } else if (errorMessage.includes('409') || errorMessage.includes('ya existe')) {
        errorMessage = 'Ya existe una cuenta con este email.';
      } else if (errorMessage.includes('400')) {
        errorMessage = 'Los datos proporcionados no son válidos.';
      }
      
      setErrors({ general: errorMessage });
    }
  };

  // Animaciones
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const errorVariants = {
    hidden: { opacity: 0, scale: 0.8, height: 0 },
    visible: { 
      opacity: 1, 
      scale: 1,
      height: 'auto',
      transition: { type: "spring", stiffness: 400, damping: 20 }
    },
    exit: { opacity: 0, scale: 0.8, height: 0 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center p-4">
      {/* Partículas de fondo */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(60)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-pink-400 rounded-full opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -150, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      <motion.div
        className="w-full max-w-md relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Card principal */}
        <motion.div
          className="bg-gray-800/80 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-gray-700/50"
          variants={itemVariants}
        >
          {/* Logo/Header */}
          <motion.div className="text-center mb-8" variants={itemVariants}>
            <motion.div
              className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center"
              whileHover={{ scale: 1.05, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-white font-bold text-xl">MK</span>
            </motion.div>
            <h1 className="text-2xl font-bold text-white mb-2">Crear Cuenta</h1>
            <p className="text-gray-400">Solo necesitas email y contraseña</p>
          </motion.div>

          {/* Formulario */}
          <motion.form onSubmit={handleSubmit} variants={itemVariants}>
            {/* Email */}
            <motion.div className="mb-4" variants={itemVariants}>
              <label className="block text-gray-300 text-sm font-medium mb-2">
                Email
              </label>
              <motion.input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 bg-gray-700/50 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-300 ${
                  errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-600 focus:ring-purple-500'
                }`}
                placeholder="tu@email.com"
                whileFocus={{ scale: 1.02 }}
              />
              {errors.email && (
                <motion.p
                  className="text-red-400 text-sm mt-1"
                  variants={errorVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  {errors.email}
                </motion.p>
              )}
            </motion.div>

            {/* Password */}
            <motion.div className="mb-4" variants={itemVariants}>
              <label className="block text-gray-300 text-sm font-medium mb-2">
                Contraseña
              </label>
              <div className="relative">
                <motion.input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 bg-gray-700/50 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-300 ${
                    errors.password ? 'border-red-500 focus:ring-red-500' : 'border-gray-600 focus:ring-purple-500'
                  }`}
                  placeholder="Mínimo 6 caracteres"
                  whileFocus={{ scale: 1.02 }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                >
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>
              {errors.password && (
                <motion.p
                  className="text-red-400 text-sm mt-1"
                  variants={errorVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  {errors.password}
                </motion.p>
              )}
              
              {/* Indicador de fortaleza de contraseña */}
              <PasswordStrengthIndicator password={formData.password} />
            </motion.div>

            {/* Confirm Password */}
            <motion.div className="mb-4" variants={itemVariants}>
              <label className="block text-gray-300 text-sm font-medium mb-2">
                Confirmar contraseña
              </label>
              <div className="relative">
                <motion.input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 bg-gray-700/50 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-300 ${
                    errors.confirmPassword ? 'border-red-500 focus:ring-red-500' : 'border-gray-600 focus:ring-purple-500'
                  }`}
                  placeholder="Repite tu contraseña"
                  whileFocus={{ scale: 1.02 }}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                >
                  {showConfirmPassword ? '🙈' : '👁️'}
                </button>
              </div>
              {errors.confirmPassword && (
                <motion.p
                  className="text-red-400 text-sm mt-1"
                  variants={errorVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  {errors.confirmPassword}
                </motion.p>
              )}
            </motion.div>

            {/* Terms and Conditions */}
            <motion.div className="mb-6" variants={itemVariants}>
              <label className="flex items-start space-x-3 cursor-pointer">
                <motion.input
                  type="checkbox"
                  name="acceptTerms"
                  checked={formData.acceptTerms}
                  onChange={handleInputChange}
                  className="mt-1 w-4 h-4 text-purple-600 bg-gray-700 border-gray-600 rounded focus:ring-purple-500 focus:ring-2"
                  whileTap={{ scale: 0.9 }}
                />
                <span className="text-gray-300 text-sm leading-relaxed">
                  Acepto los{' '}
                  <button
                    type="button"
                    className="text-purple-400 hover:text-purple-300 underline"
                    onClick={() => {/* Abrir modal de términos */}}
                  >
                    términos y condiciones
                  </button>
                  {' '}y la{' '}
                  <button
                    type="button"
                    className="text-purple-400 hover:text-purple-300 underline"
                    onClick={() => {/* Abrir modal de privacidad */}}
                  >
                    política de privacidad
                  </button>
                </span>
              </label>
              {errors.acceptTerms && (
                <motion.p
                  className="text-red-400 text-sm mt-2"
                  variants={errorVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  {errors.acceptTerms}
                </motion.p>
              )}
            </motion.div>

            {/* Error general */}
            {errors.general && (
              <motion.div
                className="mb-4 p-3 bg-red-500/20 border border-red-500/30 rounded-lg text-red-400 text-sm"
                variants={errorVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                {errors.general}
              </motion.div>
            )}

            {/* Botón de registro */}
            <motion.button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-pink-600 to-purple-600 text-white py-3 px-4 rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
              variants={itemVariants}
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <motion.div
                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                  Creando cuenta...
                </div>
              ) : (
                'Crear Cuenta'
              )}
            </motion.button>
          </motion.form>

          {/* Enlaces adicionales */}
          <motion.div className="mt-6 text-center space-y-3" variants={itemVariants}>
            <p className="text-gray-400 text-sm">
              ¿Ya tienes cuenta?{' '}
              <motion.button
                onClick={() => navigate('/login')}
                className="text-purple-400 hover:text-purple-300 font-medium transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
              >
                Inicia sesión
              </motion.button>
            </p>
            
            <motion.button
              onClick={() => navigate('/')}
              className="text-gray-400 hover:text-purple-400 text-sm transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
            >
              ← Volver al inicio
            </motion.button>
          </motion.div>
        </motion.div>

        </motion.div>

        
    </div>
  );
};

export default RegisterPage;