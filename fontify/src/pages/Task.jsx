import React, { useEffect, useState } from 'react'
import Card from '../components/Card'
import axios from 'axios';


const Task = () => {
    const [newTask, setNewTask] = useState(false);
    const handleNewTask = () => {
        setNewTask(prev => !prev);
    }

    const url = `https://to-do-list-zeta-five-98.vercel.app`;

    const [taskName, setTaskName] = useState('');
    const [taskSubject, setTaskSubject] = useState('');
    const [taskDeadline, setTaskDeadline] = useState('');    

    const [taskList, setTaskList] = useState([]);
    const [taskInProgress, setTaskInProgress] = useState([]);
    const [taskDone, setTaskDone] = useState([]);

    const getTask = async () => {
        try {
            const response = await axios.get(`${url}/task/all_task`);

            console.log('Data from response: ', response.data)
            setTaskList(response.data);
        } catch (err) {
            console.error('Failed to get tasks: ', err);
        }
    }

    const getInProgressTask = async () => {
        try {
            const response = await axios.get(`${url}/task/all_task/in_progress`);

            console.log('Data from response: ', response.data)
            setTaskInProgress(response.data);
        } catch (err) {
            console.error('Failed to get tasks: ', err);
        }
    }

    const getDoneTask = async () => {
        try {
            const response = await axios.get(`${url}/task/all_task/done`);

            console.log('Data from response: ', response.data)
            setTaskDone(response.data);

        } catch (err) {
            console.error('Failed to get tasks: ', err);
        }
    }


    const handleAddTask = async () => {
        try {
            const task = await axios.post(`${url}/task/create_task`, {
                task_name: taskName,
                task_subject: taskSubject,
                deadline: taskDeadline
            });
            setTaskName('');
            setTaskSubject('');
            setTaskDeadline('');

            await getTask();
            
        } catch (err) {
            console.error('Error adding new task: ', err);
        }
    }

    const refreshAllTasks = async () => {
        await Promise.all([getTask(), getInProgressTask(), getDoneTask()]);
    }

    useEffect(() => {
        refreshAllTasks();
    }, []);

    
    return (
        <div className='flex flex-col items-start xl:w-auto lg:w-auto w-full h-full'>
            
            <div className='flex flex-row justify-center w-full p-10 gap-5'>

                {/* <button onClick={handleNewTask} className={`cursor-pointer flex items-center gap-2 w-fit h-fit bg-[#1F1F1F] text-[#FFFCF6] p-2 pl-4 pr-4 rounded-[25px] active:scale-98 whitespace-nowrap`}>
                    <div className='w-[20px] h-[20px] p-1 object-fit'>
                        <img src="/src/assets/icons/add_new_task.png" alt="plus" className='w-full h-full object-cover'/>
                    </div>
                    Add Task
                </button> */}

                {/* Create new task here */}
                <form className={`absolute bottom-5 left-5 flex flex-col text-[#FFFCF6] gap-2 overflow-hidden`}>
                    <div onClick={handleNewTask} className={`flex flex-row justify-between items-center w-auto bg-[#1F1F1F] p-2 rounded-[10px] active:scale-97`}>
                        <div className='size-8 p-2 rounded-[25px] object-cover hover:bg-[#838383] active:bg-[#1F1F1F] h-fit'>
                            <img src="/src/assets/icons/add_new_task.png" alt="plus" className={`w-full h-full object-cover ${newTask ? 'rotate-45' : 'rotate-0'} transition-all duration-300`}/>
                        </div>
                        <label className={'flex justify-end font-bold text-[20px] text-[#FFFCF6] pr-2 w-full'}>NEW TASK</label>
                    </div>
                    
                    
                    <div className={`flex flex-col justify-between gap-2 rounded-[10px] ${newTask ? 'h-[350px] p-4' : 'h-[0px] p-0'} transition-all duration-300 w-full transition-all duration-200 overflow-hidden transition-all duration-300 bg-[#1F1F1F]`}>
                        <div className='flex flex-col items-start gap-2 w-full'>
                            <span>Task</span>
                            <input type="text" placeholder='Add task name' value={taskName} onChange={(e) => setTaskName(e.target.value)}
                            className='w-full bg-[#FFFCF6] text-[#1F1F1F] p-2 rounded-[7px]'/>
                        </div>
                        <div className='flex flex-col items-start gap-2 w-full'>
                            <span>Subject</span>
                            <input type="text" placeholder='Add task name' value={taskSubject} onChange={(e) => setTaskSubject(e.target.value)}
                            className='w-full bg-[#FFFCF6] text-[#1F1F1F] p-2 rounded-[7px]'/>
                        </div>
                        <div className='flex flex-col items-start gap-2 w-full'>
                            <span>Deadline</span>
                            <input type="date" placeholder='Add task name' value={taskDeadline} onChange={(e) => setTaskDeadline(e.target.value)}
                            className='w-full bg-[#FFFCF6] text-[#1F1F1F] p-2 rounded-[7px]'/>
                        </div>

                        <div className='flex justify-end w-full gap-2'>
                            <button onClick={handleAddTask} type='button' className='cursor-pointer bg-[#739F32] min-w-[100px] p-2 pl-4 pr-4 rounded-[25px] active:scale-97'>Push</button>
                        </div>
                    </div>
                

                </form>
                

                

                <div className='flex flex-col xl:flex-row lg:flex-row md:flex-row justify-center gap-2 w-full'>

                    {/* New Task List */}

                    <Card 
                        title='Task'
                        className='text-[#474747] bg-[#376D41]'
                        tasks={taskList}
                        onUpdate={refreshAllTasks}
                    />

                    <Card 
                        title='In Progress'
                        className='text-[#474747] bg-[#943838]'
                        tasks={taskInProgress}
                        onUpdate={refreshAllTasks}
                    />

                    <Card 
                        title='Done'
                        className='text-[#474747] bg-[#25375B]'
                        tasks={taskDone}
                        onUpdate={refreshAllTasks}
                    />

                </div>
            </div>
        </div>
    )
}

export default Task