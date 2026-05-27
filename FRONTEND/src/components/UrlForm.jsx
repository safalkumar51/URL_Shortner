import React, { useState } from 'react'
import { createShortUrl } from '../api/shortUrl.api'
import { useSelector } from 'react-redux'
import { QueryClient } from '@tanstack/react-query'
import { queryClient } from '../main'

const UrlForm = () => {
  
  const [url, setUrl] = useState("https://www.google.com")
  const [shortUrl, setShortUrl] = useState()
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState(null)
  const [customSlug, setCustomSlug] = useState("")
  const [loading, setLoading] = useState(false)
  const {isAuthenticated} = useSelector((state) => state.auth)

  const handleSubmit = async () => {
    setLoading(true);
    try{
      const shortUrl = await createShortUrl(url,customSlug)
      console.log(shortUrl)
      setShortUrl(shortUrl)
      queryClient.invalidateQueries({queryKey: ['userUrls']})
      setError(null)
      setLoading(false);
    }catch(err){
      setError(err.message)
      setLoading(false);
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    
    // Reset the copied state after 2 seconds
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }

  if (!isAuthenticated) {
    return (
      <div className="p-5 bg-amber-100 border border-amber-300 rounded-lg text-center fade-in">
        <div className="flex items-center justify-center mb-2 text-amber-600">
          <svg className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="font-medium">Authentication Required</span>
        </div>
        <p className="text-amber-800">
          Please <span className="text-blue-600 font-medium underline cursor-pointer hover:text-blue-800" onClick={() => window.location.href = '/auth'}>login or register</span> to shorten URLs.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-5 fade-in">
        <div>
          <label htmlFor="url" className="block text-sm font-medium text-slate-700 mb-1">
            Enter your long URL
          </label>
          <div className="relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
              </svg>
            </div>
            <input
              type="url"
              id="url"
              value={url}
              onChange={(event)=>setUrl(event.target.value)}
              placeholder="https://example.com"
              required
              className="pl-10 block w-full rounded-md border-slate-400 bg-slate-50 text-slate-800 shadow-sm focus:border-rose-500 focus:ring-rose-500 py-2 px-4 border"
            />
          </div>
        </div>
        
        {isAuthenticated && (
          <div>
            <label htmlFor="customSlug" className="block text-sm font-medium text-slate-700 mb-1">
              Custom URL slug (optional)
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                </svg>
              </div>
              <input
                type="text"
                id="customSlug"
                value={customSlug}
                onChange={(event) => setCustomSlug(event.target.value)}
                placeholder="e.g. my-custom-url"
                className="pl-10 block w-full rounded-md border-slate-400 bg-slate-50 text-slate-800 shadow-sm focus:border-rose-500 focus:ring-rose-500 py-2 px-4 border"
              />
            </div>
            <p className="text-xs text-slate-500 mt-1">Leave empty for an auto-generated short URL</p>
          </div>
        )}
        
        <button
          onClick={handleSubmit}
          disabled={loading}
          className={`w-full bg-gradient-to-r from-rose-500 to-red-600 hover:from-rose-600 hover:to-red-700 text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 transition-all duration-200 flex items-center justify-center ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
        >
          {loading ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </>
          ) : (
            <>
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
              Shorten URL
            </>
          )}
        </button>
         
        {error && (
          <div className="p-4 bg-red-100 border-l-4 border-red-600 text-red-800 rounded-md">
            <div className="flex">
              <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <p>{error}</p>
            </div>
          </div>
        )}
        
        {shortUrl && (
          <div className="mt-6 fade-in">
            <h2 className="text-lg font-semibold mb-2 flex items-center text-green-600">
              <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Your shortened URL is ready:
            </h2>
            <div className="flex items-center">
              <input
                type="text"
                readOnly
                value={shortUrl}
                className="flex-1 p-2 border border-slate-400 rounded-l-md bg-slate-200 font-mono text-rose-700"
              />
              <button
                onClick={handleCopy}
                className={`px-4 py-2 rounded-r-md transition-colors duration-200 flex items-center ${
                  copied 
                    ? 'bg-green-500 text-white hover:bg-green-600' 
                    : 'bg-rose-500 text-white hover:bg-rose-600'
                }`}
              >
                {copied ? (
                  <>
                    <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Copied!
                  </>
                ) : (
                  <>
                    <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                    </svg>
                    Copy
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
  )
}

export default UrlForm