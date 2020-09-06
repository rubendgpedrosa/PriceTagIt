import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import NavBar from './NavBar';
import ProductCreate from './ProductCreate';
import Alert from './Alert';

function App({loggedUser}) {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [term, setTerm] = useState('');
  const [addNew, setAddNew] = useState(false);
  const [alert, setAlert] = useState(false);
  const [alertType, setAlertType] = useState(10);

  useEffect(() => {
    if(loggedUser !== undefined){
      getData().then(setIsLoading(false));
    }
  }, [loggedUser]);

  const getData = async () => {
  await fetch('/api/products', {headers: new Headers({
    'Authorization': 'Bearer ' + loggedUser, 
    'Content-Type': 'application/json'
    }), 
    })
  .then(res => res.json())
  .then((result) => {
    setProducts(result);
  }).then(
  fetch('/api/categories', {headers: new Headers({
    'Authorization': 'Bearer ' + loggedUser, 
    'Content-Type': 'application/json'
  }), 
})
  .then(res => res.json())
  .then((result) => {
      setCategories(result);
  }))
};

const createProductHandler = async (product) => {
  product.src = product.category+'.svg';
  console.log(loggedUser);
  product.account_id = loggedUser.id;
  fetch('/api/products', {
    method: 'post',
    body: JSON.stringify({
      product: product
    }),
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
    setProducts(products.filter(p => p.name !== product.name));
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
    isLoading ? <h1 className="text-6xl text-center mx-auto mt-32">Loading...</h1> : <div className="grid grid-cols-1 px-4">
      {products.filter(product => product.name.toUpperCase().includes(term.toUpperCase()) ||
      product.category.toUpperCase().includes(term.toUpperCase()) || product.store.toUpperCase().includes(term.toUpperCase()))
      .map(product => (
        <ProductCard key={product.id} product={product} deleteItem={(product) => deleteItemHandler(product)} />
      ))}
      </div>)}
	  </div>
    {alert && <Alert created={alertType}/>}
  </div>
  );
}

export default App;
