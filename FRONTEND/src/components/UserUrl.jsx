import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getAllUserUrls } from '../api/user.api'

const UserUrl = () => {
  const baseUrl = import.meta.env.VITE_API_URL?.replace(/\/$/, '') || window.location.origin
  const { data: urls, isLoading, isError, error } = useQuery({
    queryKey: ['userUrls'],
    queryFn: getAllUserUrls,
    refetchInterval: 30000, // Refetch every 30 seconds to update click counts
    staleTime: 0, // Consider data stale immediately so it refetches when invalidated
  })
  const [copiedId, setCopiedId] = useState(null)
  const handleCopy = (url, id) => {
    navigator.clipboard.writeText(url)
    setCopiedId(id)
    setTimeout(() => {
      setCopiedId(null)
    }, 2000)
  }

  if (isLoading) {
    return (
      <div className="flex justify-center my-8 fade-in">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-rose-500"></div>
          <p className="text-slate-500 mt-3">Loading your URLs...</p>
        </div>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="bg-red-100 border-l-4 border-red-600 text-red-800 p-4 rounded-md my-4 fade-in">
        <div className="flex">
          <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <p>Error loading your URLs: {error.message}</p>
        </div>
      </div>
    )
  }

  if (!urls.urls || urls.urls.length === 0) {
    return (
      <div className="text-center text-slate-500 my-6 p-6 bg-slate-200 rounded-lg border border-slate-300 fade-in">
        <svg className="w-16 h-16 mx-auto text-slate-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
        </svg>
        <p className="text-xl font-medium text-slate-700">No URLs found</p>
        <p className="mt-2 text-slate-500">You haven't created any shortened URLs yet.</p>
        <p className="mt-4">
          <a href="#" className="text-rose-600 hover:text-rose-800 inline-flex items-center">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
            Create your first short URL
          </a>
        </p>
      </div>
    )
  }

  return (
    <div className="bg-slate-100 rounded-lg mt-5 shadow-sm border border-slate-300 overflow-hidden fade-in">
      <div className="border-b border-slate-300 bg-slate-200 px-6 py-3 flex items-center">
        <svg className="h-5 w-5 text-slate-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
        </svg>
        <h3 className="text-sm font-medium text-slate-600 uppercase tracking-wider">Your Recent Links</h3>
        <span className="ml-2 bg-rose-200 text-rose-950 text-xs font-semibold px-2.5 py-0.5 rounded-full">
          {urls.urls.length}
        </span>
      </div>
      
      <div className="overflow-x-auto max-h-96">
        <table className="min-w-full divide-y divide-slate-300">
          <thead className="bg-slate-200">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                Original URL
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                Short URL
              </th>
              <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-slate-600 uppercase tracking-wider">
                Clicks
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-slate-100 divide-y divide-slate-300">
            {urls.urls.reverse().map((url) => (
              <tr key={url._id} className="hover:bg-slate-200 transition-colors duration-150">
                <td className="px-6 py-4">
                  <div className="text-sm text-slate-800 truncate max-w-xs">
                    {url.full_url}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm">
                   <a 
                     href={`${baseUrl}/${url.short_url}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 hover:underline font-medium">
                     {`${baseUrl}/${url.short_url}`}
                   </a>
                  </div>
                </td>
                <td className="px-6 py-4 text-center align-middle">
                  <div className="h-full flex items-center justify-center text-sm text-slate-800">
                    <span className="px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-rose-200 text-rose-950">
                      {url.clicks} {url.clicks === 1 ? 'click' : 'clicks'}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm font-medium">
                  <button
                   onClick={() => handleCopy(`${baseUrl}/${url.short_url}`, url._id)}
                    className={`inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm transition-all duration-200 ${
                      copiedId === url._id
                        ? 'bg-green-500 text-white hover:bg-green-600'
                        : 'bg-rose-500 text-white hover:bg-rose-600'
                    } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500`}
                  >
                    {copiedId === url._id ? (
                      <>
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        Copied!
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path>
                        </svg>
                        Copy URL
                      </>
                    )}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default UserUrl