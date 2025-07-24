import { apiGet } from "../enum/apiBase";
export const getComponentById = async (type, id) => {
  try {
    const endpoint = `components/search?type=${type}&id=${id}`;
    const data = await apiGet(endpoint);
    return data;
  } catch (error) {
    console.error('Error fetching component:', error);
    throw error;
  }
};