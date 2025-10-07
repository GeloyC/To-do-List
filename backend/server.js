import express from 'express';
import cors from 'cors';
import db from './config/database.js';
import taskRoute from './routes/task.js';

const app = express();

app.use(cors({
    origin: [
        'http://localhost:5173', // for local dev
        'https://to-do-list-siol.vercel.app', // your main vercel domain
        'https://to-do-list-siol-3qyhew7d1-angelo-cabangals-projects.vercel.app' // preview deploys
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));



app.use(express.json());
app.use('/task', taskRoute);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
})
