import React from 'react'

const Item = ({taskName, date_created, subject}) => {
  return (
    <div className='cursor-pointer flex justify-between p-2 bg-[#FFF] rounded-[7px] w-full active:scale-98 transition-all duration-100'>
        <div className='flex flex-col w-full'>
            <label className='text-[#1F1F1F] font-bold'>{taskName}</label>
            <label className='text-[#828282] text-[14px]'>{date_created}</label>
        </div>

        <label className='w-full text-[#828282] text-[14px] text-right'>{subject}</label>
    </div>
  )
}

export default Item