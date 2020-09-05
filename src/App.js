import React, { useState, useEffect } from 'react';
import ProductCard from './components/ProductCard';
import NavBar from './components/NavBar';
import ProductCreate from './components/ProductCreate';

function App() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [term, setTerm] = useState('');
  const [addNew, setAddNew] = useState(false);

  useEffect(() => {
    getData().then(setIsLoading(false));
  }, []);

const getData = async () => {
  fetch('/api/products')
  .then(res => res.json())
  .then((result) => {
    setProducts(result);
  }).then(
  fetch('/api/categories')
  .then(res => res.json())
  .then((result) => {
      setCategories(result);
  }))
};

const submitProducthandler = async (product) => {
  console.log(product);
}

return (
  <div>
    <NavBar searchText={(text) => setTerm(text)} addNew={addNew} changeWindow={(changed => setAddNew(!addNew))}/>
	<div className="container mx-auto bg-white md:mt-16 h-full overflow-y-auto">
    {!isLoading && products.length === 0 && <h1 className="text-5xl text-center mx-auto mt-32">No Products Found</h1> }
    {addNew ? <ProductCreate  categories={categories} submitProduct={(product) => submitProducthandler(product)}/>: (
    isLoading ? <h1 className="text-6xl text-center mx-auto mt-32">Loading...</h1> : <div className="grid grid-cols-1 px-4">
      {products.filter(product => product.name.toUpperCase().includes(term.toUpperCase()) ||
      product.category.toUpperCase().includes(term.toUpperCase()) || product.store.toUpperCase().includes(term.toUpperCase()))
      .map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
      </div>)}
	  </div>
  </div>
  );
}

export default App;
