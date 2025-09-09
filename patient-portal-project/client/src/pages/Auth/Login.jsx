import React, {useState} from 'react'
import axios from 'axios'

export default function Login(){
  const [email,setEmail]=useState('demo@patient.test')
  const [password,setPassword]=useState('demo123')
  const [msg,setMsg]=useState('')
  async function submit(e){
    e.preventDefault();
    try{
      const r = await axios.post('http://localhost:4000/api/auth/login',{email,password});
      localStorage.setItem('token', r.data.token)
      localStorage.setItem('user', JSON.stringify(r.data.user))
      setMsg('Login successful - stored token')
    }catch(err){setMsg('Login failed')}
  }
  return (
    <div className="card max-w-md mx-auto">
      <h2 className="text-xl font-semibold">Login</h2>
      <form onSubmit={submit} className="mt-4 space-y-3">
        <input value={email} onChange={e=>setEmail(e.target.value)} className="w-full p-2 border rounded" />
        <input value={password} onChange={e=>setPassword(e.target.value)} type="password" className="w-full p-2 border rounded" />
        <button className="w-full py-2 rounded bg-gradient-to-r from-brand-500 to-brand-700 text-white">Login</button>
        <div className="text-sm text-gray-600">{msg}</div>
      </form>
    </div>
  )
}
