import Link from "next/link";

import React from 'react'

const Header = () => {
  return (
    <div>
      <header>
        <div className="container flex items-center justify-between mx-auto my-4">
            <Link className="font-bold text-xl " href={'/'}>Job Board</Link>
            <nav className="flex gap-2 *:px-4 *:py-2 *:rounded-md">
                <Link href={'/login'} className="bg-gray-200 ">Login</Link>
                <Link href={'/new-listing'} className="bg-blue-500 text-white">Post Job</Link>
            </nav>
        </div>
      </header>
    </div>
  )
}

export default Header
