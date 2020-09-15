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
        <div className="mx-auto text-center pt-16 mt-12 p-2  max-w-md">
            <form onSubmit={onSubmit} className="w-full max-w-sm">
            <span className="text-xl uppercase font-bold text-center mx-auto mt-32 text-gray-700">Add New Product</span>
            <img className="border-solid border-2 border-gray-200 h-24 mt-8 mx-auto bg-white rounded-full" alt="" src={'/img/'+(newProduct.category ? newProduct.category.toLowerCase().split(" ").join("")+'.svg':'other.svg')}/>
            <div className="flex mb-4">
            <input id="search" className={(errorCreate && !newProduct.name ? 'focus:border-red-500 border-red-500 ':'focus:border-blue-500 border-blue-200 ')+'bg-transparent border-b border-b-2 w-screen text-gray-700 mx-3 mt-8 px-4 py-1 px-2 leading-tight focus:outline-none'} value={newProduct.name} maxLength="38" onChange={event => setNewProduct({...newProduct, name: event.target.value})} type="text" placeholder="Product Name*" />
            </div>
            <div className="grid grid-flow-col grid-cols-2 grid-rows-2 gap-6 mx-3 mt-6">
                <input id="search" className="bg-transparent border-b border-b-2 focus:border-blue-500 border-blue-200 w-full text-gray-700 px-4 py-1 px-2 leading-tight focus:outline-none"  type="number" step="0.01" maxLength="6" placeholder="Normal Pricing*" value={newProduct.normal_price} onChange={event => setNewProduct({...newProduct, normal_price: event.target.value})}/>
                <input id="search" className="bg-transparent border-b border-b-2 focus:border-blue-500 border-blue-200 w-full text-gray-700 px-4 py-1 px-2 leading-tight focus:outline-none" type="number" step="0.01" placeholder="Discount Price" maxLength="6" value={newProduct.discounted_price} onChange={event => setNewProduct({...newProduct, discounted_price: event.target.value})}/>
                <input id="search" className="bg-transparent border-b border-b-2 focus:border-blue-500 border-blue-200 w-full text-gray-700 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder="Store Name" maxLength="18" value={newProduct.store} onChange={event => setNewProduct({...newProduct, store: event.target.value})}/>
                <select className="block appearance-none w-full bg-transparent border-b focus:border-blue-500 border-blue-200 hover:border-blue-500 px-1 py-2 pr-8 focus:outline-none text-gray-700" value={newProduct.category} onChange={event => setNewProduct({...newProduct, category: event.target.value})}>
                    <option className="hidden text-gray-200" disabled value="">Product Category</option>
                {categories.map((category, index) => <option  key={index} value={category.name}>{category.name}</option>)}
                </select>
            </div>
            <button className="bg-blue-500 p-2 rounded mt-10 text-gray-100 focus:outline-none">Create</button>
            </form>
            {errorCreate && <Alert successColor={successColor} msg={msg}/>}
        </div>
    )
}

export default ProductCreate;