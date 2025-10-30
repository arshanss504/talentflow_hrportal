import React from 'react'
import { useQuery } from 'react-query'
import axios from 'axios'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

export default function Analytics(){
  const { data: candidates = [] } = useQuery(['candidates'], ()=>axios.get('/api/candidates').then(r=>r.data))

  const counts = candidates.reduce((acc,c)=>{ acc[c.stage]=(acc[c.stage]||0)+1; return acc }, {})
  const data = Object.keys(counts).map(k=>({ stage: k, count: counts[k] }))

  return (
    <div>
      <h2 className='text-xl font-semibold mb-4'>Analytics</h2>
      <div className='card' style={{height:300}}>
        <ResponsiveContainer width='100%' height='100%'>
          <BarChart data={data}><XAxis dataKey='stage' /><YAxis /><Tooltip /><Bar dataKey='count' fill='#4f46e5' /></BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
