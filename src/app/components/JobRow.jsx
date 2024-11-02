'use client'

import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import TimeAgo from './TimeAgo'
import Link from 'next/link'
import axios from 'axios';


export default function JobRows ({jobDoc}) {

  return (
    <>
      <div className='bg-white p-4 rounded-lg shadow-sm  relative'>
        <div className='absolute cursor-pointer top-4 right-4'>
          <FontAwesomeIcon className='size-4 text-gray-300' icon={faHeart}/>
        </div>
        <div className='flex grow gap-4'>
          <div className='content-center'>
            <img
              className='size-12'
              src='data:image/png;base64,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'
              alt=''
            />
          </div>
          <div className='grow sm:flex'>
            <div className='grow'>
              <div className='hover:underline text-gray-500 text-sm'>
                <Link href={`jobs/${jobDoc.orgId}`}>{jobDoc.orgName || '?'}</Link>
              </div>
              <div className='font-bold text-lg mb-1'>
                <Link className='hover:underline' href={'/show/'+jobDoc._id}>{jobDoc.title}</Link>
              </div>
              <div className='text-gray-400 text-sm capitalize'>
                {jobDoc.remote}
                {' '} &middot; {' '}
                {jobDoc.city}, {jobDoc.country}
                {' '} &middot;{' '}
                {jobDoc.type}-time
                {jobDoc.isAdmin && (
                  <>
                    {' '} &middot; {' '}
                    <Link href={'/jobs/edit/' + jobDoc._id}>Edit</Link>
                    {' '} &middot; {' '}
                    <button
                      type='button'
                      onClick={async () => {
                        await axios.delete('/api/jobs?id='+jobDoc._id);
                        window.location.reload();
                      }}>
                        Delete
                    </button>
                  </>
                )}
              </div>
            </div>
            {jobDoc.createdAt && (
              <div className='content-end text-gray-500 text-sm'>
                <TimeAgo createdAt={jobDoc.createdAt}/>
              </div>
            )}
          </div>
        </div>
      </div>     
    </>
  )
}

