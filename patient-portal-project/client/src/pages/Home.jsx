import React from 'react'
export default function Home(){
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <section className="lg:col-span-2">
        <div className="card">
          <h2 className="text-xl font-semibold">Welcome 👋</h2>
          <p className="text-sm text-gray-600">This prototype includes authentication, mock RPM data, clinician reports and exports.</p>
        </div>
        <div className="card mt-6">
          <h3 className="font-semibold">How to use</h3>
          <ol className="mt-2 text-sm list-decimal list-inside text-gray-700">
            <li>Login with demo@patient.test / demo123 (patient)</li>
            <li>Or clinician@health.test / clinician123 (clinician)</li>
            <li>Go to RPM to see timeseries</li>
          </ol>
        </div>
      </section>
      <aside>
        <div className="card">
          <h4 className="font-semibold">Quick Links</h4>
          <div className="mt-3 text-sm"><a href="/login" className="text-brand-700">Login</a></div>
        </div>
      </aside>
    </div>
  )
}
