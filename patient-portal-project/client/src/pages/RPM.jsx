import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

function timeseries(metric){
  const token = localStorage.getItem('token');
  return axios.get(`http://localhost:4000/api/rpm/timeseries/${metric}`, {headers:{Authorization:`Bearer ${token}`}});
}

export default function RPM(){
  const [hr,setHr]=useState([])
  useEffect(()=>{
    timeseries('heart_rate').then(r=>{
      setHr(r.data.map(d=>({ts:new Date(d.ts).toLocaleDateString(), value:d.value})))
    }).catch(()=>{});
  },[])
  return (
    <div className="card">
      <h2 className="text-xl font-semibold">Remote Patient Monitoring</h2>
      <div className="mt-4" style={{height:260}}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={hr}>
            <XAxis dataKey="ts" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="#4b6bff" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
