import express from 'express';
import cors from 'cors';
import db from './config/database.js';
import taskRoute from './routes/task.js';

const app = express();

const allowedOrigins = [
    'http://localhost:5173',        
    'https://to-do-list-siol.vercel.app/',
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
        } else {
        callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
}));// or your React port

app.use(express.json());

app.use('/task', taskRoute);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on https://todo-list-4yac.onrender.com`);
})
