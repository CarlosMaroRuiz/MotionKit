export const getMultipleComponents = async (type, ids) => {
  try {
   
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = user.token;

    if (!token) {
      throw new Error('No hay token de autenticación disponible');
    }

    console.log('🔐 Usando token:', token.substring(0, 20) + '...'); // Log parcial por seguridad

    const promises = ids.map(async (id) => {
      const endpoint = `components/search?type=${type}&id=${id}`;
      
      // Hacer la petición con headers manuales
      const response = await fetch(`${import.meta.env.VITE_BASE_URL_API}${endpoint}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}` 
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    });

    const results = await Promise.all(promises);
    
    return results.map((data, index) => ({
      id: ids[index],
      animationCode: data.animationCode,
      jsxCode: data.jsxCode,
      ...data
    }));

  } catch (error) {
    console.error('Error fetching components manually:', error);
    throw error;
  }
};