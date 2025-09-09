import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import RPM from './pages/RPM'
import Engagement from './pages/Engagement'
import Clinician from './pages/Clinician'
import Settings from './pages/Settings'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'

const Nav = () => (
  <nav className="w-full bg-gradient-to-r from-brand-500 to-brand-700 text-white p-4 rounded-b-2xl">
    <div className="max-w-6xl mx-auto flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-white text-brand-700 flex items-center justify-center font-bold">PP</div>
        <div className="font-semibold">Patient Portal</div>
      </div>
      <div className="flex gap-3">
        <Link to="/">Home</Link>
        <Link to="/rpm">RPM</Link>
        <Link to="/engagement">Engagement</Link>
        <Link to="/clinician">Clinician</Link>
        <Link to="/settings">Settings</Link>
        <Link to="/login" className="ml-2">Login</Link>
      </div>
    </div>
  </nav>
)

export default function App(){
  return (
    <div className="min-h-screen flex flex-col">
      <Nav />
      <main className="max-w-6xl mx-auto w-full p-6 mt-6">
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/rpm" element={<RPM/>} />
          <Route path="/engagement" element={<Engagement/>} />
          <Route path="/clinician" element={<Clinician/>} />
          <Route path="/settings" element={<Settings/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
        </Routes>
      </main>
    </div>
  )
}
