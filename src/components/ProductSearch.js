import React, { useState } from 'react';

const ProductSearch = ({ searchText, categories, selectedCategory }) => {
  //Search string sent to parent component.
  const [selected, setSelected] = useState('');
  const [empty, setEmpty] = useState(true);

  //Function used to clear the search text after clicking on the clear button.
  const clearSubmition = () => {
    document.getElementById('search').value= null;
    searchText('');
    setEmpty(true);
  }
  /*
  {!empty?
        <button onClick={clearSubmition} className="absolute right-0 bg-transparent hover:text-red-500 text-sm text-gray-700 pt-1 px-2 rounded-full focus:outline-none" type="submit">
        <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
        </svg>
        </button>:<svg className="h-5 w-5 mr-2 mt-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        }
  */

  return (
    <div className='max-w-sm pt-10 mt-10 mb-4 mx-auto'>
        <div className="grid grid-flow-col grid-rows-1 grid-cols-2 flex items-center border-b border-b-2 border-blue-200 mx-2 pb-4">
        <div className="relative inline-block mr-1">
        <select className="z-10 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500 cursor-pointer" value={selected} onChange={event => {selectedCategory(event.target.value); setSelected(event.target.value)}}>
          <option className="text-gray-200" value="">All Categories</option>
          {categories.map((category, index) => <option key={index} value={category.name}>{category.name}</option>)}
        </select>
        <span className="absolute h-full right-0 bg-blue-500 hover:text-gray-100 text-sm text-gray-100 pt-2 px-2  rounded focus:outline-none"><svg className="right-0 h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg></span>
        </div>
        <div className="relative inline-block ml-1">
          <input id="search" className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" type="text" placeholder="Search" maxLength="18" onChange={e => {searchText(e.target.value); setEmpty(false)}}/>
          {!empty?
        <button onClick={clearSubmition} className="absolute right-0 bg-blue-500 h-full hover:text-gray-100 text-sm text-gray-100 px-2 rounded focus:outline-none" type="submit">
        <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
        </svg>
        </button>:<button disabled className="focus:outline-none bg-blue-500 h-full rounded text-gray-100 absolute right-0"><svg className="h-6 w-6 mx-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg></button>
        }
        </div>
      </div>
		</div>
  )
}

export default ProductSearch;
