import React, {useEffect,useState} from 'react'
import axios from 'axios'
export default function Clinician(){
  const [patients,setPatients]=useState([])
  useEffect(()=>{
    const token = localStorage.getItem('token');
    axios.get('http://localhost:4000/api/rpm/patients',{headers:{Authorization:`Bearer ${token}`}}).then(r=>setPatients(r.data)).catch(()=>{})
  },[])
  return (
    <div className="card">
      <h2 className="text-xl font-semibold">Clinician Dashboard</h2>
      <div className="mt-4">
        <table className="w-full text-sm">
          <thead className="text-left text-gray-600"><tr><th>Patient</th><th>Actions</th></tr></thead>
          <tbody>
            {patients.map(p=> <tr key={p.id} className="border-t"><td>{p.name}</td><td><a className="text-sm text-brand-700" href={`http://localhost:4000/api/reports/export/patient/${p.id}`}>Export CSV</a></td></tr>)}
          </tbody>
        </table>
      </div>
    </div>
  )
}
