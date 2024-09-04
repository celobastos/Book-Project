"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFilteredBooks = exports.deleteBook = exports.updateBook = exports.addBook = exports.getAllBooks = void 0;
const db_1 = __importDefault(require("../database/db"));
// Obter todos os livros
const getAllBooks = (req, res) => {
    db_1.default.all('SELECT * FROM books', [], (err, rows) => {
        if (err) {
            res.status(500).send(err.message);
        }
        else {
            res.json(rows);
        }
    });
};
exports.getAllBooks = getAllBooks;
// Adicionar um novo livro
const addBook = (req, res) => {
    const { title, author, review } = req.body;
    db_1.default.run('INSERT INTO books (title, author, review) VALUES (?, ?, ?)', [title, author, review], function (err) {
        if (err) {
            res.status(500).send(err.message);
        }
        else {
            res.status(201).json({ id: this.lastID, title, author, review });
        }
    });
};
exports.addBook = addBook;
// Atualizar um livro existente
const updateBook = (req, res) => {
    const { id } = req.params;
    const { title, author, review } = req.body;
    db_1.default.run('UPDATE books SET title = ?, author = ?, review = ? WHERE id = ?', [title, author, review, id], function (err) {
        if (err) {
            res.status(500).send(err.message);
        }
        else {
            res.json({ id, title, author, review });
        }
    });
};
exports.updateBook = updateBook;
// Deletar um livro
const deleteBook = (req, res) => {
    const { id } = req.params;
    db_1.default.run('DELETE FROM books WHERE id = ?', id, function (err) {
        if (err) {
            res.status(500).send(err.message);
        }
        else {
            res.status(204).send();
        }
    });
};
exports.deleteBook = deleteBook;
const getFilteredBooks = (req, res) => {
    const { query } = req.query;
    if (!query) {
        return res.status(400).send('Query parameter is required');
    }
    const sql = `SELECT * FROM books WHERE title LIKE ? OR author LIKE ?`;
    const params = [`%${query}%`, `%${query}%`];
    db_1.default.all(sql, params, (err, rows) => {
        if (err) {
            res.status(500).send(err.message);
        }
        else {
            res.json(rows);
        }
    });
};
exports.getFilteredBooks = getFilteredBooks;
