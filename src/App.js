import React, {useState} from 'react';
import ProductListing from './components/ProductListing';
import LoginPage from './components/LoginPage';


function App() {
const [isLoggedIn, setIsLoggedIn] = useState(false);

return (
  <div>
    {isLoggedIn?<ProductListing/>:
    <div><LoginPage login={() => setIsLoggedIn(!isLoggedIn)}/>
    <footer class='w-full text-center fixed bottom-0 bg-blue-500 text-gray-100 p-4'>
      Price Tag It &copy;
    </footer></div>}
  </div>
  );
}

export default App;
