import React from 'react'

const Footer = () => {
  return (
    <div>
        <footer className="bg-gray-800 text-white w-full  mt-10">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Brand/Logo */}
          <div>
            <h2 className="text-xl font-bold mb-2">Alina Trading</h2>
            <p className="text-sm text-gray-400">
              Alina Trading. © {new Date().getFullYear()}
            </p>
          </div>
        </div>

        {/* Bottom line */}
        <div className="mt-8 border-t border-gray-700 pt-4 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} Team Alina. All rights reserved.
        </div>
      </div>
    </footer>
    </div>
  )
}

export default Footer