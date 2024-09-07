"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFilteredBooks = exports.deleteBook = exports.updateBook = exports.addBook = exports.getAllBooks = void 0;
const db_1 = __importDefault(require("../database/db"));
const axios_1 = __importDefault(require("axios"));
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
const GOOGLE_BOOKS_API_URL = 'https://www.googleapis.com/books/v1/volumes?q=';
const addBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { title, author, review } = req.body;
    let coverImage = null;
    try {
        const googleBooksResponse = yield axios_1.default.get(`${GOOGLE_BOOKS_API_URL}${encodeURIComponent(title)}`);
        if (googleBooksResponse.data.items && googleBooksResponse.data.items.length > 0) {
            const bookData = googleBooksResponse.data.items[0];
            coverImage = ((_a = bookData.volumeInfo.imageLinks) === null || _a === void 0 ? void 0 : _a.thumbnail) || null;
        }
    }
    catch (error) {
        console.error('Error fetching book data from Google Books API:', error);
    }
    try {
        const sql = 'INSERT INTO books (title, author, review, coverImage) VALUES (?, ?, ?, ?)';
        db_1.default.run(sql, [title, author, review, coverImage], function (err) {
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
    }
    catch (err) {
        console.error('Error adding book to database:', err);
        res.status(500).send('Failed to add book to the database.');
    }
});
exports.addBook = addBook;
const updateBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { title, author, review } = req.body;
    const { id } = req.params;
    let coverImage = null;
    try {
        const googleBooksResponse = yield axios_1.default.get(`${GOOGLE_BOOKS_API_URL}${encodeURIComponent(title)}`);
        if (googleBooksResponse.data.items && googleBooksResponse.data.items.length > 0) {
            const bookData = googleBooksResponse.data.items[0];
            coverImage = ((_a = bookData.volumeInfo.imageLinks) === null || _a === void 0 ? void 0 : _a.thumbnail) || null;
        }
    }
    catch (error) {
        console.error('Error fetching book data from Google Books API:', error);
    }
    try {
        const sql = `
      UPDATE books 
      SET title = ?, author = ?, review = ?, coverImage = ? 
      WHERE id = ?
    `;
        db_1.default.run(sql, [title, author, review, coverImage, id], function (err) {
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
    }
    catch (err) {
        console.error('Error updating book in database:', err);
        res.status(500).send('Failed to update book in the database.');
    }
});
exports.updateBook = updateBook;
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
