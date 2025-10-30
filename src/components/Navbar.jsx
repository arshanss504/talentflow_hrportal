import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Navbar(){
  const navigate = useNavigate()
  const user = localStorage.getItem('tf_user')

  function logout(){
    localStorage.removeItem('tf_user')
    navigate('/login')
  }

  return (
    <div className='nav'>
      <div className='font-bold'>Talent Flow</div>
      <div className='flex gap-4 items-center'>
        <Link to='/dashboard' className='small'>Dashboard</Link>
        <Link to='/jobs' className='small'>Jobs</Link>
        <Link to='/candidates' className='small'>Candidates</Link>
        <Link to='/assessments' className='small'>Assessments</Link>
        <Link to='/analytics' className='small'>Analytics</Link>
        {user ? (
          <button onClick={logout} className='button ml-2'>Logout</button>
        ) : (
          <Link to='/login' className='button ml-2'>Login</Link>
        )}
      </div>
    </div>
  )
}
