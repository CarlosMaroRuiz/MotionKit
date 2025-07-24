// src/features/login/services/servicesLogin.js

/**
 * Servicios de autenticación para Motion Kit
 * Simulación de conexión con backend
 */

// Usuarios simulados para demo
const DEMO_USERS = [
  {
    id: 1,
    email: 'admin@motionkit.com',
    password: 'admin123',
    name: 'Admin User',
    role: 'admin',
    avatar: 'A'
  },
  {
    id: 2,
    email: 'user@motionkit.com',
    password: 'user123',
    name: 'Regular User',
    role: 'user',
    avatar: 'U'
  },
  {
    id: 3,
    email: 'demo@motionkit.com',
    password: 'demo123',
    name: 'Demo User',
    role: 'demo',
    avatar: 'D'
  }
];

/**
 * Simula una petición de login al backend
 * @param {string} email - Email del usuario
 * @param {string} password - Contraseña del usuario
 * @returns {Promise} Promesa que resuelve con los datos del usuario o rechaza con error
 */
export const loginUser = async (email, password) => {
  // Simular delay de red (1-2 segundos)
  const delay = 1000 + Math.random() * 1000;
  await new Promise(resolve => setTimeout(resolve, delay));

  // Buscar usuario en los datos simulados (usuarios demo)
  const demoUser = DEMO_USERS.find(
    u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
  );

  // Buscar usuario en los registrados
  const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
  const registeredUser = registeredUsers.find(
    u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
  );

  const user = demoUser || registeredUser;

  if (!user) {
    throw new Error('Credenciales inválidas. Verifica tu email y contraseña.');
  }

  // Simular respuesta del backend
  const { password: _, ...userWithoutPassword } = user;
  
  return {
    success: true,
    message: 'Login exitoso',
    user: {
      ...userWithoutPassword,
      token: generateSimulatedToken(),
      loginTime: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 horas
      isRegistered: !!registeredUser // Marcar si es usuario registrado o demo
    }
  };
};

/**
 * Simula el logout del usuario
 * @param {string} token - Token del usuario
 * @returns {Promise} Promesa que resuelve cuando el logout es exitoso
 */
export const logoutUser = async (token) => {
  // Simular delay de red
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // En una implementación real, aquí invalidarías el token en el backend
  return {
    success: true,
    message: 'Logout exitoso'
  };
};

/**
 * Verifica si un token es válido
 * @param {string} token - Token a verificar
 * @returns {Promise} Promesa que resuelve con la validez del token
 */
export const verifyToken = async (token) => {
  // Simular delay de red
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // Simulación simple: verificar que el token tenga el formato correcto
  if (!token || !token.startsWith('mk_token_')) {
    throw new Error('Token inválido');
  }
  
  return {
    valid: true,
    message: 'Token válido'
  };
};

/**
 * Obtiene la información del usuario a partir del token
 * @param {string} token - Token del usuario
 * @returns {Promise} Promesa que resuelve con los datos del usuario
 */
export const getUserInfo = async (token) => {
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // En una implementación real, decodificarías el token
  // Por ahora, simulamos devolviendo un usuario aleatorio
  const randomUser = DEMO_USERS[Math.floor(Math.random() * DEMO_USERS.length)];
  const { password: _, ...userWithoutPassword } = randomUser;
  
  return {
    success: true,
    user: userWithoutPassword
  };
};

/**
 * Genera un token simulado
 * @returns {string} Token simulado
 */
function generateSimulatedToken() {
  const randomString = Math.random().toString(36).substring(2, 15);
  const timestamp = Date.now().toString(36);
  return `mk_token_${timestamp}_${randomString}`;
}

/**
 * Simula el registro de un nuevo usuario (ACTUALIZADO - solo email y password)
 * @param {Object} userData - Datos del usuario a registrar
 * @param {string} userData.email - Email del usuario
 * @param {string} userData.password - Contraseña del usuario
 * @returns {Promise} Promesa que resuelve con los datos del usuario creado
 */
