import React from 'react'
import { FaThumbsUp } from 'react-icons/fa'

function FormSuccess() {
  return (
    <div className='h-full bg-base-100 top-0 w-full absolute right-0 grid place-content-center text-center'>
            <div className='flex flex-col items-center justify-center gap-4 pop-animation'>
            <div className='h-24 w-24 rounded-full bg-green-600 grid place-content-center'>
              <FaThumbsUp className='text-4xl text-white' />
            </div>
              <p className='text-5xl text-white' >Success</p>
            </div>

          </div>
  )
}

export default FormSuccess
