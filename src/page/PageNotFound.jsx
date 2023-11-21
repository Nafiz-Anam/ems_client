import React from 'react'
import { Link } from 'react-router-dom'

export default function PageNotFound() {
  return (
    <div className='flex items-center justify-center w-full h-screen text-5xl align-middle bg-slate-900 text-slate-500'>
      <div className="">
        <p className='mb-4'>Page Not Found</p>
        <div className="mt-1 text-sm">
          <Link to='/'
            className='px-4 py-2 text-white bg-yellow-600 rounded-md '>Go home</Link>
        </div>
      </div>
    </div>
  )
}
