import React from 'react';
import ProductSearch from './ProductSearch';

const ProductCard = ({ product, searchText, addNew, changeWindow }) => {
  return (
    <div>
        <nav className="flex items-center mt-0 fixed w-full z-10 top-0 justify-between flex-wrap bg-blue-500 p-4 shadow">
        <div className="flex items-center flex-shrink-0 text-blue-100 mr-6">
        <svg className="h-8 w-8 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
        <path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
        </svg>
        <span className="font-semibold text-xl tracking-tight">Price Tag IT</span>
        </div>
        <button onClick={changeWindow} className="focus:outline-none bg-blue-500 text-blue-100 font-bold py-2 px-4 rounded-full inline-flex items-center">
        {!addNew?<svg className="fill-current w-4 h-4 mr-2 ml-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /> </svg>:
        <svg className="fill-current w-4 h-4 mr-2 ml-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /> </svg>}
        <span>{addNew ? 'Products':'Add New'}</span>
        </button>

        </nav>
        { !addNew && <ProductSearch searchText={(text) => searchText(text)} />}
    </div>
  )
}

export default ProductCard;
