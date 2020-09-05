import React from 'react';

const ProductAlert = ({created}) => {
    return (
    <div className="alert-toast fixed bottom-0 right-0 m-8 w-5/6 md:w-full max-w-sm">
    <label className="close cursor-pointer flex items-start justify-between w-full p-2 bg-green-500 h-12 text-center items-center rounded shadow-lg text-white" title="close">
        <div><p className="py-2 pl-4">{created ? 'New product created sucessfully!' : 'Product deleted sucessfully!'}</p></div>
        <svg className="w-8 h-8 pr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
    </label>
    </div>
    )
}

export default ProductAlert;