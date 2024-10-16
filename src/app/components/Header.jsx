import Link from "next/link";
import React from 'react';
import { getSignInUrl, withAuth, signOut} from "@workos-inc/authkit-nextjs";

export default async function Header() {
    const { user } = await withAuth();
    const signInUrl = await getSignInUrl();
    console.log("user and url: ", user, signInUrl);

  return (
    <div>
      <header>
        {/* {JSON.stringify(user)} */}
        <div className="container flex items-center justify-between mx-auto my-4">
            <Link className="font-bold text-xl " href={'/'}>Job Board</Link>
            <nav className="flex gap-2">
                {!user && (
                    <Link href={signInUrl} className="bg-gray-200 px-4 py-2 rounded-md">Login</Link>
                )}
                {user && (
                  <form action={async () => {
                    'use server';
                     await signOut();
                  }}>
                    <button type="submit" className="px-4 py-2 rounded-md bg-gray-200">Logout</button>
                  </form>
                )}
                <Link href={'/new-listing'} className="px-4 py-2 rounded-md bg-blue-500 text-white">Post Job</Link>
            </nav>
        </div>
      </header>
    </div>
  )
}

