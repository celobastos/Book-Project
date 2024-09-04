import { Request, Response } from 'express';
import { getBookRecommendations } from '../services/googleBooksService';

// Buscar recomendações de livros na API do Google Books
export const getRecommendations = async (req: Request, res: Response) => {
  const { query } = req.query;

  if (!query) {
    return res.status(400).send('Query parameter is required');
  }

  try {
    const recommendations = await getBookRecommendations(query as string);
    
    if (!recommendations || recommendations.length === 0) {
      return res.status(404).send('No books found');
    }

    // Pegar apenas o primeiro resultado
    const firstResult = recommendations[0];

    // Filtrar as informações relevantes
    const filteredResult = {
      title: firstResult.volumeInfo.title,
      author: firstResult.volumeInfo.authors?.join(', ') || 'Unknown Author',
      description: firstResult.volumeInfo.description || 'No description available.',
      averageRating: firstResult.volumeInfo.averageRating || 'No rating available.',
      ratingsCount: firstResult.volumeInfo.ratingsCount || 0,
      price: firstResult.saleInfo.listPrice
        ? `${firstResult.saleInfo.listPrice.amount} ${firstResult.saleInfo.listPrice.currencyCode}`
        : 'Not for sale',
      image: firstResult.volumeInfo.imageLinks?.thumbnail || 'No image available.'
    };

    // Retornar apenas o primeiro livro filtrado
    res.json(filteredResult);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
};
