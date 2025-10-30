import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login(){
  const [email, setEmail] = useState('admin@example.com')
  const [password, setPassword] = useState('password')
  const navigate = useNavigate()

  function submit(e){
    e.preventDefault()
    // very small mock auth
    if(email && password){
      localStorage.setItem('tf_user', JSON.stringify({email}))
      navigate('/dashboard')
    }
  }

  return (
    <div className='max-w-md mx-auto mt-12'>
      <div className='card'>
        <h2 className='text-xl font-semibold mb-4'>Login</h2>
        <form onSubmit={submit} className='flex flex-col gap-2'>
          <input className='input' value={email} onChange={e=>setEmail(e.target.value)} placeholder='email' />
          <input className='input' value={password} onChange={e=>setPassword(e.target.value)} placeholder='password' type='password' />
          <div className='flex justify-end mt-2'>
            <button className='button' type='submit'>Login</button>
          </div>
        </form>
      </div>
    </div>
  )
}
