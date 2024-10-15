import React from 'react'

const Hero = () => {
  return (
    <section className='container my-16'>
      <h1 className='text-4xl font-bold text-center'>
        Find Your next <br/> dream job
      </h1>
      {/* <p className='text-center text-gray-600 mt-2'>Lorem ipsum dolor sit amet consectetur adipisicing 
        elit. Modi aut iure cum veritatis commodi eligendi similique,
      </p> */}
      <form className='flex gap-2 mt-4 max-w-md mx-auto'>
        <input 
           type='search'
           className='border border-gray-400 w-full py-2 px-3 rounded-md'
           placeholder='Search phrase...'
        />
        <button className='bg-blue-600 text-white py-2 px-4 rounded-md'>
            Serach
        </button>
      </form>
    </section>
  )
}

export default Hero
