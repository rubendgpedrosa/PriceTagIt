import React, { useState } from 'react';

const ProductSearch = ({ searchText }) => {
  const [text, setText] = useState('');

  const clearSubmition = () => {
    document.getElementById('search').value= null;
    setText('');
    searchText('');
  }

  return (
    <div className='max-w-sm pt-12 rounded overflow-hidden my-10 mx-auto'>
        <div className="flex items-center border-b border-b-2 border-blue-500 mx-3 py-2">
        <input id="search" onChange={e => {searchText(e.target.value); setText(e.target.value)}} className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
        type="text" placeholder="Insert Product Info..." />
        {text.length > 0?
        <button onClick={clearSubmition} className="flex-shrink-0 bg-transparent hover:text-red-500 text-sm text-gray-700 pt-1 px-2 rounded-full" type="submit">
        <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
      </svg>
        </button>:''}
      </div>
		</div>
  )
}

export default ProductSearch;
