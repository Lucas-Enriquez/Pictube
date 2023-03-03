import Link from 'next/link'
import React from 'react'


function Pins() {
  return (
    <div className='px-2 md:pxp-5'>
      <div className='bg-gray-50'>
        {/* <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm}/> */}
      </div>
      <div className='h-full'>
        <Link href="/">Home</Link>
        <Link href="/category/:categoryId">Category</Link>
        <Link href="/pin-detail/:pinId">Pin Detail</Link>
        <Link href="/pin-detail/:pinId">Create Pin</Link>
        {/* <Link href={{pathname: "/search", query: {searchTerm} }}>Search</Link> */}
      </div>
    </div>
  )
}

export default Pins