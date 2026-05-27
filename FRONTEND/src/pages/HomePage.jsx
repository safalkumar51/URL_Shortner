import React from 'react'
import UrlForm from '../components/UrlForm'

const HomePage = () => {
  return (
    <div className="min-h-screen page-bg flex flex-col items-center justify-center p-4">
      <div className="bg-slate-100 p-8 rounded-xl shadow-lg w-full max-w-md border border-slate-300 card-hover fade-in">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center p-2 bg-rose-200 rounded-full mb-4">
            <svg className="h-8 w-8 text-rose-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-center mb-2 text-slate-800">URL Shortener</h1>
          <p className="text-slate-600 mb-6">Transform long URLs into short, manageable links</p>
        </div>
        <UrlForm/>
      </div>
      
      <div className="mt-10 max-w-2xl text-center">
        <h2 className="text-xl font-semibold text-slate-700 mb-4">Why use our URL shortener?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-slate-100 rounded-lg shadow-sm border border-slate-300">
            <div className="text-rose-600 mb-2">
              <svg className="h-8 w-8 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-slate-800">Fast & Reliable</h3>
            <p className="text-sm text-slate-600">Create short links in seconds</p>
          </div>
          <div className="p-4 bg-slate-100 rounded-lg shadow-sm border border-slate-300">
            <div className="text-rose-600 mb-2">
              <svg className="h-8 w-8 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-slate-800">Track Clicks</h3>
            <p className="text-sm text-slate-600">Monitor your link performance</p>
          </div>
          <div className="p-4 bg-slate-100 rounded-lg shadow-sm border border-slate-300">
            <div className="text-rose-600 mb-2">
              <svg className="h-8 w-8 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>
            </div>
            <h3 className="text-lg font-medium text-slate-800">Custom URLs</h3>
            <p className="text-sm text-slate-600">Create memorable custom links</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage