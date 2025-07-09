import React from 'react'

const SearchBy = ({searchTerm, handleSearchChange}) => {
  return (
    <div className='flex justify-center p-3'>
        <div>
            <input value={searchTerm}
          onChange={handleSearchChange} 
          type="text" 
          placeholder='search with Depot/Company/Outlet/name' 
          className=' rounded-lg border-cyan-500 border-2 px-10 py-2' />
        </div>
    </div>
  )
}

export default SearchBy