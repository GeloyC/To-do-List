import db from '../config/database.js';
import express from 'express';
import cors from 'cors';

const taskRoute = express();

taskRoute.use(cors());;
taskRoute.use(express.json());


// Create new task
taskRoute.post('/create_task', async (req, res) => {
    const {
        task_id, task_name, task_subject, deadline
    } = req.body;

    try {
        const task = await db.query (`
            INSERT INTO task (task_id, task_name, task_subject, deadline) 
            VALUES (?, ?, ?, ?);  
        `, [task_id, task_name, task_subject, deadline]);

        res.json(task);
    } catch (err) {
        console.error('Error creating new task: ', err);
    }
});

// All task:
taskRoute.get('/all', async (req, res) => {
    try {
        const [rows] = await db.query(`
            SELECT * FROM task;    
        `);

        res.json(rows)
    } catch (err) {
        console.error('Failed to fetch all task: ', err);
    }
})

// Retrieve all new task
taskRoute.get('/all_task', async (req, res) => {
    try {
        const [rows] = await db.query(`
            SELECT task_id, task_name, task_subject,
                DATE_FORMAT(deadline, '%m-%d-%Y') AS deadline,
                DATE_FORMAT(create_at, '%m-%d-%Y') AS create_at
            FROM task WHERE status = 'New' 
            ORDER BY deadline ASC;
        `); 

        res.json(rows);
    } catch (err) {
        console.error('Error retrieving tasks: ', err)
    }
});

taskRoute.patch('/update_inProgress/:task_id', async(req, res) => {
    const { task_id } = req.params;

    try {
        const in_progress_task = await db.query(`
            UPDATE task SET status = 'In Progress' 
            WHERE task_id = ?
        `, [task_id]);

        res.status(200).json({message: 'Moved task to In Progress'})
    } catch(err) {

    }
});

taskRoute.patch('/update_Done/:task_id', async(req, res) => {
    const { task_id } = req.params;

    try {
        const in_progress_task = await db.query(`
            UPDATE task SET status = 'Done' 
            WHERE task_id = ?
        `, [task_id]);

        res.status(200).json({message: 'Moved task to Done'})
    } catch(err) {

    }
});

taskRoute.get('/all_task/in_progress', async(req, res) => {
    try {
        const [rows] = await db.query(`
            SELECT task_id, task_name, task_subject,
                DATE_FORMAT(deadline, '%m-%d-%Y') AS deadline,
                DATE_FORMAT(create_at, '%m-%d-%Y') AS create_at
            FROM task WHERE status = 'In Progress' 
            ORDER BY deadline ASC;    
        `)

        res.json(rows);
    } catch(err) {
        console.error('Error retrieving in progress tasks: ', err)
    }
});

taskRoute.get('/all_task/done', async(req, res) => {
    try {
        const [rows] = await db.query(`
            SELECT task_id, task_name, task_subject,
                DATE_FORMAT(deadline, '%m-%d-%Y') AS deadline,
                DATE_FORMAT(create_at, '%m-%d-%Y') AS create_at
            FROM task WHERE status = 'Done' 
            ORDER BY deadline ASC;    
        `)

        res.json(rows);
    } catch(err) {
        console.error('Error retrieving in progress tasks: ', err)
    }
});


taskRoute.delete('/delete/:task_id', async (req, res) => {
    const { task_id } = req.params;
    try {
        const row = await db.query(`
            DELETE FROM task WHERE task_id = ?;
        `, [task_id]);

        res.json({message: 'Task deleted successfully.'})
    } catch (err) {
        console.error('Error deleting task: ', err);
    }
});

export default taskRoute;