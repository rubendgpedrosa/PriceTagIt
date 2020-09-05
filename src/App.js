import React, {useState} from 'react';
import ProductListing from './components/ProductListing';
import LoginPage from './components/LoginPage';


function App() {
const [isLoggedIn, setIsLoggedIn] = useState(false);

return (
  <div>
    {isLoggedIn?<ProductListing/>:<LoginPage login={() => setIsLoggedIn(!isLoggedIn)}/>}
  </div>
  );
}

export default App;
