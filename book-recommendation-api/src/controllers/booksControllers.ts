import { Request, Response } from 'express';
import db from '../database/db';

// Obter todos os livros
export const getAllBooks = (req: Request, res: Response) => {
  db.all('SELECT * FROM books', [], (err, rows) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.json(rows);
    }
  });
};

// Adicionar um novo livro
export const addBook = (req: Request, res: Response) => {
  const { title, author, review } = req.body;
  db.run('INSERT INTO books (title, author, review) VALUES (?, ?, ?)', [title, author, review], function(err) {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.status(201).json({ id: this.lastID, title, author, review });
    }
  });
};

// Atualizar um livro existente
export const updateBook = (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, author, review } = req.body;
  db.run('UPDATE books SET title = ?, author = ?, review = ? WHERE id = ?', [title, author, review, id], function(err) {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.json({ id, title, author, review });
    }
  });
};

// Deletar um livro
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
