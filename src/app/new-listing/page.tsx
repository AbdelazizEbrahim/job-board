'use server'

import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { withAuth } from '@workos-inc/authkit-nextjs';
import { WorkOS } from '@workos-inc/node';
import Link from 'next/link';
import React from 'react'

export default async function NewListingPage (){
    const {user} = await withAuth();
    const workos = new WorkOS(process.env.WORKOS_API_KEY);

    if (!user) {
        return <div>You are not logged in to post jobs</div>
    }

    const organizationalMemberships = await workos.userManagement.listOrganizationMemberships({
        userId: user?.id,
    })

    const activeOrganizationalMemberships = organizationalMemberships.data.filter(om => om.status === 'active');

    const organizationsName:{[key: string]: string} = {};
    for (const activeMembership of activeOrganizationalMemberships) {
        const organization = await workos.organizations.getOrganization(activeMembership.organizationId);
        organizationsName[organization.id] = organization.name;
    }
  return (
    <div className='container'>
        <div>
            <h2 className='text-lg mt-6'>Your Companies</h2>
            <p className='text-gray-500 text-sm mb-2'>Select Company</p>
            <div className=''>
                <div className='border inline-block rounded-md'>
                {Object.keys(organizationsName).map(OrgId => (
                    <Link href={`/new-listing/${OrgId}`} // Add `/` before `${OrgId}`
                            key={OrgId} 
                            className='py-2 px-4 flex gap-2 items-center'>
                        {organizationsName[OrgId]}
                        <FontAwesomeIcon className='h-4' icon={faArrowRight}/>
                    </Link>
                    ))}
                </div>
            </div>
        
            {organizationalMemberships.data.length === 0 && (
                <div className='border border-blue-200 bg-blue-50 p-4 rounded-md'>
                No Companies Found assigned to your user
                </div>
            )}
        </div>
    
        <Link
            className='inline-flex gap-2 items-center bg-gray-200 px-4 py-2 rounded-md mt-6'
            href={'/new-company'}
            >
            Create a new company
            <FontAwesomeIcon className='h-4' icon={faArrowRight} />
        </Link>
   </div>
  
  )
}

