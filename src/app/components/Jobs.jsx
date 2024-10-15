import React from 'react'
import JobRows from './JobRow'

const Jobs = () => {
  return (
    <div className='bg-slate-200 py-6 rounded-3xl'>
      <div className='container'>
        <h2 className='font-bold mb-4'>Recent Jobs</h2>
        <div className='flex flex-col gap-4'>
            <JobRows/>
            <JobRows/>
            <JobRows/>
            <JobRows/>
            <JobRows/>
        </div>
      </div>
    </div>
  )
}

export default Jobs
