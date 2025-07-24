// src/features/login/services/servicesLogin.js
import { apiPost } from "../../../shared/enum/apiBase";

/**
 * Realiza la autenticación del usuario a través de la API
 * @param {string} email - Email del usuario
 * @param {string} password - Contraseña del usuario
 * @returns {Promise} Promesa que resuelve con los datos del usuario o rechaza con error
 */
export const loginUser = async (email, password) => {
  try {
    console.log('Iniciando login con API para:', email);
    
    const requestData = {
      email: email,
      pass: password
    };

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
      token: response.token, // Token completo de la API
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
 * Registra un nuevo usuario a través de la API
 * @param {Object} userData - Datos del usuario a registrar
 * @param {string} userData.email - Email del usuario
 * @param {string} userData.password - Contraseña del usuario
 * @returns {Promise} Promesa que resuelve con los datos del usuario creado
 */
export const registerUser = async ({ email, password }) => {
  try {
    console.log('Iniciando registro con API para:', email);
    
    const requestData = {
      email: email,
      pass: password
    };
    
    const response = await apiPost('users/register', requestData);

    console.log('Respuesta de registro API exitosa');

    // Configurar el usuario con el token completo
    const userData = {
      id: response.user?.id || Date.now().toString(),
      email: email,
      name: response.user?.name || email.split('@')[0],
      avatar: response.user?.avatar || email.charAt(0).toUpperCase(),
      token: response.token, // Token completo de la API
      role: response.user?.role || 'user',
      loginTime: new Date().toISOString(),
      isRegistered: true,
      isAPIUser: true
    };

    return {
      success: true,
      message: response.message || 'Usuario registrado exitosamente',
      user: userData
    };

  } catch (error) {
    console.error('Error en registro de usuario:', error);
    
    let errorMessage = 'Error al registrar usuario';
    
    if (error.message) {
      errorMessage = error.message;
    } else if (error.status === 400) {
      errorMessage = 'Datos de registro inválidos';
    } else if (error.status === 409 || error.status === 422) {
      errorMessage = 'Ya existe una cuenta con este email';
    } else if (error.status === 500) {
      errorMessage = 'Error interno del servidor. Inténtalo más tarde';
    } else if (error.message.includes('fetch')) {
      errorMessage = 'Error de conexión. Verifica tu conexión a internet';
    }

    throw new Error(errorMessage);
  }
};