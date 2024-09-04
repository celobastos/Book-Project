"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const booksControllers_1 = require("../controllers/booksControllers");
const router = express_1.default.Router();
router.get('/', booksControllers_1.getAllBooks);
router.post('/', booksControllers_1.addBook);
router.put('/:id', booksControllers_1.updateBook);
router.delete('/:id', booksControllers_1.deleteBook);
router.get('/search', booksControllers_1.getFilteredBooks);
exports.default = router;
