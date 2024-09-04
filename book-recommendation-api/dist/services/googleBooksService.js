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
exports.getBookRecommendations = void 0;
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const getBookRecommendations = (query) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.get('https://www.googleapis.com/books/v1/volumes', {
            params: {
                q: query,
                maxResults: 5,
                key: process.env.GOOGLE_BOOKS_API_KEY
            },
        });
        return response.data.items || [];
    }
    catch (error) {
        if (axios_1.default.isAxiosError(error)) {
            console.error('Axios error fetching books from Google Books:', error.message);
        }
        else if (error instanceof Error) {
            console.error('Error fetching books from Google Books:', error.message);
        }
        else {
            console.error('Unknown error fetching books from Google Books:', error);
        }
        throw error;
    }
});
exports.getBookRecommendations = getBookRecommendations;
