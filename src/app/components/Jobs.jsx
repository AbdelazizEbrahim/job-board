import React from 'react'
import JobRows from './JobRow'

const Jobs = ({ header, jobs }) => {
  return (
    <div className='bg-slate-200 py-6 rounded-3xl'>
      <div className='container'>
        <h2 className='font-bold mb-4'>{header || 'Recent Jobs'}</h2>
        <div className='flex flex-col gap-4'>
          {!jobs?.length && (
            <div>No jobs found</div>
          )}
          {jobs && jobs.map(job => (
            <JobRows key={job.id} jobDoc={job} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Jobs
