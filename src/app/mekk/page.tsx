import React from 'react';
import Link from 'next/link';
export default function TellerInfo() {
  return (


    <div className="flex flex-col h-screen bg-gray-100">
      
      {/* Header */}
      <header className="flex items-center justify-between p-4 bg-indigo-900 text-white">
        <div className="flex items-center">
          {/* Back arrow icon */}
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </div>
        <h1 className="text-xl font-semibold">HoroWhisper</h1>
        <div className="flex items-center">
          {/* User icon */}
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Teller Profile */}
        <div className="bg-white p-4 rounded-lg m-4 shadow-sm">
          <div className="flex">
            <div className="w-24 h-24 mr-4">
              <img 
                src="/api/placeholder/100/100" 
                alt="Golf the Teller" 
                className="w-full h-full object-cover rounded-lg"
              />
              <div className="mt-1 bg-purple-500 rounded-lg text-white text-center py-1">
                <span className="font-bold">4.8</span>
              </div>
              <button className="mt-2 w-full bg-gray-200 rounded-full text-center py-1 text-sm">
                Packages
              </button>
            </div>
            <div className="flex-1">
              <div className="flex justify-between">
                <h2 className="text-lg font-bold">Golf the teller</h2>
                <span className="text-gray-500 text-sm">Report</span>
              </div>
              <div className="flex space-x-2 mt-2">
                <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">Tarot Reading</span>
                <span className="bg-pink-100 text-pink-800 px-2 py-1 rounded-full text-xs">Love and relationship</span>
              </div>
              <div className="flex items-center mt-2">
                <div className="flex items-center">
                  {/* User icon */}
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                  <span className="ml-1 text-sm">28 Reviews</span>
                </div>
                <div className="flex items-center ml-4">
                  {/* Clock icon */}
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                  <span className="ml-1 text-sm">Expected wait time - 3 minutes</span>
                </div>
              </div>
              <div className="mt-4">
                <div className="text-sm text-gray-700">
                  "I have been practicing tarot for over 20 years and graduated from a well-known institution specializing in spiritual and intuitive arts. My passion lies in helping people find clarity in love and relationships"
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex flex-col space-y-2">
              <div className="flex items-center">
                <span className="w-8 font-bold text-sm">₹ 200</span>
                <span className="mx-2 text-gray-500">/</span>
                <span className="text-sm">3 questions</span>
              </div>
              <div className="flex items-center">
                <span className="w-8 font-bold text-sm">₹ 300</span>
                <span className="mx-2 text-gray-500">/</span>
                <span className="text-sm">5 questions</span>
              </div>
              <div className="flex items-center">
                <span className="w-8 font-bold text-sm">₹ 500</span>
                <span className="mx-2 text-gray-500">/</span>
                <span className="text-sm">10 questions</span>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="bg-indigo-600 text-white p-4">
          <h3 className="font-semibold">Reviews</h3>
        </div>

        {/* Review Items */}
        <div className="bg-white">
          {/* Review 1 */}
          <div className="p-4 border-b">
            <div className="flex items-start">
              <div className="w-8 h-8 bg-gray-300 rounded-full mr-3 flex items-center justify-center">
                {/* User icon */}
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>
              <div className="flex-1">
                <div className="flex justify-between">
                  <h4 className="font-semibold">Chalisa P***</h4>
                  <span className="text-xs text-gray-500">19/03/2025</span>
                </div>
                <div className="flex items-center my-1">
                  {/* 4 filled stars */}
                  {[1, 2, 3, 4].map((i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="#FFD700" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-400">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                    </svg>
                  ))}
                  {/* 1 empty star */}
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-300">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                  </svg>
                </div>
                <h5 className="text-sm font-medium">Life-Changing Reading!</h5>
                <p className="text-sm text-gray-600 mt-1">
                  Golf the Teller gave me so much clarity about my relationship
                </p>
              </div>
            </div>
          </div>

          {/* Review 2 */}
          <div className="p-4 border-b">
            <div className="flex items-start">
              <div className="w-8 h-8 bg-gray-300 rounded-full mr-3 flex items-center justify-center">
                {/* User icon */}
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>
              <div className="flex-1">
                <div className="flex justify-between">
                  <h4 className="font-semibold">Saharat N***</h4>
                  <span className="text-xs text-gray-500">16/03/2025</span>
                </div>
                <div className="flex items-center my-1">
                  {/* 5 filled stars */}
                  {[1, 2, 3, 4, 5].map((i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="#FFD700" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-400">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                    </svg>
                  ))}
                </div>
                <h5 className="text-sm font-medium">A Guiding Light in My Love Life</h5>
                <p className="text-sm text-gray-600 mt-1">
                  I felt lost after a breakup, but Golf's reading helped me understand what I needed to heal and move forward.
                </p>
              </div>
            </div>
          </div>


          {/* Review 3 - Duplicated as in the image */}
          <div className="p-4 border-b">
            <div className="flex items-start">
              <div className="w-8 h-8 bg-gray-300 rounded-full mr-3 flex items-center justify-center">
                {/* User icon */}
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>
              <div className="flex-1">
                <div className="flex justify-between">
                  <h4 className="font-semibold">Chalisa P***</h4>
                  <span className="text-xs text-gray-500">13/03/2025</span>
                </div>
                <div className="flex items-center my-1">
                  {/* 4 filled stars */}
                  {[1, 2, 3, 4].map((i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="#FFD700" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-400">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                    </svg>
                  ))}
                  {/* 1 empty star */}
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-300">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                  </svg>
                </div>
                <h5 className="text-sm font-medium">Life-Changing Reading!</h5>
                <p className="text-sm text-gray-600 mt-1">
                  Golf the Teller gave me so much clarity about my relationship
                </p>
              </div>
            </div>
          </div>

          {/* Review 4 */}
          <div className="p-4 border-b">
            <div className="flex items-start">
              <div className="w-8 h-8 bg-gray-300 rounded-full mr-3 flex items-center justify-center">
                {/* User icon */}
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>
              <div className="flex-1">
                <div className="flex justify-between">
                  <h4 className="font-semibold">Chalisa P***</h4>
                  <span className="text-xs text-gray-500">02/03/2025</span>
                </div>
                <div className="flex items-center my-1">
                  {/* 4 filled stars */}
                  {[1, 2, 3, 4].map((i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="#FFD700" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-400">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                    </svg>
                  ))}
                  {/* 1 empty star */}
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-300">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                  </svg>
                </div>
                <h5 className="text-sm font-medium">Life-Changing Reading!</h5>
                <p className="text-sm text-gray-600 mt-1">
                  Golf the Teller gave me so much clarity about my relationship
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Button */}
      <div className="p-4 bg-white border-t">
        <button className="w-full bg-indigo-900 text-white font-semibold py-3 rounded-full">
          Book
        </button>
      </div>
    </div>





  );
}
