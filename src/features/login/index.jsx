import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../core/context/AuthContext';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login, loading } = useAuth();
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Limpiar error cuando el usuario empiece a escribir
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.email || !formData.password) {
      setError('Por favor completa todos los campos');
      return;
    }

    try {
      await login(formData.email, formData.password);
      // Redirección automática a /components después del login exitoso
      navigate('/components', { replace: true });
    } catch (err) {
      setError(err.message);
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
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { type: "spring", stiffness: 400, damping: 20 }
    },
    exit: { opacity: 0, scale: 0.8 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center p-4">
      {/* Partículas de fondo */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-purple-400 rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
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
              className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto mb-4 flex items-center justify-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-white font-bold text-xl">MK</span>
            </motion.div>
            <h1 className="text-2xl font-bold text-white mb-2">Motion Kit</h1>
            <p className="text-gray-400">Inicia sesión para continuar</p>
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
                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                placeholder="tu@email.com"
                whileFocus={{ scale: 1.02 }}
              />
            </motion.div>

            {/* Password */}
            <motion.div className="mb-6" variants={itemVariants}>
              <label className="block text-gray-300 text-sm font-medium mb-2">
                Contraseña
              </label>
              <div className="relative">
                <motion.input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                  placeholder="••••••••"
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
            </motion.div>

            {/* Error */}
            {error && (
              <motion.div
                className="mb-4"
                variants={errorVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <div className="p-3 bg-red-500/20 border border-red-500/30 rounded-lg text-red-400 text-sm">
                  <div className="flex items-start space-x-2">
                    <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    <div className="flex-1">
                      <p className="font-medium">{error}</p>
                      {error.includes('Credenciales inválidas') && (
                        <motion.div 
                          className="mt-2 pt-2 border-t border-red-500/20"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          transition={{ delay: 0.3 }}
                        >
                          <p className="text-xs text-red-300 mb-2">
                            ¿No tienes cuenta todavía?
                          </p>
                          <motion.button
                            onClick={() => navigate('/register')}
                            className="text-xs bg-red-500/20 hover:bg-red-500/30 px-2 py-1 rounded transition-colors duration-200"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            Crear cuenta nueva
                          </motion.button>
                        </motion.div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Botón de login */}
            <motion.button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-4 rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
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
                  Iniciando sesión...
                </div>
              ) : (
                'Iniciar Sesión'
              )}
            </motion.button>

            {/* Separador */}
            <motion.div 
              className="relative my-6" 
              variants={itemVariants}
            >
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-600"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gray-800/80 text-gray-400">¿No tienes cuenta?</span>
              </div>
            </motion.div>

            {/* Botón de registro */}
            <motion.button
              type="button"
              onClick={() => navigate('/register')}
              className="w-full bg-transparent border-2 border-purple-600 text-purple-400 py-3 px-4 rounded-lg font-medium hover:bg-purple-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-300"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Crear Cuenta Nueva
            </motion.button>
          </motion.form>

          {/* Credenciales de demo */}
          <motion.div
            className="mt-6 p-4 bg-gray-700/30 rounded-lg border border-gray-600/30"
            variants={itemVariants}
          >
            <p className="text-gray-400 text-sm font-medium mb-2">Credenciales de prueba:</p>
            <div className="space-y-1 text-xs text-gray-500">
              <p>• admin@motionkit.com / admin123</p>
              <p>• user@motionkit.com / user123</p>
              <p>• demo@motionkit.com / demo123</p>
            </div>
          </motion.div>

          {/* Enlaces adicionales */}
          <motion.div className="mt-6 text-center space-y-4" variants={itemVariants}>
            {/* Enlace adicional a registro */}
            <motion.div 
              className="bg-gray-700/30 rounded-lg p-4 border border-gray-600/30"
              variants={itemVariants}
            >
              <p className="text-gray-300 text-sm mb-2">
                🚀 <strong>¿Primera vez en Motion Kit?</strong>
              </p>
              <p className="text-gray-400 text-xs mb-3">
                Regístrate para acceso completo a todos los componentes
              </p>
              <motion.button
                onClick={() => navigate('/register')}
                className="text-purple-400 hover:text-purple-300 font-medium text-sm bg-purple-500/10 px-3 py-1 rounded transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
              >
                Comenzar ahora →
              </motion.button>
            </motion.div>
            
            {/* Volver al inicio */}
            <motion.button
              onClick={() => navigate('/')}
              className="text-gray-400 hover:text-purple-400 text-sm transition-colors duration-300 inline-flex items-center"
              whileHover={{ scale: 1.05 }}
            >
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Volver al inicio
            </motion.button>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LoginPage;