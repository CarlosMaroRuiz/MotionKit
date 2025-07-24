// src/features/register/services/registerApiService.js
import { apiPost } from "../../../shared/enum/apiBase";

/**
 * Registra un nuevo usuario a través de la API
 * @param {Object} userData - Datos del usuario
 * @returns {Promise} Resultado del registro
 */
export const registerUserAPI = async ({ email, password }) => {
  try {
    
    
    const requestData = {
      email: email,
      pass: password
    };
    
    // Llamada a la API de registro
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

/**
 * Función principal de registro que utiliza directamente la API
 * @param {Object} userData - Datos del usuario (solo email y password)
 * @returns {Promise} Resultado del registro
 */
export const registerUser = async (userData) => {
  // Verificar que tenemos los datos necesarios
  if (!userData || !userData.email || !userData.password) {
    throw new Error('Email y contraseña son requeridos');
  }

  // Usar directamente la API real
  return await registerUserAPI(userData);
};