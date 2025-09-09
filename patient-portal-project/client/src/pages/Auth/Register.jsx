import React,{useState} from 'react'
import axios from 'axios'
export default function Register(){
  const [name,setName]=useState(''); const [email,setEmail]=useState(''); const [password,setPassword]=useState(''); const [msg,setMsg]=useState('')
  async function submit(e){
    e.preventDefault();
    try{await axios.post('http://localhost:4000/api/auth/register',{name,email,password}); setMsg('Registered. Login now.')}catch(e){setMsg('Error')}
  }
  return (
    <div className="card max-w-md mx-auto">
      <h2 className="text-xl font-semibold">Register</h2>
      <form onSubmit={submit} className="mt-4 space-y-3">
        <input placeholder="Name" value={name} onChange={e=>setName(e.target.value)} className="w-full p-2 border rounded" />
        <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} className="w-full p-2 border rounded" />
        <input placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} type="password" className="w-full p-2 border rounded" />
        <button className="w-full py-2 rounded bg-gradient-to-r from-brand-500 to-brand-700 text-white">Register</button>
        <div className="text-sm text-gray-600">{msg}</div>
      </form>
    </div>
  )
}
