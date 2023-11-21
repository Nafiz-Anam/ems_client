import React from 'react'
import Transition from '../../../utils/Transition'

export default function GlobalLoader() {
  return (

    <div className="">
      <Transition
        className="fixed inset-0 z-50 transition-opacity bg-black opacity-60 backdrop-blur-sm"
        show={true}
        enter="transition ease-out duration-200"
        enterStart="opacity-0"
        enterEnd="opacity-100"
        leave="transition ease-out duration-100"
        leaveStart="opacity-100"
        leaveEnd="opacity-0"
        aria-hidden="true"
      />
      <span className="absolute h-40 w-40 loader left-[45%] top-[45%]"></span>
    </div>

  )
}
