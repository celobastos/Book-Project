import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

import booksRoutes from './routes/booksRoutes';
import recommendationsRoutes from './routes/recommendationsRoutes';

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/books', booksRoutes);
app.use('/recommendations', recommendationsRoutes);

export default app;
