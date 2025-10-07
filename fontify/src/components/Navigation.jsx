import React from 'react'
import { Link } from 'react-router-dom'


const Navigation = () => {
  return (
    <div className='sticky top-0 flex w-full bg-[#1F1F1F]'>
        <div className='flex items-center justify-center text-[#FFFCF6] font-bold w-full h-[60px] border-b-2 border-b-[#FFFCF6]'>
            <Link to={'/home'} className='p-2 pl-4 pr-4 rounded-[10px] hover:bg-[#474747] hover:scale-102 active:scale-98 transition-all duration-100'> Home </Link>
            <Link to={'/task'} className='p-2 pl-4 pr-4 rounded-[10px] hover:bg-[#474747] hover:scale-102 active:scale-98 transition-all duration-100'> Task </Link>
        </div>
    </div>
  )
}

export default Navigation