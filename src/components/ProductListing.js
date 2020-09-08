import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import NavBar from './NavBar';
import ProductCreate from './ProductCreate';
import Alert from './Alert';

function App({loggedUser}) {
  //All the data we basically want to populate.
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  //While the data is loading, we use this to show stuff.
  const [isLoading, setIsLoading] = useState(true);
  //Search string.
  const [term, setTerm] = useState('');
  //Helps change to the add component.
  const [addNew, setAddNew] = useState(false);
  const [alert, setAlert] = useState(false);
  const [alertType, setAlertType] = useState(10);

  //Function that fets call to populate the data early. Reacts to changes to loggedUser.
  useEffect(() => {
  //Actual function to get all the data.
  const getData = async () => {
    //Issue with double request when loggedUser is first undefined.
      if(loggedUser !== undefined){
      await fetch('/api/products', 
      //We use our token to authenticate every request.
      {headers: new Headers({
        'Authorization': 'Bearer ' + loggedUser, 
        'Content-Type': 'application/json'
        }), 
        })
      .then(res => res.json())
      .then((result) => {
        setProducts(result);
      }).then(
      fetch('/api/categories', 
      //We use our token to authenticate every request.
      {headers: new Headers({
        'Authorization': 'Bearer ' + loggedUser, 
        'Content-Type': 'application/json'
      }), 
    })
        .then(res => res.json())
        .then((result) => {
            setCategories(result);
        }))
      }
    };
    getData().then(setIsLoading(false));
  }, [loggedUser]);

//Function used to create the new object received from ProductCreate component..
const createProductHandler = async (product) => {
  //We set the product image from it's category.
  product.src = product.category ? product.category.toLowerCase().split(" ").join("")+'.svg':'other.svg';
  product.account_id = loggedUser.id;
  //Treat data before sending it to db
  product.regular_price = product.regular_price.split(" ").join("");
  fetch('/api/products', {
    method: 'post',
    body: JSON.stringify({
      product: product
    }),
    //Again, we send the token on every account related request.
    headers: new Headers({"Content-Type": "application/json", 'Authorization': 'Bearer ' + loggedUser})
  }).then(function(response) {
    return response.json();
  }).then(function(response) {
    var tempArray = products;
    product.id = response.insertId;
    tempArray.unshift(product);
    setProducts(tempArray);
    setAlertType(1);
    setAlert(true);
    setTimeout(function(){
      setAlert(false);
    },2000);
  })
};

//When we delete, we also send a token and the id related to the object.
const deleteItemHandler = async (product) => {
  fetch('/api/products/'+product.id, {
    method: 'delete',
    body: JSON.stringify({
      product: product
    }),
    headers: new Headers({"Content-Type": "application/json", 'Authorization': 'Bearer ' + loggedUser})
  }).then(function(response) {
    return response.json();
  }).then(function() {
    setProducts(products.filter(p => p.id !== product.id));
    setAlertType(0);
    setAlert(true);
    setTimeout(function(){
      setAlert(false);
    },2000);
  });
  
};

return (
  <div>
    <NavBar searchText={(text) => setTerm(text)} addNew={addNew} changeWindow={(changed => setAddNew(!addNew))}/>
	<div className="container mx-auto bg-white md:mt-16 h-full overflow-y-auto">
    {!addNew && !isLoading && products.length === 0 && <h1 className="text-5xl text-center mx-auto mt-32">No Products Found</h1> }
    {addNew ? <ProductCreate categories={categories} submitProduct={(product) => createProductHandler(product)}/>: (
    isLoading ? <h1 className="text-6xl text-center mx-auto mt-32">Loading...</h1> :
    <div className="grid grid-cols-1 px-4">
      {products.filter(product => product.name.toUpperCase().includes(term.toUpperCase()) ||
      product.category.toUpperCase().includes(term.toUpperCase()) || product.store.toUpperCase().includes(term.toUpperCase()))
      .map(product => (
        <div key={product.id}>
        <ProductCard key={product.id} product={product} deleteItem={(product) => deleteItemHandler(product)} />
        </div>
      ))}
      </div>)}
	  </div>
    {alert && <Alert created={alertType}/>}
  </div>
  );
}

export default App;
