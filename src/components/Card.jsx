import React from 'react'

export default function Card({title, value, children}){
  return (
    <div className='card'>
      <div className='text-sm text-gray-500'>{title}</div>
      <div className='text-2xl font-bold my-2'>{value}</div>
      {children}
    </div>
  )
}
