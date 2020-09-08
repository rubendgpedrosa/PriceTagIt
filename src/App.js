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
    <div><LandingPage login={(loginInformation) => login(loginInformation)} errorAlert={errorAlert} setLoggedUser={(user) => setLoggedUser(user)}/></div>}
  </div>
  );
}

export default App;
