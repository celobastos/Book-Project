import api from './api'; // Import the Axios instance

export const getBooks = async (query: string = '') => {  // Default parameter to an empty string
    const response = await fetch(`http://localhost:5000/books${query ? `/search?query=${encodeURIComponent(query)}` : ''}`);
    if (!response.ok) {
      throw new Error('Failed to fetch books');
    }
    const data = await response.json();
    return data;
  };

export const createBook = async (bookData: any) => {
  try {
    const response = await api.post('/books', bookData);
    return response.data;
  } catch (error) {
    console.error('Error creating book:', error);
    throw error;
  }
};

export const updateBook = async (bookId: string, updatedData: any) => {
  try {
    const response = await api.put(`/books/${bookId}`, updatedData);
    return response.data;
  } catch (error) {
    console.error('Error updating book:', error);
    throw error;
  }
};

export const deleteBook = async (bookId: string) => {
  try {
    await api.delete(`/books/${bookId}`);
  } catch (error) {
    console.error('Error deleting book:', error);
    throw error;
  }
};
