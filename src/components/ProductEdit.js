import React, {useState} from 'react';

const ProductEdit = ({product, categories, submitProduct, cancelEdit }) => {
    //This one is used to reset the product submitted.
    const [newProduct, setNewProduct] = useState(product);
    const [errorCreate, setErrorCreate] = useState(false);
    const [msg, setMsg] = useState('');
    const [successColor, setSuccessColor] = useState(false);
    const [cancel, setCancel] = useState(false);

    //Sends the object to the parent component.
    const onSubmit = (e) => {
        //Prevents normal submit behaviour.
        e.preventDefault();
        //If it's a normal submit
        if(!cancel){
        if(newProduct.name && newProduct.category){
        //Treat data before sending it to db
            newProduct.src = newProduct.category ? newProduct.category.toLowerCase().split(" ").join("")+'.svg':'other.svg';
            newProduct.normal_price = parseFloat(newProduct.normal_price).toFixed(2)
            if(newProduct.discounted_price){
                newProduct.discounted_price = parseFloat(newProduct.discounted_price).toFixed(2)
            }
            submitProduct(newProduct);
        }else{
            setMsg('Please insert a name for the Product!');
            setSuccessColor(false);
            setErrorCreate(true);
            setTimeout(function(){
                setErrorCreate(false);
            },3000);
        }}else{
            cancelEdit();
        }
    }

    return(
        <div className="mx-auto text-center pt-16 mt-12 p-2  max-w-md">
            <form onSubmit={onSubmit} className="w-full max-w-sm">
            <span className="text-xl uppercase font-bold text-center mx-auto mt-32 text-gray-700">Edit Product</span>
            <img className="mb-6 border-solid border-2 border-gray-200 h-24 mt-8 mx-auto bg-white rounded-full" alt="" src={'/img/'+(newProduct.category ? newProduct.category.toLowerCase().split(" ").join("")+'.svg':'other.svg')}/>
            <div className="flex mb-4 mx-3">
            <input id="search" className={(errorCreate && !newProduct.name ? 'focus:border-red-500 border-red-500 ':'focus:border-blue-500 border-gray-200 ')+'mt-4 bg-gray-200 appearance-none border-2 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500'} value={newProduct.name} maxLength="38" onChange={event => setNewProduct({...newProduct, name: event.target.value})} type="text" placeholder="Product Name*" />
            </div>
            <div className="grid grid-flow-col grid-cols-2 grid-rows-2 gap-6 mx-3 mt-6">
                <input id="search" className="border-gray-200 bg-gray-200 appearance-none border-2 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" style={{WebkitAppearance: 'none', margin: 0, MozAppearance: 'textfield'}} type="number" step="0.01" maxLength="6" placeholder="Normal Pricing*" value={newProduct.normal_price} onChange={event => setNewProduct({...newProduct, normal_price: event.target.value})}/>
                <input id="search" className="border-gray-200 bg-gray-200 appearance-none border-2 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" style={{WebkitAppearance: 'none', margin: 0, MozAppearance: 'textfield'}} type="number" step="0.01" placeholder="Discount Price" maxLength="6" value={newProduct.discounted_price} onChange={event => setNewProduct({...newProduct, discounted_price: event.target.value})}/>
                <input id="search" className="border-gray-200 bg-gray-200 appearance-none border-2 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" type="text" placeholder="Store Name" maxLength="18" value={newProduct.store} onChange={event => setNewProduct({...newProduct, store: event.target.value})}/>
                <div className="relative inline-block">
                <select className="border-gray-200 bg-gray-200 appearance-none border-2 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" value={newProduct.category} onChange={event => setNewProduct({...newProduct, category: event.target.value})}>
                    <option className="hidden text-gray-200" disabled value="">Product Category</option>
                {categories.map((category, index) => <option  key={index} value={category.name}>{category.name}</option>)}
                </select><span className="absolute h-full right-0 bg-blue-500 hover:text-gray-100 text-sm text-gray-100 pt-2 px-2  rounded focus:outline-none"><svg className="right-0 h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg></span></div>
            </div>
            <button id="1" className="bg-blue-500 p-2 rounded mt-10 text-gray-100 focus:outline-none">Submit</button>
            <button id="0" onClick={() => setCancel(true)} className="ml-4 bg-red-500 p-2 rounded mt-10 text-gray-100 focus:outline-none">Cancel</button>
            </form>


            {/* Alert when submitting */}
            {errorCreate && <div className="alert-toast fixed top-0 right-0 m-8 my-24 w-5/6 md:w-full max-w-sm">
            <label className={(successColor? 'bg-green-500':'bg-red-500') + ' close cursor-pointer flex items-start justify-between w-full p-2 h-12 text-center items-center rounded shadow-lg text-white'} title="close">
                <div><p className="py-2 pl-4">{msg}</p></div>
                <svg className="w-8 h-8 pr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </label>
            </div>}
        </div>
    )
}

export default ProductEdit;