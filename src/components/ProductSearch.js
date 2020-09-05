import React, { useState } from 'react';

const ProductSearch = ({ searchText }) => {
  const [text, setText] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    searchText(text);
  }

  return (
    <div className='max-w-sm pt-16 rounded overflow-hidden my-10 mx-auto'>
      <form onSubmit={onSubmit} className="w-full max-w-sm">
        <div className="flex items-center border-b border-b-2 border-blue-500 mx-3 py-2">
        <input onChange={e => setText(e.target.value)} className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
        type="text" placeholder="Insert Product Info..." />
        {text.length > 0?
        <button className="flex-shrink-0 bg-transparent hover:text-red-500 text-sm text-gray-700 py-1 px-2 rounded-full" type="submit">
        <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
        </button>:''}
        <button className="flex-shrink-0 bg-blue-500 hover:bg-blue-700 border-blue-500 hover:border-blue-700 text-sm border-2 text-white py-1 px-2 rounded" type="submit">
        Search
        </button>
      </div>
      </form>
		</div>
  )
}

export default ProductSearch;
