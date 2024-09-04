import express from 'express';
import { getAllBooks, addBook, updateBook, deleteBook, getFilteredBooks } from '../controllers/booksControllers';

const router = express.Router();

router.get('/', getAllBooks);
router.post('/', addBook);
router.put('/:id', updateBook);
router.delete('/:id', deleteBook);
router.get('/search', getFilteredBooks);
export default router;
