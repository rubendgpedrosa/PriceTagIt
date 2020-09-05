import React from 'react';
import Background from '../background.png';

const LoginPage = ({ login }) => {
    return (
        <div className="" style={{backgroundImage: `url(${Background})`}}>
        <div className="h-screen overflow-hidden flex items-center justify-center">
        <div className="w-full mx-6 p-4 bg-transparent max-w-xl rounded">
        <div className="flex justify-center flex-col">
        <div className="flex justify-center flex-col text-center mx-auto p-2 mb-12">
                <img className="shadow-xl mx-auto mb-6 rounded-full border-2" alt="" src="/logo.jpg" height="180" width="180"/>
                <p className="font-bold text-2xl text-gray-700 uppercase">Welcome to Price Tag It!</p>
                <p className="text-gray-600 text-xl">A simple and easy way to keep track of all your discounts.</p>
                </div>
            </div>
            <form className="mx-auto px1 w-full max-w-sm mb-12">
            <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
                <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                Email
                </label>
            </div>
            <div className="md:w-2/3">
                <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" type="text"/>
            </div>
            </div>
            <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
                <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                Password
                </label>
            </div>
            <div className="md:w-2/3">
                <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" type="password"/>
            </div>
            </div>
            <div className="md:flex md:items-center">
            <div className="md:w-1/3"></div>
            <div className="md:w-2/3">
                <button onClick={() => login()} className="bg-blue-500 hover:bg-blue-400 focus:outline-none text-white font-bold py-2 px-4 rounded" type="button">
                Sign Up
                </button>
            </div>
            </div>
        </form>
        </div>
    </div>
    </div>
    )
}

export default LoginPage;