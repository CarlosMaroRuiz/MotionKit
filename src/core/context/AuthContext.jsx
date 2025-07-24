// src/contexts/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { registerUser, loginUser } from '../../features/login/services/servicesLogin';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Verificar si hay un usuario almacenado al cargar la app
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  // Función de login usando solo API real (sin fallback)
  const login = async (email, password) => {
    setLoading(true);
    
    try {
      console.log('Iniciando login para:', email);
      
      // Usar el servicio de login de la API real
      const result = await loginUser(email, password);
      
      console.log('Login exitoso');
      
      // Configurar usuario en el estado - guardando token completo
      const userData = {
        id: result.user.id,
        email: result.user.email,
        name: result.user.name,
        avatar: result.user.avatar,
        token: result.user.token, // Token completo
        role: result.user.role,
        loginTime: result.user.loginTime,
        isRegistered: result.user.isRegistered,
        isAPIUser: true
      };
      
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      
      setLoading(false);
      return { success: true, user: userData, message: result.message };
      
    } catch (error) {
      console.error('Error en login:', error);
      setLoading(false);
      throw new Error(error.message || 'Error al iniciar sesión');
    }
  };

  // Función de registro usando API real
  const register = async ({ email, password }) => {
    setLoading(true);
    
    try {
      console.log('Iniciando registro para:', email);
      
      // Usar el servicio de API real (solo email y password)
      const result = await registerUser({ email, password });
      
      console.log('Registro exitoso:', result);
      
      // Configurar usuario en el estado - guardando token completo
      const userData = {
        id: result.user.id,
        email: result.user.email,
        name: result.user.name,
        avatar: result.user.avatar,
        token: result.user.token, // Token completo
        loginTime: result.user.loginTime,
        isRegistered: true,
        isAPIUser: true
      };
      
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      
      setLoading(false);
      return { success: true, user: userData, message: result.message };
      
    } catch (error) {
      console.error('Error en registro:', error);
      setLoading(false);
      throw new Error(error.message || 'Error al registrar usuario');
    }
  };

  // Función de logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const value = {
    user,
    login,
    register,
    logout,
    loading,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};