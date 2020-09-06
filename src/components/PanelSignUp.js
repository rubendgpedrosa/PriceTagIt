import React, {useState} from 'react';

const PanelSignUp = ({landingPagePanels}) => {
    const [newAccount, setNewAccount] = useState({email: '', password: ''});
    const [error, setError] = useState(false);

    const signUp = async (loginInformation) => {
        //console.log(loginInformation);
        fetch('/api/auth/register', {
            method: 'post',
            body: JSON.stringify({
                loginInformation: newAccount
            }),
            headers: {"Content-Type": "application/json"}
          }).then(res => res.json())
          .then((result) => {
            console.log(result);
          }).catch((response) => {
            setError(true);
            setTimeout(function(){
                setError(false);
            },2000);
          })
      }

    return (
        <div>
        <form className="mx-auto px1 w-full max-w-sm mb-12 pt-10">
            <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
                <label className="block text-gray-500 font-bold md:text-right mb-1 pr-4 md:mb-0">
                Email
                </label>
            </div>
            <div className="md:w-2/3">
                <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" type="text" value={newAccount.email} onChange={event => setNewAccount({...newAccount, email: event.target.value})}/>
            </div>
            </div>
            <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
                <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                Password
                </label>
            </div>
            <div className="md:w-2/3">
                <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" type="password" value={newAccount.password} onChange={event => setNewAccount({...newAccount, password: event.target.value})}/>
            </div>
            </div>
            <div className="md:flex md:items-center">
            <div className="md:w-1/3"></div>
            <div className="md:w-2/3 mx-auto">
                <button onClick={() => signUp()} className="bg-blue-500 hover:bg-blue-400 focus:outline-none text-white font-bold py-2 px-4 rounded" type="button">
                Sign Up
                </button>
                <div className="text-gray-600 py-2 text-center float-right">Have an <span className="cursor-pointer text-blue-500 active:text-blue-700 hover:text-blue-700" onClick={() => landingPagePanels()}>Account</span>?</div>
            </div>
            </div>
            <div className="md:w-1/3"></div>
            <div className="md:w2-3 text-gray-600 text-center py-6">By clicking Sign Up you're agreeing to have your data stored on our database.</div>
        </form>
        {error && <div className="alert-toast fixed bottom-0 right-0 m-8 w-5/6 md:w-full max-w-sm">
        <label className="close cursor-pointer flex items-start justify-between w-full p-2 bg-red-500 h-12 text-center items-center rounded shadow-lg text-white mb-6" title="close">
            <div><p className="py-2 pl-4">Account already exists!</p></div>
            <svg className="w-8 h-8 pr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        </label>
        </div>}
        </div>
    )
}

export default PanelSignUp;