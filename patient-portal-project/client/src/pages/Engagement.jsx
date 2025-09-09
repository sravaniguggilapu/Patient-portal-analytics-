import React from 'react'
export default function Engagement(){
  return (
    <div className="card">
      <h2 className="text-xl font-semibold">Engagement & Motivation</h2>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 border rounded-lg"><div className="font-semibold">Streaks</div><div className="text-3xl mt-2">12 🔥</div></div>
        <div className="p-4 border rounded-lg"><div className="font-semibold">Points</div><div className="text-3xl mt-2">420 ⭐</div></div>
        <div className="p-4 border rounded-lg"><div className="font-semibold">Community</div><div className="text-3xl mt-2">34</div></div>
      </div>
    </div>
  )
}
