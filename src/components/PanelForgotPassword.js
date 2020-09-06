import React, {useState} from 'react';

const PanelForgotPassword = ({landingPagePanels}) => {
    const [email, setEmail] = useState('');

    return (
        <div>
        <form className="mx-auto px1 w-full max-w-sm mb-12 pt-6">
            <div className="md:flex md:items-center mb-6">

            <div className="md:w-1/3">
                <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                Email
                </label>
            </div>
            <div className="md:w-2/3">
                <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" type="text" value={email} onChange={event => setEmail(event.target.value)}/>
            </div>
            </div>
            <div className="md:flex md:items-center">
            <div className="md:w-1/3"></div>
            <div className="md:w-2/3">
                <button className="bg-blue-500 hover:bg-blue-400 focus:outline-none text-white font-bold py-2 px-4 rounded" type="button">
                Send
                </button>
                <div className="text-gray-600 py-2 text-center float-right">Have an <span className="cursor-pointer text-blue-500 active:text-blue-700 hover:text-blue-700" onClick={() => landingPagePanels()}>Account</span>?</div>
            </div>
            </div>
        </form>
        </div>
    )
}

export default PanelForgotPassword;