export const registerUser = async ({ email, password }) => {
  // Simular delay de red (2-3 segundos)
  const delay = 2000 + Math.random() * 1000;
  await new Promise(resolve => setTimeout(resolve, delay));

  // Verificar si el email ya existe en usuarios demo
  const emailExistsInDemo = DEMO_USERS.some(
    u => u.email.toLowerCase() === email.toLowerCase()
  );

  if (emailExistsInDemo) {
    throw new Error('Ya existe una cuenta con este email en el sistema');
  }

  // Simular verificación en base de datos
  // En una implementación real, aquí harías la consulta al backend
  const existingUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
  const emailExists = existingUsers.some(
    u => u.email.toLowerCase() === email.toLowerCase()
  );

  if (emailExists) {
    throw new Error('Ya existe una cuenta con este email');
  }

  // Crear nuevo usuario (generar nombre desde email)
  const generatedName = email.split('@')[0]; // Extraer nombre del email
  const newUser = {
    id: Date.now(),
    name: generatedName,
    email: email.toLowerCase(),
    password, // En producción, esto debe estar hasheado
    role: 'user',
    avatar: generatedName.charAt(0).toUpperCase(),
    registeredAt: new Date().toISOString(),
    isActive: true
  };

  // Simular guardado en base de datos
  existingUsers.push(newUser);
  localStorage.setItem('registeredUsers', JSON.stringify(existingUsers));

  // Retornar usuario sin contraseña
  const { password: _, ...userWithoutPassword } = newUser;
  
  return {
    success: true,
    message: 'Cuenta creada exitosamente',
    user: {
      ...userWithoutPassword,
      token: generateSimulatedToken(),
      loginTime: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // 24 horas
    }
  };
};

/**
 * Verifica si un email está disponible para registro
 * @param {string} email - Email a verificar
 * @returns {Promise} Promesa que resuelve con la disponibilidad del email
 */
export const checkEmailAvailability = async (email) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Verificar en usuarios demo
  const emailExistsInDemo = DEMO_USERS.some(
    u => u.email.toLowerCase() === email.toLowerCase()
  );
  
  // Verificar en usuarios registrados
  const existingUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
  const emailExistsInRegistered = existingUsers.some(
    u => u.email.toLowerCase() === email.toLowerCase()
  );
  
  const isAvailable = !emailExistsInDemo && !emailExistsInRegistered;
  
  return {
    available: isAvailable,
    message: isAvailable ? 'Email disponible' : 'Email ya está en uso'
  };
};

/**
 * Obtiene las credenciales de demo para mostrar al usuario
 * @returns {Array} Array con las credenciales de demo
 */
export const getDemoCredentials = () => {
  return DEMO_USERS.map(user => ({
    email: user.email,
    password: user.password,
    role: user.role
  }));
};

/**
 * Obtiene todos los usuarios registrados (para testing/admin)
 * @returns {Array} Array con los usuarios registrados
 */
export const getRegisteredUsers = () => {
  const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
  return users.map(({ password, ...user }) => user); // Sin contraseñas
};

/**
 * Simula el envío de email de verificación
 * @param {string} email - Email del usuario
 * @returns {Promise} Promesa que resuelve cuando se envía el email
 */
export const sendVerificationEmail = async (email) => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return {
    success: true,
    message: 'Email de verificación enviado exitosamente'
  };
};

/**
 * Simula el restablecimiento de contraseña
 * @param {string} email - Email del usuario
 * @returns {Promise} Promesa que resuelve cuando se envía el email
 */
export const resetPassword = async (email) => {
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  const userExists = DEMO_USERS.some(u => u.email.toLowerCase() === email.toLowerCase());
  
  if (!userExists) {
    throw new Error('No se encontró una cuenta con ese email');
  }
  
  return {
    success: true,
    message: 'Se ha enviado un enlace de restablecimiento a tu email'
  };
};