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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRecommendations = void 0;
const googleBooksService_1 = require("../services/googleBooksService");
// Buscar recomendações de livros na API do Google Books
const getRecommendations = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const { query } = req.query;
    if (!query) {
        return res.status(400).send('Query parameter is required');
    }
    try {
        const recommendations = yield (0, googleBooksService_1.getBookRecommendations)(query);
        if (!recommendations || recommendations.length === 0) {
            return res.status(404).send('No books found');
        }
        // Pegar apenas o primeiro resultado
        const firstResult = recommendations[0];
        // Filtrar as informações relevantes
        const filteredResult = {
            title: firstResult.volumeInfo.title,
            author: ((_a = firstResult.volumeInfo.authors) === null || _a === void 0 ? void 0 : _a.join(', ')) || 'Unknown Author',
            description: firstResult.volumeInfo.description || 'No description available.',
            averageRating: firstResult.volumeInfo.averageRating || 'No rating available.',
            ratingsCount: firstResult.volumeInfo.ratingsCount || 0,
            price: firstResult.saleInfo.listPrice
                ? `${firstResult.saleInfo.listPrice.amount} ${firstResult.saleInfo.listPrice.currencyCode}`
                : 'Not for sale',
            image: ((_b = firstResult.volumeInfo.imageLinks) === null || _b === void 0 ? void 0 : _b.thumbnail) || 'No image available.'
        };
        // Retornar apenas o primeiro livro filtrado
        res.json(filteredResult);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});
exports.getRecommendations = getRecommendations;
