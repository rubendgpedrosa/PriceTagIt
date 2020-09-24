import React from 'react';
import ProductSearch from './ProductSearch';

const NavBar = ({ logoffHandler, product, selectedCategory, searchText, addNew, changeWindow, categories, editItem }) => {
  return (
    <div>
        <nav className="flex items-center mt-0 fixed w-full z-10 top-0 justify-between flex-wrap bg-blue-500 p-3 shadow">
        <div className="flex w-full text-center items-center">
          <div className="w-1/6">
          <button onClick={changeWindow} className="focus:outline-none bg-blue-500 text-blue-100 font-bold py-2 px-2 rounded inline-flex items-center">
          {(!addNew && !editItem) ?<svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>:
          <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>}
          </button>
          </div>
          <div className="w-2/3 text-gray-100">
            <span className="font-semibold text-2xl tracking-tight">PRICE TAG IT</span>
          </div>
          <div className="w-1/6">
          <button onClick={logoffHandler} className="pr-0 pl-0 focus:outline-none bg-blue-500 text-blue-100 font-bold py-2 px-4 rounded-full inline-flex items-center">
          <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
          </svg></button>
          </div>
        </div>
        </nav>
        { !addNew && !editItem && <ProductSearch categories={categories.sort()} searchText={(text) => searchText(text)} selectedCategory={(category) => selectedCategory(category)}/>}
    </div>
  )
}

export default NavBar;

/*
<div className="">
        </div>
        <div>
        </div>
        </div>
        
        <div></div>
*/