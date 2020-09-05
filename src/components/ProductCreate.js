import React, {useState} from 'react';

const ProductCreate = ({submitProduct, categories}) => {
    const [emptyProduct, setEmptyProduct] = useState({name: '', regular_price: '', promotion_price: '', store: '', category: ''});
    const [newProduct, setNewProduct] = useState({name: '', regular_price: '', promotion_price: '', store: '', category: ''});

    const onSubmit = (e) => {
        e.preventDefault();
        submitProduct(newProduct);
        setNewProduct(emptyProduct);
    }

    return(
        <div className="mx-auto text-center pt-16 mt-12 p-2">
            <form onSubmit={onSubmit} className="w-full max-w-sm">
            <span className="text-xl uppercase font-bold text-center mx-auto mt-32 text-gray-700">Add New Product</span>
            <div className="flex mb-4">
            <input id="search" className="bg-transparent border-b border-b-2 focus:border-blue-500 border-blue-200 w-screen text-gray-700 mx-3 mt-8 px-4 py-1 px-2 leading-tight focus:outline-none" value={newProduct.name} onChange={event => setNewProduct({...newProduct, name: event.target.value})} type="text" placeholder="Product Name" />
            </div>

                
            <div className="grid grid-flow-col grid-cols-2 grid-rows-2 gap-6 mx-3 mt-6">
                <input id="search" className="bg-transparent border-b border-b-2 focus:border-blue-500 border-blue-200 w-full text-gray-700 px-4 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder="Normal Pricing" value={newProduct.regular_price} onChange={event => setNewProduct({...newProduct, regular_price: event.target.value})}/>
                <input id="search" className="bg-transparent border-b border-b-2 focus:border-blue-500 border-blue-200 w-full text-gray-700 px-4 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder="Discount Price" value={newProduct.promotion_price} onChange={event => setNewProduct({...newProduct, promotion_price: event.target.value})}/>
                <input id="search" className="bg-transparent border-b border-b-2 focus:border-blue-500 border-blue-200 w-full text-gray-700 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder="Store Name" value={newProduct.store} onChange={event => setNewProduct({...newProduct, store: event.target.value})}/>
                <select class="block appearance-none w-full bg-transparent border-b focus:border-blue-500 border-blue-200 hover:border-blue-500 px-4 py-2 pr-8 focus:outline-none text-gray-700" value={newProduct.category} onChange={event => setNewProduct({...newProduct, category: event.target.value})}>
                {categories.map((category, index) => <option  key={index} value={category.name}>{category.name}</option>)}
                </select>
            </div>
            <button className="bg-green-500 p-2 rounded mt-10 text-gray-100">Submit</button>
            </form>
        </div>
    )
}

export default ProductCreate;