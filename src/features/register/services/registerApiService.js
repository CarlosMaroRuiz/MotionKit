
import { apiPost } from "../../../shared/enum/apiBase";

export const registerUserAPI = async ({ email, password }) => {
  try {
  
    const requestData = {
      email: email,
      pass: password
    };



    
    const response = await apiPost('users/register', requestData);

    console.log('Respuesta de registro API exitosa');


    const userData = {
      id: Date.now().toString(),
      email: email,
      name: email.split('@')[0], 
      avatar: email.charAt(0).toUpperCase(),
      token: response.token || `api_token_${Date.now()}`, 
      isRegistered: true,
      isAPIUser: true,
      loginTime: new Date().toISOString(),
      ...response.user 
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
 * Función de respaldo para registro con simulación
 * (mantener por si falla la API)
 * @param {Object} userData - Datos del usuario
 * @returns {Promise} Resultado simulado
 */
export const registerUserFallback = async ({ email, password }) => {
  console.log('Usando registro de respaldo (simulado)');
  
  // Simular delay de red
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Verificar localStorage para evitar duplicados
  const existingUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
  const emailExists = existingUsers.some(u => u.email.toLowerCase() === email.toLowerCase());
  
  if (emailExists) {
    throw new Error('Ya existe una cuenta con este email');
  }
  
  // Crear usuario simulado
  const newUser = {
    id: Date.now(),
    name: email.split('@')[0], // Generar nombre desde email
    email,
    password,
    avatar: email.charAt(0).toUpperCase(),
    registeredAt: new Date().toISOString(),
    isRegistered: true
  };
  
  // Guardar en localStorage
  existingUsers.push(newUser);
  localStorage.setItem('registeredUsers', JSON.stringify(existingUsers));
  
  return {
    success: true,
    message: 'Usuario registrado exitosamente (modo simulado)',
    user: {
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
      avatar: newUser.avatar,
      token: `fallback_token_${Date.now()}`,
      isRegistered: true,
      loginTime: new Date().toISOString()
    }
  };
};

/**
 * Función principal que intenta registro con API y usa fallback si falla
 * @param {Object} userData - Datos del usuario (solo email y password)
 * @returns {Promise} Resultado del registro
 */
export const registerUser = async (userData) => {
  try {
    // Verificar que tenemos los datos necesarios
    if (!userData || !userData.email || !userData.password) {
      throw new Error('Email y contraseña son requeridos');
    }

    // Intentar primero con la API real
    return await registerUserAPI(userData);
  } catch (apiError) {
    console.warn('Registro con API falló, usando fallback:', apiError.message);
    
    // Si la API falla, usar el sistema de respaldo
    try {
      return await registerUserFallback(userData);
    } catch (fallbackError) {
      // Si ambos fallan, lanzar el error original de la API
      throw apiError;
    }
  }
};