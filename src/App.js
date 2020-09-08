import React, {useState} from 'react';
import ProductListing from './components/ProductListing';
import LandingPage from './components/LandingPage';

function App() {
const [isLoggedIn, setIsLoggedIn] = useState(false);
const [loggedUser, setLoggedUser] = useState();
const [errorAlert, setErrorAlert] = useState(false);

//Login fetch POST request sending login data.
const login = async (loginInformation) => {
  //console.log(loginInformation);
  if(loginInformation.password && loginInformation.email){
  fetch('/api/auth/login', {
    method: 'post',
    body: JSON.stringify({
      loginInformation: loginInformation
    }),
    headers: {"Content-Type": "application/json"}
  }).then(res => {return res.json()})
  .then((result) => {
    setIsLoggedIn(true);
    setLoggedUser(result.token);
  }).catch(async (response) => {
    setErrorAlert(true);
    setTimeout(function(){
      setErrorAlert(false);
    },2000);
  })}else{
    setErrorAlert(true);
    setTimeout(function(){
      setErrorAlert(false);
    },2000);
  }
}

return (
  <div>
    {isLoggedIn?<ProductListing loggedUser={loggedUser}/>:
    <div><LandingPage login={(loginInformation) => login(loginInformation)} errorAlert={errorAlert} setLoggedUser={(user) => setLoggedUser(user)}/>
    <footer className='w-full text-center fixed bottom-0 text-gray-100 bg-blue-500 p-3'>
      <span className=" font-bold">Price Tag It &copy;</span> | Credits to  - <span className="font-bold cursor-pointer hover:underline">monkik&freepik</span>
    </footer>
    </div>
    }
  </div>
  );
}

export default App;
