import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Jobs from './pages/Jobs'
import Candidates from './pages/Candidates'
import Assessments from './pages/Assessments'
import Analytics from './pages/Analytics'
import Navbar from './components/Navbar'
import ProtectedRoute from './components/ProtectedRoute'

export default function App(){
  return (
    <div className='container'>
      <Navbar />
      <Routes>
        <Route path='/login' element={<Login/>} />
        <Route path='/' element={<ProtectedRoute><Dashboard/></ProtectedRoute>} />
        <Route path='/dashboard' element={<ProtectedRoute><Dashboard/></ProtectedRoute>} />
        <Route path='/jobs' element={<ProtectedRoute><Jobs/></ProtectedRoute>} />
        <Route path='/candidates' element={<ProtectedRoute><Candidates/></ProtectedRoute>} />
        <Route path='/assessments' element={<ProtectedRoute><Assessments/></ProtectedRoute>} />
        <Route path='/analytics' element={<ProtectedRoute><Analytics/></ProtectedRoute>} />
        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
    </div>
  )
}
