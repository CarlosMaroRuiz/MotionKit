// src/features/login/services/loginApiService.js
import { apiPost } from "../../../shared/enum/apiBase";

/**
 * Función de login utilizando la API real
 * @param {string} email - Email del usuario
 * @param {string} password - Contraseña del usuario
 * @returns {Promise} Resultado del login
 */
export const loginUserAPI = async (email, password) => {
  try {
    console.log('Iniciando login con API para:', email);
    
    const requestData = {
      email: email,
      pass: password
    };

    // Llamada a la API de login
    const response = await apiPost('users/login', requestData);

    if (!response.token) {
      throw new Error('Token no recibido de la API');
    }

    // Configurar el usuario con el token completo
    const userData = {
      id: response.user?.id || Date.now().toString(),
      email: email,
      name: response.user?.name || email.split('@')[0],
      avatar: response.user?.avatar || email.charAt(0).toUpperCase(),
      token: response.token, 
      role: response.user?.role || 'user',
      loginTime: new Date().toISOString(),
      isRegistered: true,
      isAPIUser: true
    };

    return {
      success: true,
      message: 'Login exitoso',
      user: userData
    };

  } catch (error) {
    console.error('Error en login API:', error);
    
    let errorMessage = 'Error al iniciar sesión';
    
    if (error.message) {
      errorMessage = error.message;
    } else if (error.status === 401) {
      errorMessage = 'Credenciales inválidas';
    } else if (error.status === 404) {
      errorMessage = 'Usuario no encontrado';
    } else if (error.status === 422) {
      errorMessage = 'Datos de login inválidos';
    } else if (error.status === 500) {
      errorMessage = 'Error interno del servidor. Inténtalo más tarde';
    } else if (error.message.includes('fetch')) {
      errorMessage = 'Error de conexión. Verifica tu conexión a internet';
    }

    throw new Error(errorMessage);
  }
};

/**
 * Función principal de login que utiliza directamente la API
 * @param {string} email - Email del usuario
 * @param {string} password - Contraseña del usuario
 * @returns {Promise} Resultado del login
 */
export const loginUser = async (email, password) => {
  // Usar directamente la API real
  return await loginUserAPI(email, password);
};