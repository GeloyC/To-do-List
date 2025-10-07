import express from 'express';
import cors from 'cors';
import db from './config/database.js';
import taskRoute from './routes/task.js';

const app = express();


app.use(cors({ origin: 'https://to-do-list-zeta-five-98.vercel.app/:5173' })) // or your React port

app.use(express.json());

app.use('/task', taskRoute);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on https://to-do-list-zeta-five-98.vercel.app/:${PORT}`);
})
