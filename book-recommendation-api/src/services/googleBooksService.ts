import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

export const getBookRecommendations = async (query: string) => {
  try {
    const response = await axios.get('https://www.googleapis.com/books/v1/volumes', {
      params: {
        q: query,
        maxResults: 5, 
        key: process.env.GOOGLE_BOOKS_API_KEY 
      },
    });

    return response.data.items || [];
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error fetching books from Google Books:', error.message);
    } else if (error instanceof Error) {
      console.error('Error fetching books from Google Books:', error.message);
    } else {
      console.error('Unknown error fetching books from Google Books:', error);
    }
    throw error;
  }
};
