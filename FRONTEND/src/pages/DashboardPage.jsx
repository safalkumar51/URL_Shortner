import React from 'react'
import UrlForm from '../components/UrlForm'
import UserUrl from '../components/UserUrl'

const DashboardPage = () => {
  return (
    <div className="min-h-screen page-bg py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-slate-100 rounded-xl shadow-lg overflow-hidden border border-slate-300">
          <div className="p-6 bg-gradient-to-r from-rose-800 via-rose-700 to-red-800 text-white">
            <h1 className="text-3xl font-bold">Your URL Dashboard</h1>
            <p className="mt-2 opacity-90">Create and manage your shortened URLs</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
            <div className="lg:col-span-1">
              <div className="bg-slate-200 p-6 rounded-lg shadow-sm border border-slate-300 h-full">
                <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center">
                  <svg className="h-5 w-5 mr-2 text-rose-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Create New URL
                </h2>
                <UrlForm/>
              </div>
            </div>
            
            <div className="lg:col-span-2">
              <div className="bg-slate-200 p-6 rounded-lg shadow-sm border border-slate-300 h-full">
                <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center">
                  <svg className="h-5 w-5 mr-2 text-rose-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                  </svg>
                  Your Links
                </h2>
                <UserUrl/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage