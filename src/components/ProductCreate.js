import React, {useState} from 'react';

const ProductCreate = ({submitProduct, categories}) => {
    //This one is used to reset the product submitted.
    const [emptyProduct] = useState({name: '', regular_price: '', promotion_price: '', store: '', category: ''});
    const [newProduct, setNewProduct] = useState({name: '', regular_price: '', promotion_price: '', store: '', category: ''});
    const [errorCreate, setErrorCreate] = useState(false);

    //Sends the object to the parent component.
    const onSubmit = (e) => {
        //Prevents normal submit behaviour.
        e.preventDefault();
        if(newProduct.name && newProduct.regular_price){
        //Treat data before sending it to db
            newProduct.regular_price = parseFloat(newProduct.regular_price).toFixed(2)
            if(newProduct.promotion_price){
                newProduct.promotion_price = parseFloat(newProduct.promotion_price).toFixed(2)
            }
            submitProduct(newProduct);
            //We reset it here!
            setNewProduct(emptyProduct);
        }else{
            setErrorCreate(true);
            setTimeout(function(){
                setErrorCreate(false);
            },3000);
        }
    }

    return(
        <div className="mx-auto text-center pt-16 mt-12 p-2  max-w-md">
            <form onSubmit={onSubmit} className="w-full max-w-sm">
            <span className="text-xl uppercase font-bold text-center mx-auto mt-32 text-gray-700">Add New Product</span>
            <div className="flex mb-4">
            <input id="search" className={(errorCreate && !newProduct.name ? 'focus:border-red-500 border-red-500 ':'focus:border-blue-500 border-blue-200 ')+'bg-transparent border-b border-b-2 w-screen text-gray-700 mx-3 mt-8 px-4 py-1 px-2 leading-tight focus:outline-none'} value={newProduct.name} maxLength="38" onChange={event => setNewProduct({...newProduct, name: event.target.value})} type="text" placeholder="Product Name*" />
            </div>
            <div className="grid grid-flow-col grid-cols-2 grid-rows-2 gap-6 mx-3 mt-6">
                <input id="search" className={(errorCreate && !newProduct.regular_price ?  'focus:border-red-500 border-red-500 ':'focus:border-blue-500 border-blue-200 ')+'bg-transparent border-b border-b-2 w-full text-gray-700 px-4 py-1 px-2 leading-tight focus:outline-none'} type="number" step="0.01" maxLength="6" placeholder="Normal Pricing*" value={newProduct.regular_price} onChange={event => setNewProduct({...newProduct, regular_price: event.target.value})}/>
                <input id="search" className="bg-transparent border-b border-b-2 focus:border-blue-500 border-blue-200 w-full text-gray-700 px-4 py-1 px-2 leading-tight focus:outline-none" type="number" step="0.01" placeholder="Discount Price" maxLength="6" value={newProduct.promotion_price} onChange={event => setNewProduct({...newProduct, promotion_price: event.target.value})}/>
                <input id="search" className="bg-transparent border-b border-b-2 focus:border-blue-500 border-blue-200 w-full text-gray-700 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder="Store Name" maxLength="18" value={newProduct.store} onChange={event => setNewProduct({...newProduct, store: event.target.value})}/>
                <select className="block appearance-none w-full bg-transparent border-b focus:border-blue-500 border-blue-200 hover:border-blue-500 px-1 py-2 pr-8 focus:outline-none text-gray-700" value={newProduct.category} onChange={event => setNewProduct({...newProduct, category: event.target.value})}>
                    <option className="hidden text-gray-200" disabled value="">Product Category</option>
                {categories.map((category, index) => <option  key={index} value={category.name}>{category.name}</option>)}
                </select>
            </div>
            <button className="bg-blue-500 p-2 rounded mt-10 text-gray-100 focus:outline-none">Create</button>
            </form>
            {errorCreate && <div className="alert-toast fixed bottom-0 right-0 m-8 w-5/6 md:w-full max-w-sm">
            <label className="close cursor-pointer flex items-start justify-between w-full p-2 bg-red-500 h-12 text-center items-center rounded shadow-lg text-white" title="close">
                <div><p className="py-2 pl-4">Please insert Product Name & Price!</p></div>
                <svg className="w-8 h-8 pr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </label>
            </div>}
        </div>
    )
}

export default ProductCreate;