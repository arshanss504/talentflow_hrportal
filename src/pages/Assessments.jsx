import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function Assessments(){
  const [jobId, setJobId] = useState('job-0')
  const [questions, setQuestions] = useState([])
  const [text, setText] = useState('')
  const [difficulty, setDifficulty] = useState('medium')

  useEffect(()=>{
    axios.get(`/api/assessments/${jobId}`).then(r=>setQuestions(r.data || []))
  },[jobId])

  function add(){
    const q = { id: Date.now().toString(), title: text, difficulty }
    const next = [...questions, q]
    setQuestions(next)
    axios.put(`/api/assessments/${jobId}`, next)
    setText('')
  }

  return (
    <div>
      <h2 className='text-xl font-semibold mb-4'>Assessment Builder</h2>
      <div className='card mb-4'>
        <label className='block mb-1'>Job</label>
        <input className='input mb-2' value={jobId} onChange={e=>setJobId(e.target.value)} />
        <div className='flex gap-2 items-center'>
          <input className='input' placeholder='Question text' value={text} onChange={e=>setText(e.target.value)} />
          <select className='input' value={difficulty} onChange={e=>setDifficulty(e.target.value)}>
            <option value='easy'>Easy</option>
            <option value='medium'>Medium</option>
            <option value='hard'>Hard</option>
          </select>
          <button className='button' onClick={add}>Add</button>
        </div>
      </div>

      <div className='card'>
        <h3 className='font-bold mb-2'>Preview</h3>
        <ul>
          {questions.map(q=> <li key={q.id} className='py-1 border-b'>{q.title} <span className='small'>({q.difficulty})</span></li>)}
        </ul>
      </div>
    </div>
  )
}
