import React from 'react';

const LoginPage = ({ login }) => {
    return (
    <div className="shadow-xl p-10 bg-white max-w-xl rounded">
        <h1 className="text-4xl font-black mb-4">Login</h1>
        <div className="flex justify-center flex-col">
            <form className="mx-auto px-2 w-full max-w-sm">
            <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
                <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                Full Name
                </label>
            </div>
            <div className="md:w-2/3">
                <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" id="inline-full-name" type="text"/>
            </div>
            </div>
            <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
                <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                Password
                </label>
            </div>
            <div className="md:w-2/3">
                <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" id="inline-password" type="password"/>
            </div>
            </div>
            <div className="md:flex md:items-center">
            <div className="md:w-1/3"></div>
            <div className="md:w-2/3">
                <button onClick={() => login()} className="shadow bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="button">
                Sign Up
                </button>
            </div>
            </div>
        </form>
        </div>
    </div>
    )
}

export default LoginPage;