import { Request, Response } from 'express';
import db from '../database/db';
import axios from 'axios';


export const getAllBooks = (req: Request, res: Response) => {
  db.all('SELECT * FROM books', [], (err, rows) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.json(rows);
    }
  });
};


const GOOGLE_BOOKS_API_URL = 'https://www.googleapis.com/books/v1/volumes?q=';

export const addBook = async (req: Request, res: Response) => {
  const { title, author, review } = req.body;

  let coverImage: string | null = null; 

  try {

    const googleBooksResponse = await axios.get(`${GOOGLE_BOOKS_API_URL}${encodeURIComponent(title)}`);
    
    if (googleBooksResponse.data.items && googleBooksResponse.data.items.length > 0) {
      
      const bookData = googleBooksResponse.data.items[0];
     
      coverImage = bookData.volumeInfo.imageLinks?.thumbnail || null;
    }
  } catch (error) {
    console.error('Error fetching book data from Google Books API:', error);
   
  }

  
  try {
    const sql = 'INSERT INTO books (title, author, review, coverImage) VALUES (?, ?, ?, ?)';
    db.run(sql, [title, author, review, coverImage], function (err) {
      if (err) {
        console.error('Error inserting book into database:', err.message);
        return res.status(500).send('Error inserting book into database.');
      }

      
      res.status(201).json({
        id: this.lastID, 
        title,
        author,
        review,
        coverImage,
      });
    });
  } catch (err) {
    console.error('Error adding book to database:', err);
    res.status(500).send('Failed to add book to the database.');
  }
};

export const updateBook = async (req: Request, res: Response) => {
  const { title, author, review } = req.body;
  const { id } = req.params;

  let coverImage: string | null = null;

  try {
    
    const googleBooksResponse = await axios.get(`${GOOGLE_BOOKS_API_URL}${encodeURIComponent(title)}`);
    
    if (googleBooksResponse.data.items && googleBooksResponse.data.items.length > 0) {
      const bookData = googleBooksResponse.data.items[0];
    
      coverImage = bookData.volumeInfo.imageLinks?.thumbnail || null;
    }
  } catch (error) {
    console.error('Error fetching book data from Google Books API:', error);
    
  }

  
  try {
    const sql = `
      UPDATE books 
      SET title = ?, author = ?, review = ?, coverImage = ? 
      WHERE id = ?
    `;
    db.run(sql, [title, author, review, coverImage, id], function (err) {
      if (err) {
        console.error('Error updating book in database:', err.message);
        return res.status(500).send('Error updating book in database.');
      }

      
      res.json({
        id,
        title,
        author,
        review,
        coverImage, 
      });
    });
  } catch (err) {
    console.error('Error updating book in database:', err);
    res.status(500).send('Failed to update book in the database.');
  }
};


export const deleteBook = (req: Request, res: Response) => {
  const { id } = req.params;
  db.run('DELETE FROM books WHERE id = ?', id, function(err) {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.status(204).send();
    }
  });
};

export const getFilteredBooks = (req: Request, res: Response) => {
  const { query } = req.query;

  if (!query) {
    return res.status(400).send('Query parameter is required');
  }

  const sql = `SELECT * FROM books WHERE title LIKE ? OR author LIKE ?`;
  const params = [`%${query}%`, `%${query}%`];

  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.json(rows);
    }
  });
};
