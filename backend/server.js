import express from 'express';
import cors from 'cors';
import db from './config/database.js';
import taskRoute from './routes/task.js';

const app = express();


app.use(cors({
    origin: [
        'http://localhost:5173', 
        'https://to-do-list-siol.vercel.app', 
        'https://to-do-list-siol-3qyhew7d1-angelo-cabangals-projects.vercel.app' 
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

app.use(express.json());
app.use('/task', taskRoute);


app.get('/', (req, res) => {
    res.send('Backend is running 🚀');
});

app.use((req, res, next) => {
    res.status(404).json({ error: 'Route not found' });
});



const PORT = process.env.PORT || 5000;

app.listen(PORT, '0.0.0.0', () => {
    console.log(`✅ Server running on port ${PORT}`);
});
