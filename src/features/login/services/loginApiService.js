import { apiPost } from "../../../shared/enum/apiBase";


export const loginUserAPI = async (email, password) => {
  try {
   
    const requestData = {
      email: email,
      pass: password
    };



    const response = await apiPost('users/login', requestData);

    if (!response.token) {
      throw new Error('Token no recibido de la API');
    }

   
    const userData = {
      id: Date.now().toString(), 
      email: email,
      name: email.split('@')[0], 
      avatar: email.charAt(0).toUpperCase(),
      token: response.token,
      isRegistered: true,
      isAPIUser: true,
      loginTime: new Date().toISOString()
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
 * Login de respaldo con usuarios demo y localStorage
 * @param {string} email - Email del usuario
 * @param {string} password - Contraseña del usuario
 * @returns {Promise} Resultado del login
 */
export const loginUserFallback = async (email, password) => {
  console.log('Usando login de respaldo (simulado)');
  
  // Simular delay de red
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Usuarios demo para testing
  const demoUsers = [
    { email: 'admin@motionkit.com', password: 'admin123', name: 'Admin', role: 'admin' },
    { email: 'user@motionkit.com', password: 'user123', name: 'User', role: 'user' },
    { email: 'demo@motionkit.com', password: 'demo123', name: 'Demo', role: 'demo' }
  ];

  // Buscar en usuarios demo
  const demoUser = demoUsers.find(
    u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
  );

  // Buscar en usuarios registrados en localStorage
  const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
  const registeredUser = registeredUsers.find(
    u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
  );

  const user = demoUser || registeredUser;

  if (!user) {
    throw new Error('Credenciales inválidas');
  }

  return {
    success: true,
    message: 'Login exitoso (modo simulado)',
    user: {
      id: user.id || Date.now(),
      email: user.email,
      name: user.name || email.split('@')[0],
      avatar: (user.name || email).charAt(0).toUpperCase(),
      role: user.role || 'user',
      token: `fallback_token_${Date.now()}`,
      isRegistered: !!registeredUser,
      isAPIUser: false,
      loginTime: new Date().toISOString()
    }
  };
};

/**
 * Función principal de login que intenta API primero y luego fallback
 * @param {string} email - Email del usuario
 * @param {string} password - Contraseña del usuario
 * @returns {Promise} Resultado del login
 */
export const loginUser = async (email, password) => {
  try {
    // Intentar primero con la API real
    return await loginUserAPI(email, password);
  } catch (apiError) {
    console.warn('Login con API falló, intentando fallback:', apiError.message);
    
    // Si la API falla, intentar con el sistema de respaldo
    try {
      const fallbackResult = await loginUserFallback(email, password);
      
      // Agregar indicador de que se usó fallback
      return {
        ...fallbackResult,
        usedFallback: true
      };
    } catch (fallbackError) {
      // Si ambos fallan, lanzar el error más específico
      throw new Error(apiError.message || fallbackError.message || 'Error al iniciar sesión');
    }
  }
};