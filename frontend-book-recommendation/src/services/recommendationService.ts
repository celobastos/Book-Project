import api from './api'; // Import the Axios instance

export const getBookRecommendations = async (query: string) => {
  try {
    const response = await api.get('/recommendations', { params: { query } });
    return response.data;
  } catch (error) {
    console.error('Error fetching book recommendations:', error);
    throw error;
  }
};
