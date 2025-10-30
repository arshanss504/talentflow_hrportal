import React from 'react'
import { useQuery, useQueryClient } from 'react-query'
import axios from 'axios'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

const stages = ['applied','screen','tech','offer','hired','rejected']

export default function Candidates(){
  const qc = useQueryClient()
  const { data: candidates = [], isLoading } = useQuery(['candidates'], ()=>axios.get('/api/candidates').then(r=>r.data))

  if(isLoading) return <div className='card'>Loading...</div>

  const byStage = stages.reduce((acc, s)=>{ acc[s]=candidates.filter(c=>c.stage===s); return acc }, {})

  async function onDragEnd(result){
    if(!result.destination) return
    const { source, destination, draggableId } = result
    const candId = draggableId
    const toStage = destination.droppableId
    // optimistic update: PATCH to mirage
    await axios.patch(`/api/candidates/${candId}`, { stage: toStage })
    qc.invalidateQueries('candidates')
  }

  return (
    <div>
      <h2 className='text-xl font-semibold mb-4'>Candidates Pipeline</h2>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className='flex gap-4 overflow-auto'>
          {stages.map(stage => (
            <div key={stage} className='w-72'>
              <h3 className='font-semibold mb-2'>{stage.toUpperCase()}</h3>
              <Droppable droppableId={stage}>
                {(provided)=> (
                  <div ref={provided.innerRef} {...provided.droppableProps} className='bg-white p-2 rounded shadow min-h-[200px]'>
                    {byStage[stage].map((c,index)=>(
                      <Draggable key={c.id} draggableId={c.id} index={index}>
                        {(prov)=> (
                          <div ref={prov.innerRef} {...prov.draggableProps} {...prov.dragHandleProps} className='p-3 mb-2 border rounded'>
                            <div className='font-medium'>{c.name}</div>
                            <div className='small'>{c.email}</div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>
    </div>
  )
}
