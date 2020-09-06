import React, {useState} from 'react';

const LoginPanel = ( {login, errorAlert, forgotPassword, signUp} ) => {
    const [loginInformation, setLoginInformation] = useState({email: '', password: ''});

    return(
        <div>
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
                <div onClick={() => forgotPassword()} className="cursor-pointer float-right py-2 text-blue-500 hover:text-blue-700 active:text-blue-700">
                    Forgot Password?
                </div>
            </div>
            </div>
            <div className="text-gray-600 py-6 text-center">Don't have an account? <span className="cursor-pointer text-blue-500 active:text-blue-700 hover:text-blue-700" onClick={() => signUp()}>Sign up</span>.</div>
        </form>
        {errorAlert && <div>
        <div className="alert-toast fixed bottom-0 right-0 m-8 mb-16 w-5/6 md:w-full max-w-sm">
        <label className="close cursor-pointer flex items-start justify-between w-full p-2 bg-red-500 h-12 text-center items-center rounded shadow-lg text-white" title="close">
            <div><p className="py-2 pl-4">{loginInformation.email && loginInformation.password ? 'Incorrect Username and/or Password!':'Please enter Username and Password!'}</p></div>
            <svg className="w-8 h-8 pr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        </label>
        </div>
        </div>}
        </div>
    )
}

export default LoginPanel;