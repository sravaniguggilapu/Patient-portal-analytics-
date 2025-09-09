import React from 'react'
export default function Settings(){
  return (
    <div className="card">
      <h2 className="text-xl font-semibold">Settings</h2>
      <div className="mt-4 space-y-3 text-sm text-gray-700">
        <div>Profile: <strong>Demo Patient</strong></div>
        <div>Connected devices: 3</div>
        <div>Privacy: 2FA mock enabled</div>
      </div>
    </div>
  )
}
