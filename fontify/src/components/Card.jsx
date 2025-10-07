import React, { useState, useEffect } from 'react'
import Item from './Item'
import axios from 'axios';
import { useParams } from 'react-router-dom';


const Card = ({title, className, tasks, onUpdate}) => {


    const url = `https://to-do-list-zeta-five-98.vercel.app`
    const [isOpenMenu, setIsOpenMenu] = useState(null);
    const [displayTasks, setDisplayTasks] = useState(true);


    const openMenu = (task_id) => {
        setIsOpenMenu(prev => (prev === task_id ? null : task_id))
    }

    const displayTaskList = () => {
        setDisplayTasks((prev) => !prev)
    }


    const moveTaskProgress = async (task_id) => {
        try {
            const response = await axios.patch(`${url}/task/update_inProgress/${task_id}`);
            console.log(response.data.message)

            await onUpdate();
        } catch(err) {

        }
    }

    const moveTaskDone = async (task_id) => {
        try {
            const response = await axios.patch(`${url}/task/update_Done/${task_id}`);
            console.log(response.data.message)

            await onUpdate();
        } catch(err) {

        }
    }


    const deleteTask = async (task_id) => {
        try {
            await axios.delete(`${url}/task/delete/${task_id}`);

            await onUpdate();
        } catch (err) {
            console.error('Failed to delete task: ', err);
        }
    }

    






    return (

        <div className={`flex flex-col items-center gap-2 justify-start p-2 w-full xl:w-[450px] lg:w-[450px] h-fit rounded-[10px] ${className}`}>
            <div className='w-full flex justify-between  items-center px-2'>
                <label className={'font-bold text-[#FFFCF6]'}>{title}</label>
                <div onClick={displayTaskList} className='size-8 p-2 rounded-[25px] object-cover hover:bg-[#838383] active:bg-[#1F1F1F] h-fit'>
                    <img src="/src/assets/icons/add_new_task.png" alt="plus" className={`w-full h-full object-cover transition-all duration-300`}/>
                </div>
            </div>

            { displayTasks  && (
                <div className={`flex flex-col p-1 rounded-[10px] border-dashed border-2 border-[#FFF] w-full min-h-[50px] gap-1`}>
                    {/* Item */}
                    {tasks.map((task) => (   
                        <div  key={task.task_id} className={task.task_name ? 'relative flex flex-col items-start p-2 bg-[#FFF] w-full h-auto rounded-[7px] gap-1' : 'hidden'}>
                            <div className='flex flex-col items-start w-full h-auto whitespace-nowrap'>
                                <div className='flex flex-row justify-between items-start w-full'>
                                    <label className='text-[#1F1F1F] font-bold break-all'>{task.task_name}</label>
                                    <button onClick={() => openMenu(task.task_id)} className='cursor-pointer flex size-7 p-1 rounded-[25px] active:bg-[#c3c3c3]'>
                                        <img src="/src/assets/icons/dots.png" alt="three dots" className={`${isOpenMenu === task.task_id ? 'rotate-180' : 'rotate-90'} transition-all duration-200`}/>
                                    </button>
                                </div>
                                <label className='text-[#1F1F1F] text-[14px]'>Subject: {task.task_subject}</label>
                                <label className='text-[#1F1F1F] text-[12px]'>Deadline: {task.deadline}</label>
                                <label className='text-[#1F1F1F] text-[12px]'>Date created: {task.create_at}</label>
                            </div>

                            {isOpenMenu === task.task_id && (
                                <div className='absolute top-8 right-0 z-1 cursor-pointer p-2 bg-[#c3c3c3] rounded-[10px] flex flex-col gap-1'>
                                    <button onClick={() => moveTaskProgress(task.task_id)} className='cursor-pointer flex bg-[#FFF] px-2 py-1 rounded-[7px] hover:bg-[#dcdcdc] active:scale-97 text-sm'> 
                                        In Progress
                                    </button>
                                    <button onClick={() => moveTaskDone(task.task_id)} className='cursor-pointer flex bg-[#FFF] px-2 py-1 rounded-[7px] hover:bg-[#dcdcdc] active:scale-97 text-sm'> 
                                        Done
                                    </button>
                                    <button onClick={() => deleteTask(task.task_id)} className='cursor-pointer flex bg-[#FFF] px-2 py-1 rounded-[7px] hover:bg-[#dcdcdc] active:scale-97 text-sm'> 
                                        Delete
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default Card;



// import React, { useState, useEffect, useRef } from 'react'
// import Item from './Item'
// import axios from 'axios';
// import { useParams } from 'react-router-dom';
// import Draggable from 'react-draggable';

// const Card = ({ title, className, tasks, onUpdate }) => {
//     const url = `http://localhost:5000`
//     const [isOpenMenu, setIsOpenMenu] = useState(null);

//     const openMenu = (task_id) => {
//         setIsOpenMenu(prev => (prev === task_id ? null : task_id))
//     }

//     const moveTaskProgress = async (task_id) => {
//         try {
//             const response = await axios.patch(`${url}/task/update_inProgress/${task_id}`);
//             console.log(response.data.message);
//             await onUpdate();
//         } catch (err) {
//             console.error(err);
//         }
//     }

//     const moveTaskDone = async (task_id) => {
//         try {
//             const response = await axios.patch(`${url}/task/update_Done/${task_id}`);
//             console.log(response.data.message);
//             await onUpdate();
//         } catch (err) {
//             console.error(err);
//         }
//     }

//     const deleteTask = async (task_id) => {
//         try {
//             await axios.delete(`${url}/task/delete/${task_id}`);
//             await onUpdate();
//         } catch (err) {
//             console.error('Failed to delete task: ', err);
//         }
//     }

//     return (
//         <div className={`flex flex-col items-center gap-2 justify-start p-2 min-w-[450px] w-fit h-fit rounded-[10px] ${className}`}>
//             <label className={'font-bold text-[#FFFCF6]'}>{title}</label>
//             <div className='flex flex-col p-1 rounded-[10px] border-dashed border-2 border-[#FFF] w-full min-h-[50px] h-fit gap-1'>
//                 {tasks.map((task) => {
                    
//                         <Draggable>
//                             <div  key={task.task_id} className={task.task_name ? 'relative flex flex-col items-start p-2 bg-[#FFF] w-full h-auto rounded-[7px] gap-1' : 'hidden'}>
//                                 <div className='flex flex-col items-start w-full h-auto whitespace-nowrap'>
//                                     <div className='flex flex-row justify-between items-start w-full'>
//                                         <label className='text-[#1F1F1F] font-bold break-all'>{task.task_name}</label>
//                                         <button onClick={() => openMenu(task.task_id)} className='cursor-pointer flex size-7 p-1 rounded-[25px] active:bg-[#c3c3c3]'>
//                                             <img src="/src/assets/icons/dots.png" alt="three dots" className={`${isOpenMenu === task.task_id ? 'rotate-180' : 'rotate-90'} transition-all duration-200`} />
//                                         </button>
//                                     </div>
//                                     <label className='text-[#1F1F1F] text-[14px]'>Subject: {task.task_subject}</label>
//                                     <label className='text-[#1F1F1F] text-[12px]'>Deadline: {task.deadline}</label>
//                                     <label className='text-[#1F1F1F] text-[12px]'>Date created: {task.create_at}</label>
//                                 </div>

//                                 {isOpenMenu === task.task_id && (
//                                     <div className='absolute top-5 -right-30 z-1 cursor-pointer p-2 bg-[#c3c3c3] rounded-[10px] rounded-tl-[0px] flex flex-col gap-1'>
//                                         <button onClick={() => moveTaskProgress(task.task_id)} className='cursor-pointer flex bg-[#FFF] px-2 py-1 rounded-[7px] active:scale-97 text-sm'>
//                                             In Progress
//                                         </button>
//                                         <button onClick={() => moveTaskDone(task.task_id)} className='cursor-pointer flex bg-[#FFF] px-2 py-1 rounded-[7px] active:scale-97 text-sm'>
//                                             Done
//                                         </button>
//                                         <button onClick={() => deleteTask(task.task_id)} className='cursor-pointer flex bg-[#FFF] px-2 py-1 rounded-[7px] active:scale-97 text-sm'>
//                                             Delete
//                                         </button>
//                                     </div>
//                                 )}
//                             </div>
//                         </Draggable>
                   
//                 })}
//             </div>
//         </div>
//     )
// }

// export default Card;
