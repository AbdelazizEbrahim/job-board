import { withAuth } from '@workos-inc/authkit-nextjs';
import { WorkOS } from '@workos-inc/node';
import React from 'react'

type PageProps = {
  params: {
    orgId: string;
  }
}

export default async function NewListingFormPage (props: PageProps) {

  const {user} = await withAuth();
  const workos = new WorkOS(process.env.WORKOS_API_KEY);
  
  if (!user) {
    return 'Please login';
  }

  const orgId = props.params.orgId;
  const oms = await workos.userManagement.listOrganizationMemberships({userId: user.id, organizationId:orgId});
  const hasAccess = oms.data.length > 0;
 
  if(!hasAccess) {
    return "no access"
  }
  
  return (
    <form 
       action=''
       className='container mt-6'
    >
     <input className='border p-2' placeholder='job title' type='text'/>
    </form>
  )
}

