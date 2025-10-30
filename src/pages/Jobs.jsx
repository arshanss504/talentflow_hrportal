import React, { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import axios from 'axios'

const fetchJobs = ()=> axios.get('/api/jobs').then(r=>r.data)

export default function Jobs(){
  const qc = useQueryClient()
  const { data: jobs = [], isLoading } = useQuery(['jobs'], fetchJobs)
  const [show, setShow] = useState(false)
  const [title, setTitle] = useState('')

  const createJob = useMutation(j=> axios.post('/api/jobs', j).then(r=>r.data), { onSuccess: ()=> qc.invalidateQueries('jobs') })

  if(isLoading) return <div className='card'>Loading...</div>

  return (
    <div>
      <div className='flex justify-between items-center mb-4'>
        <h2 className='text-xl font-semibold'>Jobs</h2>
        <button className='button' onClick={()=>setShow(true)}>New Job</button>
      </div>

      <div className='grid grid-cols-3 gap-4'>
        {jobs.map(j=>(
          <div key={j.id} className='card'>
            <div className='font-bold'>{j.title}</div>
            <div className='small'>{j.status}</div>
          </div>
        ))}
      </div>

      {show && (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-40'>
          <div className='bg-white p-6 rounded shadow w-96'>
            <h3 className='font-bold mb-2'>Create Job</h3>
            <input className='input w-full mb-2' value={title} onChange={e=>setTitle(e.target.value)} placeholder='Title' />
            <div className='flex justify-end gap-2'>
              <button className='button' onClick={()=>{ createJob.mutate({ title }); setShow(false); setTitle('') }}>Create</button>
              <button className='input' onClick={()=>setShow(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
