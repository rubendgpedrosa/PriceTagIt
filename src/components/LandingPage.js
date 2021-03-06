import React, {useState} from 'react';
import PanelLogin from './PanelLogin';
import PanelForgotPassword from './PanelForgotPassword';
import PanelSignUp from './PanelSignUp';

const LandingPage = ({ login, errorAlert }) => {
    //Determines which components to show currently.
    const [landingPagePanels, setLandingPagePanels] = useState('login');

    const renderSwitch =() => {
        //Simple switch case that checks which value string is stored and shows the according component.
        switch(landingPagePanels) {
            case 'forgotPassword':
            return <PanelForgotPassword landingPagePanels={() => setLandingPagePanels('login')}/>;
            case 'signUp':
            return <PanelSignUp login={login} landingPagePanels={() => setLandingPagePanels('login')}/>;
            default: return <PanelLogin login={login} errorAlert={errorAlert} forgotPassword={() => setLandingPagePanels('forgotPassword')} signUp={() => setLandingPagePanels('signUp')}/>;
        }
      }

    return (
        <div className="h-full my-10 overflow-hidden flex items-center justify-center">
        <div className="absolute top-0 bg-blue-500 w-full py-20" style={{zIndex: -10}}></div>
        <div className="w-full mx-6 p-4 bg-transparent max-w-xl rounded">
            
        <div className="flex justify-center flex-col">
        <div className="flex justify-center flex-col text-center mx-auto p-2">
                <img className="shadow-xl mx-auto mb-6 bg-gray-100 rounded-full border-2" alt="" src="/logo_clear.png" height="200" width="200"/>
                <p className="font-bold text-2xl text-blue-500 uppercase">Welcome to Price Tag It!</p>
                <p className="text-gray-600 text-xl">A simple and easy way to <span className="text-blue-400">keep track</span> of all your <span className="text-blue-400">discounts</span>.</p>
                </div>
            </div>
             {renderSwitch()}
        </div>
        <footer className='w-full text-center fixed bottom-0 text-gray-100 bg-blue-500 p-3'>
      <span className=" font-bold">Price Tag It &copy; | Icons by - </span><span>monkik & freepik</span>
    </footer>
    </div>
    )
}

export default LandingPage;