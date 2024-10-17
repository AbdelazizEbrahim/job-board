import React from 'react'
import { createCompany } from '../actions/workosActions';
import { withAuth } from '@workos-inc/authkit-nextjs';

export default async function NewCompanyPage() {
const {user} = await withAuth();

async function handleNewCompanyFormSubmit(data:FormData) {
    'use server';
    if(user) {
        await createCompany(data.get("newCompanyName") as string, user.id);
    }
}

if(!user) {
    return (
        'Login To use this page'
    )
}

  return (
    <div>
    {user && (
        <div className='container'>
            <h2 className='text-lg'>Create a new company</h2>
            <p className='text-gray-500 text-sm mb-2'>Tocreate a job listing you need to have company</p>
            <form 
               action={ handleNewCompanyFormSubmit}
               className='flex gap-2'>
                <input 
                    type='text' 
                    name='newCompanyName'
                    placeholder='Company name' 
                    className='p-2 border border-gray-400 rounded-md'/>
                <button className='flex gap-2 items-center bg-gray-200 px-4 py-2 rounded-md'>
                    Create company
                </button>
            </form>
        </div>
      )}
    </div>
  )
}

