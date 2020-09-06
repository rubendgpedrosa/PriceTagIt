import React, {useState} from 'react';
import ProductListing from './components/ProductListing';
import LoginPage from './components/LoginPage';


function App() {
const [isLoggedIn, setIsLoggedIn] = useState(false);

//Login fetch POST request sending login data.
const login = async (loginInformation) => {
  //console.log(loginInformation);
  fetch('/api/auth/login', {
    method: 'post',
    body: JSON.stringify({
      loginInformation: loginInformation
    }),
    headers: {"Content-Type": "application/json"}
  }).then(function(response) {
    return response.json();
  }).then(function(response) {
    setIsLoggedIn(true);
  })
}

return (
  <div>
    {isLoggedIn?<ProductListing/>:
    <div><LoginPage login={(loginInformation) => setIsLoggedIn(true)}/>
    <footer className='w-full text-center fixed bottom-0 bg-blue-500 text-gray-100 p-4'>
      Price Tag It &copy;
    </footer></div>}
  </div>
  );
}

export default App;
