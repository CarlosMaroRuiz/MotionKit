
export const API_BASE = import.meta.env.VITE_BASE_URL_API;

/**
 * Configuración por defecto para fetch
 */
export const API_CONFIG = {
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
};

/**
 * Helper para hacer peticiones GET
 * @param {string} endpoint - Endpoint de la API
 * @param {Object} options - Opciones adicionales para fetch
 * @returns {Promise} Respuesta de la API
 */
export const apiGet = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_BASE}${endpoint}`, {
      method: 'GET',
      ...API_CONFIG,
      ...options
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API GET Error:', error);
    throw error;
  }
};

/**
 * Helper para hacer peticiones POST
 * @param {string} endpoint - Endpoint de la API
 * @param {Object} data - Datos a enviar
 * @param {Object} options - Opciones adicionales para fetch
 * @returns {Promise} Respuesta de la API
 */
export const apiPost = async (endpoint, data = {}, options = {}) => {
  try {
    const response = await fetch(`${API_BASE}${endpoint}`, {
      method: 'POST',
      ...API_CONFIG,
      body: JSON.stringify(data),
      ...options
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API POST Error:', error);
    throw error;
  }
};

/**
 * Helper para hacer peticiones PUT
 * @param {string} endpoint - Endpoint de la API
 * @param {Object} data - Datos a enviar
 * @param {Object} options - Opciones adicionales para fetch
 * @returns {Promise} Respuesta de la API
 */
export const apiPut = async (endpoint, data = {}, options = {}) => {
  try {
    const response = await fetch(`${API_BASE}${endpoint}`, {
      method: 'PUT',
      ...API_CONFIG,
      body: JSON.stringify(data),
      ...options
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API PUT Error:', error);
    throw error;
  }
};

/**
 * Helper para hacer peticiones DELETE
 * @param {string} endpoint - Endpoint de la API
 * @param {Object} options - Opciones adicionales para fetch
 * @returns {Promise} Respuesta de la API
 */
export const apiDelete = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_BASE}${endpoint}`, {
      method: 'DELETE',
      ...API_CONFIG,
      ...options
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API DELETE Error:', error);
    throw error;
  }
};