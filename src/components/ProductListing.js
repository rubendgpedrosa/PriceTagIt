import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import NavBar from './NavBar';
import ProductCreate from './ProductCreate';
import Alert from './Alert';
import ProductEdit from './ProductEdit';

function App({loggedUser, logoffHandler}) {
  //All the data we basically want to populate.
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  //While the data is loading, we use this to show stuff.
  const [isLoading, setIsLoading] = useState(true);
  //Search string.
  const [term, setTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  //Helps change to the add component.
  const [addNew, setAddNew] = useState(false);
  const [alert, setAlert] = useState(false);
  const [alertType, setAlertType] = useState(2);
  const [msg, setMsg] = useState('');
  //Editing
  const [editItem, setEditItem] = useState({});
  const [scrollY, setScrollY] = useState(0);

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
      await fetch('/api/categories', 
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
    setMsg('Product created sucessfully!');
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
    setAlertType(1);
    setMsg('Product deleted sucessfully!');
    setAlert(true);
    setTimeout(function(){
      setAlert(false);
    },2000);
  });
};

const editProductHandler = async (product) => {
  fetch('/api/products/'+product.id, {
    method: 'PATCH',
    body: JSON.stringify({
      product: product
    }),
    headers: new Headers({"Content-Type": "application/json", 'Authorization': 'Bearer ' + loggedUser})
  }).then(function(response) {
    return response.json();
  }).then(function() {
    setProducts(products.filter(p => p.id !== product.id));
  }).then(function (){
    let tempArray = [...products];
    let index = products.map(p => p.id).indexOf(product.id);
    setMsg('Product edited sucessfully!');
    tempArray[index] = product;
    setProducts([...tempArray]);
    setEditItem({});
    setAlertType(1);
    setAlert(true);
    setTimeout(function(){
      setAlert(false);
    },2000);
  });
};

function logit() {
  setScrollY(window.pageYOffset);
}

useEffect(() => {
  function watchScroll() {
    window.addEventListener("scroll", logit);
  }
  watchScroll();
  return () => {
    window.removeEventListener("scroll", logit);
  };
});

const topFunction = () => {
  window.scrollTo({top: 0, behavior: "smooth"})
}

return (
  <div>
    {/* NAVIGATION BAR AND SEARCH INPUT */}
    {<NavBar logoffHandler={logoffHandler} categories={[...new Set( products.map(obj => obj.category)) ]} selectedCategory={(category) => setSelectedCategory(category)} searchText={(text) => setTerm(text)} addNew={addNew} changeWindow={() => editItem.name !== undefined ?
      setEditItem({}) : setAddNew(!addNew) } editItem={editItem.id !== undefined}/>}

	<div className="container mx-auto bg-white h-full overflow-y-auto pb-4">
    {!addNew && !isLoading && products.length === 0 && <div>
      <div className="text-gray-700 text-center"><p className="text-xl font-bold pt-10 pb-2">Empty Product List</p> <span onClick={() => setAddNew(true)} className="cursor-pointer text-blue-500 underline">click here</span> or on the top left corner, to start adding products to your list.</div>
    </div> }

    {addNew ?
    <ProductCreate categories={categories} cancelEdit={()=>setAddNew(false)} submitProduct={(product) => createProductHandler(product)}/>:
    (isLoading ? <h1 className="text-6xl text-center mx-auto mt-32">Loading...</h1>:
    (!editItem.id ? <div className="grid grid-cols-1 px-4">
    {products.filter(product => selectedCategory?
    product.category === selectedCategory: product.name.toUpperCase().includes(term.toUpperCase()))
    .map(product => (
      <div key={product.id}>
        {product.name.includes(selectedCategory)}
      <ProductCard key={product.id} product={product} deleteItem={(product) => deleteItemHandler(product)} editItem={(product) => setEditItem(product)}/>
      </div>
    ))}
    {products.length > 0 && scrollY > 0 && <button id="scroll" onClick={() => topFunction()} style={{zIndex:10, bottom: 25,left:25}} className="focus:outline-none display-none fixed rounded-full shadow-md p-2 bg-blue-300 hover:bg-blue-400 text-white" title="Go to top">
    <svg className="h-8 w-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 11l7-7 7 7M5 19l7-7 7 7" />
    </svg>
    </button>}
    </div>:
    <ProductEdit setEditItem={() => setEditItem()} product={editItem} categories={categories} submitProduct={(product) => editProductHandler(product)} cancelEdit={()=>setEditItem({})}/>))}
	  </div>

    {alert && <Alert msg={msg} created={alertType}/>}
  </div>
  );
}

export default App;
