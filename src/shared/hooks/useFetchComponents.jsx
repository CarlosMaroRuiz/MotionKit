import { useState, useEffect } from 'react';
import { getMultipleComponents } from '../services/getMultipleComponents';

export const useFetchComponents = (type, ids) => {
  const [components, setComponents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchComponents = async () => {
      try {
        const fetchedComponents = await getMultipleComponents(type, ids);
        setComponents(fetchedComponents);

        setLoading(false);
      } catch (err) {
        setError('No se pudieron cargar los componentes');
        setLoading(false);
      }
    };

    fetchComponents();
  }, [type, ids]); 

  return { components, loading, error };
};