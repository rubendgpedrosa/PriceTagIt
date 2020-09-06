import React, {useState} from 'react';
import LoginPanel from './LoginPanel';

const LandingPage = ({ login, errorAlert }) => {
    const [landingPagePanels, setLandingPagePanels] = useState('login');

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
            <LoginPanel login={login} errorAlert={errorAlert} forgotPassword={() => setLandingPagePanels('forgotPassword')} signUp={() => setLandingPagePanels('signUp')}/>
        </div>
    </div>
    )
}

export default LandingPage;