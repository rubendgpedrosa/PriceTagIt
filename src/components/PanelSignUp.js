import React, {useState} from 'react';

const PanelSignUp = ({landingPagePanels}) => {
    const [newAccount, setNewAccount] = useState({email: '', password: ''});
    const [error, setError] = useState(false);
    //Used to set the alert message.
    const [msg, setMsg] = useState();
    const [success, setSuccess] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const signUp = async (loginInformation) => {
        //If the object being sent is not empty, we can send it!
        if(newAccount.password && newAccount.email){
        fetch('/api/auth/register', {
            method: 'post',
            body: JSON.stringify({
                loginInformation: newAccount
            }),
            headers: {"Content-Type": "application/json"}
          }).then(res => res.json())
          .then((result) => {
                setMsg('Account created sucessfully!');
                setSuccess(true);
          }).catch((response) => {
                setMsg('Account already exists!');
                setError(true);
                setTimeout(function(){
                    setError(false);
                },2000);
          })}else{
            setMsg('Please enter Email and/or Password!');
            setError(true);
            setTimeout(function(){
                setError(false);
            },2000);
          }
      }

    return (
        <div>
        {success ? <div className="text-center pt-10">
            <p className="text-green-500 font-bold">{msg}</p>
            <p className="text-gray-700">Back to <span onClick={landingPagePanels} className="cursor-pointer text-blue-500 underline">login page</span>.</p>
        </div>
        :<form className="mx-auto px1 w-full max-w-sm mb-12 pt-10">
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
                    <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" type={showPassword? 'text':'password'} autoComplete="off" value={newAccount.password} onChange={event => setNewAccount({...newAccount, password: event.target.value})}  />
                </div>
            </div>
            </div>
            <div className="md:flex md:items-center">
            <div className="md:w-1/3"></div>
            <div className="md:w-2/3 mx-auto">
                <button onClick={() => signUp()} className="bg-blue-500 hover:bg-blue-400 focus:outline-none text-white font-bold py-2 px-4 rounded" type="button">
                Register
                </button>
                <div className="text-gray-600 py-2 text-center float-right">Have an <span className="cursor-pointer text-blue-500 active:text-blue-700 hover:text-blue-700" onClick={() => landingPagePanels()}>Account</span>?</div>
            </div>
            </div>
            <div className="md:w-1/3"></div>
            <div className="md:w2-3 text-gray-600 text-center py-6">By <span className="font-bold text-blue-500">creating an account</span> you're agreeing to have your data stored on our database.</div>
        </form>}
        {error && <div className="alert-toast fixed bottom-0 right-0 m-8 w-5/6 md:w-full max-w-sm">
        <label className="close cursor-pointer flex items-start justify-between w-full p-2 bg-red-500 h-12 text-center items-center rounded shadow-lg text-white mb-6" title="close">
        <div><p className="py-2 pl-4">{msg}</p></div>
            <svg className="w-8 h-8 pr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        </label>
        </div>}
        </div>
    )
}

export default PanelSignUp;