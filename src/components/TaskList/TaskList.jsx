import React from 'react'

const TaskList = ({data}) => {
  return (
    <div id='tasklist' className='h-[50%] overflow-x-auto w-full flex flex-nowrap items-center justify-start gap-5 py-5 mt-10'>
        <div className = 'flex-shrink-0 h-full w-[300px] bg-red-400 rounded-xl p-5'>
            <div className='flex items-center justify-between'>
                <h3 className='px-3 py-1 text-sm rounded bg-red-600'>High</h3>
                <h4 className='text-sm'>{data.tasks.date}</h4>
            </div>
            <h2 className='mt-3 text-2xl font-semibold'>{data.tasks.title}</h2>
            <p className='text-sm mt-2 '>{data.tasks.description}</p>
        </div>
        {/* <div className = 'flex-shrink-0 h-full w-[300px] bg-blue-400 rounded-xl p-5'>
            <div className='flex items-center justify-between'>
                <h3 className='px-3 py-1 text-sm rounded bg-red-600'> High</h3>
                <h4 className='text-sm'>5 AUG 2025</h4>
            </div>
            <h2 className='mt-3 text-2xl font-semibold'>Make a New Project</h2>
            <p className='text-sm mt-2 '>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum accusamus ratione nostrum vero sed alias?</p>
        </div>
        <div className = 'flex-shrink-0 h-full w-[300px] bg-green-400 rounded-xl p-5'>
            <div className='flex items-center justify-between'>
                <h3 className='px-3 py-1 text-sm rounded bg-red-600'> High</h3>
                <h4 className='text-sm'>5 AUG 2025</h4>
            </div>
            <h2 className='mt-3 text-2xl font-semibold'>Make a New Project</h2>
            <p className='text-sm mt-2 '>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum accusamus ratione nostrum vero sed alias?</p>
        </div>
        <div className = 'flex-shrink-0 h-full w-[300px] bg-orange-400 rounded-xl p-5'>
            <div className='flex items-center justify-between'>
                <h3 className='px-3 py-1 text-sm rounded bg-red-600'> High</h3>
                <h4 className='text-sm'>5 AUG 2025</h4>
            </div>
            <h2 className='mt-3 text-2xl font-semibold'>Make a New Project</h2>
            <p className='text-sm mt-2 '>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum accusamus ratione nostrum vero sed alias?</p>
        </div>
        <div className = 'flex-shrink-0 h-full w-[300px] bg-yellow-400 rounded-xl p-5'>
            <div className='flex items-center justify-between'>
                <h3 className='px-3 py-1 text-sm rounded bg-red-600'> High</h3>
                <h4 className='text-sm'>5 AUG 2025</h4>
            </div>
            <h2 className='mt-3 text-2xl font-semibold'>Make a New Project</h2>
            <p className='text-sm mt-2 '>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum accusamus ratione nostrum vero sed alias?</p>
        </div> */}
    </div>
  )
}

export default TaskList