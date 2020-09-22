import React, {useState} from 'react';
import Alert from './Alert';

const ProductCreate = ({submitProduct, categories}) => {
    //This one is used to reset the product submitted.
    const [emptyProduct] = useState({name: '', normal_price: '', discounted_price: '', store: '', category: ''});
    const [newProduct, setNewProduct] = useState({name: '', normal_price: '', discounted_price: '', store: '', category: ''});
    const [errorCreate, setErrorCreate] = useState(false);
    const [msg, setMsg] = useState('');
    const [successColor, setSuccessColor] = useState(false);

    //Sends the object to the parent component.
    const onSubmit = (e) => {
        //Prevents normal submit behaviour.
        e.preventDefault();
        if(newProduct.name){
        //Treat data before sending it to db
            newProduct.normal_price = parseFloat(newProduct.normal_price).toFixed(2)
            if(newProduct.discounted_price){
                newProduct.discounted_price = parseFloat(newProduct.discounted_price).toFixed(2)
            }
            submitProduct(newProduct);
            //We reset it here!
            setNewProduct(emptyProduct);
        }else{
            setMsg('Please insert a name for the Product!');
            setSuccessColor(false);
            setErrorCreate(true);
            setTimeout(function(){
                setErrorCreate(false);
            },3000);
        }
    }

    return(
        <div className="mx-auto text-center pt-16 mt-12 p-2 max-w-md">
            <form onSubmit={onSubmit} className="w-full max-w-sm">
            <span className="text-xl uppercase font-bold text-center mx-auto mt-32 text-gray-700">Add New Product</span>
            <img className="border-solid border-2 border-gray-200 h-24 mt-8 mx-auto bg-white rounded-full" alt="" src={'/img/'+(newProduct.category ? newProduct.category.toLowerCase().split(" ").join("")+'.svg':'other.svg')}/>
            <div className="flex mb-4 mx-3">
            <input id="search" className={(errorCreate && !newProduct.name ? 'focus:border-red-500 border-red-500 ':'focus:border-blue-500 border-gray-200 ')+'mt-4 bg-gray-200 appearance-none border-2 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500'} value={newProduct.name} maxLength="38" onChange={event => setNewProduct({...newProduct, name: event.target.value})} type="text" placeholder="Product Name" />
            </div>
            <div className="grid grid-flow-col grid-cols-2 grid-rows-2 gap-6 mx-3 mt-6">
                <input id="search" className="border-gray-200 bg-gray-200 appearance-none border-2 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"  type="number" step="0.01" maxLength="6" placeholder="Normal Pricing" style={{WebkitAppearance: 'none', margin: 0, MozAppearance: 'textfield'}} value={newProduct.normal_price} onChange={event => setNewProduct({...newProduct, normal_price: event.target.value})}/>
                <input id="search" className="border-gray-200 bg-gray-200 appearance-none border-2 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" type="number" step="0.01" placeholder="Discount Price" maxLength="6" style={{WebkitAppearance: 'none', margin: 0, MozAppearance: 'textfield'}} value={newProduct.discounted_price} onChange={event => setNewProduct({...newProduct, discounted_price: event.target.value})}/>
                <input id="search" className="border-gray-200 bg-gray-200 appearance-none border-2 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" type="text" placeholder="Store Name" maxLength="18" value={newProduct.store} onChange={event => setNewProduct({...newProduct, store: event.target.value})}/>
                <div className="relative inline-block">
                <select className="relative appearance-none w-full border-gray-200 bg-gray-200 appearance-none border-2 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" value={newProduct.category} onChange={event => setNewProduct({...newProduct, category: event.target.value})}>
                    <option className="hidden text-gray-200 " disabled value="">Category</option>
                {categories.map((category, index) => <option  key={index} value={category.name}>{category.name}</option>)}
                </select>
                <span className="absolute h-full right-0 bg-blue-500 hover:text-gray-100 text-sm text-gray-100 pt-2 px-2  rounded focus:outline-none"><svg className="right-0 h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg></span></div>
            </div>
            <button className="bg-blue-500 p-2 rounded mt-10 text-gray-100 focus:outline-none">Create</button>
            </form>
            {errorCreate && <Alert successColor={successColor} msg={msg}/>}
        </div>
    )
}

export default ProductCreate;