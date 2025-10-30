import { createServer, Response } from 'miragejs'
import localforage from 'localforage'
import { faker } from '@faker-js/faker'


function randDelay(){ return 200 + Math.floor(Math.random()*800) }
function maybeFail(){ return Math.random() < 0.08 }

export function makeServer(){ 
  createServer({
    routes(){
      this.namespace = 'api'

      this.get('/jobs', async ()=>{
        await sleep()
        let jobs = await localforage.getItem('jobs')
        if(!jobs){
          jobs = Array.from({length:25}, (_,i)=>({ id: 'job-'+i, title: 'Job '+(i+1), slug: 'job-'+(i+1), status: i%7===0 ? 'archived' : 'active' }))
          await localforage.setItem('jobs', jobs)
        }
        return jobs
      })

      this.post('/jobs', async (schema, req)=>{
        await sleep()
        if(maybeFail()) return new Response(500, {}, { error: 'Random write error' })
        const body = JSON.parse(req.requestBody)
        let jobs = (await localforage.getItem('jobs')) || []
        const newJob = { id: 'job-'+Date.now(), title: body.title||'Untitled', slug: (body.title||'untitled').toLowerCase().replace(/\s+/g,'-')+'-'+Date.now(), status: 'active' }
        jobs.push(newJob)
        await localforage.setItem('jobs', jobs)
        return newJob
      })

      this.get('/candidates', async ()=>{
        await sleep()
        let cands = await localforage.getItem('candidates')
        if(!cands){
          const stages = ['applied','screen','tech','offer','hired','rejected']
          cands = Array.from({length:1000}, (_,i)=>{
            const jobIndex = Math.floor(Math.random()*25)
            return { id: 'cand-'+i, name: faker.name.findName(), email: 'cand'+i+'@example.com', jobId: 'job-'+jobIndex, stage: stages[Math.floor(Math.random()*stages.length)] }
          })
          await localforage.setItem('candidates', cands)
        }
        return cands
      })

      this.patch('/candidates/:id', async (schema, req)=>{
        await sleep()
        if(maybeFail()) return new Response(500, {}, { error: 'Random write error' })
        const id = req.params.id
        const body = JSON.parse(req.requestBody)
        let cands = (await localforage.getItem('candidates')) || []
        cands = cands.map(c=> c.id===id ? {...c, ...body} : c)
        await localforage.setItem('candidates', cands)
        return { ok:true }
      })

      this.get('/candidates/:id', async (schema, req)=>{
        await sleep()
        const id = req.params.id
        const cands = (await localforage.getItem('candidates')) || []
        return cands.find(c=>c.id===id) || new Response(404)
      })

      this.get('/assessments/:jobId', async (schema, req)=>{
        await sleep()
        const jobId = req.params.jobId
        const assessments = (await localforage.getItem('assessments')) || {}
        return assessments[jobId] || []
      })

      this.put('/assessments/:jobId', async (schema, req)=>{
        await sleep()
        if(maybeFail()) return new Response(500, {}, { error: 'Random write error' })
        const jobId = req.params.jobId
        const body = JSON.parse(req.requestBody)
        const assessments = (await localforage.getItem('assessments')) || {}
        assessments[jobId] = body
        await localforage.setItem('assessments', assessments)
        return { ok:true }
      })

      this.get('/assessments-all', async ()=>{
        await sleep()
        const assessments = (await localforage.getItem('assessments')) || {}
        const arr = Object.keys(assessments).map(k=> ({ jobId: k, questions: assessments[k] }))
        return arr
      })

    }
  })
}

function sleep(){ return new Promise(r=> setTimeout(r, randDelay())) }
