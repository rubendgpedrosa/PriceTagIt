import React from 'react';

const Alert = ({msg, created}) => {
    return (
    <div className="alert-toast fixed top-0 mx-8 my-24 w-5/6 md:w-full max-w-sm">
    <label className={(created === 1? 'bg-green-500 ':'bg-red-500 ')+' close cursor-pointer flex items-start justify-between w-full p-2 h-12 text-center items-center rounded shadow-lg text-white'} title="close">
        <div><p className="py-2 pl-4">{msg}</p></div>
        <svg className="w-8 h-8 pr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
    </label>
    </div>
    )
}

export default Alert;