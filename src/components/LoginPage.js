import React, {useState} from 'react';

const LoginPage = ({ login }) => {
    const [loginInformation, setLoginInformation] = useState({email: '', password: ''});

    return (
        <div className="h-full my-10 overflow-hidden flex items-center justify-center">
        <div className="absolute top-0 bg-blue-500 w-full py-20" style={{zIndex: -10}}></div>
        <div className="w-full mx-6 p-4 bg-transparent max-w-xl rounded">
            
        <div className="flex justify-center flex-col">
        <div className="flex justify-center flex-col text-center mx-auto p-2">
                <img className="shadow-xl mx-auto mb-6 rounded-full border-2" alt="" src="/logo.jpg" height="180" width="180"/>
                <p className="font-bold text-2xl text-gray-700 uppercase">Welcome to Price Tag It!</p>
                <p className="text-gray-600 text-xl">A simple and easy way to keep track of all your discounts.</p>
                </div>
            </div>
            <form className="mx-auto px1 w-full max-w-sm mb-12 pt-10">
            <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
                <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                Email
                </label>
            </div>
            <div className="md:w-2/3">
                <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" type="text" value={loginInformation.email} onChange={event => setLoginInformation({...loginInformation, email: event.target.value})}/>
            </div>
            </div>
            <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
                <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                Password
                </label>
            </div>
            <div className="md:w-2/3">
                <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" type="password" value={loginInformation.password} onChange={event => setLoginInformation({...loginInformation, password: event.target.value})}/>
            </div>
            </div>
            <div className="md:flex md:items-center">
            <div className="md:w-1/3"></div>
            <div className="md:w-2/3">
                <button onClick={() => login(loginInformation)} className="bg-blue-500 hover:bg-blue-400 focus:outline-none text-white font-bold py-2 px-4 rounded" type="button">
                Sign In
                </button>
                <div onClick={() => console.log('Forgot Password')} className=" float-right py-2 text-blue-500 hover:text-blue-700 active:text-blue-700">
                    Forgot Password?
                </div>
            </div>
            </div>
            <div className="text-gray-600 py-6 text-center">Don't have an account? <span className="text-blue-500 active:text-blue-700 hover:text-blue-700" onClick={() => console.log('newAccount')}>Sign up</span>.</div>
        </form>
        </div>
    </div>
    )
}

export default LoginPage;