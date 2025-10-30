import React from 'react'
import { useQuery } from 'react-query'
import axios from 'axios'
import Card from '../components/Card'

export default function Dashboard(){
  const { data: jobs = [] } = useQuery(['jobs'], ()=>axios.get('/api/jobs').then(r=>r.data))
  const { data: candidates = [] } = useQuery(['candidates'], ()=>axios.get('/api/candidates').then(r=>r.data))
  const { data: assessments = [] } = useQuery(['assessments-all'], ()=>axios.get('/api/assessments-all').then(r=>r.data))

  return (
    <div className='grid grid-cols-3 gap-4'>
      <Card title='Jobs' value={jobs.length} />
      <Card title='Candidates' value={candidates.length} />
      <Card title='Assessments' value={assessments.length} />
    </div>
  )
}
