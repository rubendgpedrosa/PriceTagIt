import React, {useState} from 'react';

const LoginPanel = ( {login, errorAlert, forgotPassword, signUp} ) => {
    //Login information to send to the server
    const [loginInformation, setLoginInformation] = useState({email: 'rubenpedrosa993@gmail.com', password: '1'});
    //This changes the password input type either to text or password.
    const [showPassword, setShowPassword] = useState(false);

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
                <input required className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" type="text" value={loginInformation.email} onChange={event => setLoginInformation({...loginInformation, email: event.target.value})}/>
            </div>
            </div>
            <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
                <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                Password
                </label>
            </div>
            <div className="md:w-2/3">
            <div className="relative w-full">
                <div className="absolute inset-y-0 right-0 flex items-center px-2">
                    <label className="bg-transparent rounded px-2 py-1 text-sm text-gray-600 cursor-pointer" onClick={() => setShowPassword(!showPassword)}>{showPassword?
                        <div>
                            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                        </div>:
                        <div>
                            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                            </svg>
                        </div>
                    }</label>
                    </div>
                    <input required className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" type={showPassword? 'text':'password'} autoComplete="off" value={loginInformation.password} onChange={event => setLoginInformation({...loginInformation, password: event.target.value})}  />
                </div>
            </div>
            </div>
            <div className="md:flex md:items-center">
            <div className="md:w-1/3"></div>
            <div className="md:w-2/3">
                <button onClick={() => login(loginInformation)} className="bg-blue-500 hover:bg-blue-400 focus:outline-none text-white font-bold py-2 px-4 rounded" type="button">
                Log In
                </button>
                <div onClick={() => forgotPassword()} className="cursor-pointer float-right py-2 text-blue-500 hover:text-blue-700 active:text-blue-700">
                    Forgot Password?
                </div>
            </div>
            </div>
            <div className="md:pl-24 text-gray-600 py-6 text-center">Don't have an account? <span className="cursor-pointer text-blue-500 active:text-blue-700 hover:text-blue-700" onClick={() => signUp()}>Sign up</span>.</div>
        </form>
        {errorAlert && <div>
        <div className="alert-toast fixed bottom-0 right-0 m-8 mb-16 w-5/6 md:w-full max-w-sm">
        <label className="close cursor-pointer flex items-start justify-between w-full p-2 bg-red-500 h-12 text-center items-center rounded shadow-lg text-white" title="close">
            <div><p className="py-2 pl-4">{loginInformation.email && loginInformation.password ? 'Incorrect Email and/or Password!':'Please enter Email and/or Password!'}</p></div>
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