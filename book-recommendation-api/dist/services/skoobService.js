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
exports.getSkoobReviews = exports.searchSkoobBook = void 0;
const axios_1 = __importDefault(require("axios"));
const cheerio_1 = __importDefault(require("cheerio"));
/**
 * Search for a book on Skoob by its title.
 * @param title - The title of the book to search for.
 * @returns The ID of the book on Skoob or null if not found.
 */
const searchSkoobBook = (title) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.get('https://www.skoob.com.br/livro/lista/', {
            params: { nome: title },
        });
        if (response.status !== 200) {
            console.error('Failed to fetch from Skoob:', response.status);
            return null;
        }
        const html = response.data;
        if (!html) {
            console.error('No HTML received from Skoob');
            return null;
        }
        console.log('HTML received from Skoob:', html); // Debugging line
        const $ = cheerio_1.default.load(html);
        // Find the first book link and extract the book ID
        const bookLink = $('a[href*="/livro/resenhas/"]').first().attr('href');
        if (bookLink) {
            const bookIdMatch = bookLink.match(/livro\/resenhas\/(\d+)/);
            if (bookIdMatch && bookIdMatch[1]) {
                return bookIdMatch[1]; // Return the book ID
            }
        }
        console.error('No matching book found on Skoob');
        return null; // No matching book found
    }
    catch (error) {
        if (axios_1.default.isAxiosError(error)) {
            console.error('Axios error fetching book on Skoob:', error.message);
        }
        else if (error instanceof Error) {
            console.error('Error searching for book on Skoob:', error.message);
        }
        else {
            console.error('Unknown error searching for book on Skoob:', error);
        }
        return null;
    }
});
exports.searchSkoobBook = searchSkoobBook;
const getSkoobReviews = (bookId) => __awaiter(void 0, void 0, void 0, function* () {
    if (!bookId)
        return [];
    try {
        const response = yield axios_1.default.get(`https://www.skoob.com.br/livro/resenhas/${bookId}`);
        if (response.status !== 200) {
            console.error('Failed to fetch reviews from Skoob:', response.status);
            return [];
        }
        const html = response.data;
        if (!html) {
            console.error('No HTML received from Skoob for reviews');
            return [];
        }
        const $ = cheerio_1.default.load(html);
        const reviews = [];
        $('.livro-perfil-livro').each((i, elem) => {
            const reviewText = $(elem).find('.sinopse > p').text().trim();
            const reviewAuthor = $(elem).find('.perfil-texto').text().trim();
            if (reviewText) {
                reviews.push({ author: reviewAuthor, text: reviewText });
            }
        });
        return reviews;
    }
    catch (error) {
        if (axios_1.default.isAxiosError(error)) {
            console.error('Axios error fetching reviews from Skoob:', error.message);
        }
        else if (error instanceof Error) {
            console.error('Error fetching reviews from Skoob:', error.message);
        }
        else {
            console.error('Unknown error fetching reviews from Skoob:', error);
        }
        return [];
    }
});
exports.getSkoobReviews = getSkoobReviews;
