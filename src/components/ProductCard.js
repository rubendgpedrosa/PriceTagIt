import React, {useState} from 'react';

const ProductCard = ({ product, deleteItem }) => {
  //Checks if the user really wants to delete.
  const [confirmDelete, setConfirmDelete] = useState(false);

  return (
    <div className="relative items-center max-w-sm mx-auto">
      <div className="static flex items-center w-sm border-solid border-l-8 border-blue-200 border mb-4 mx-auto flex p-4 rounded-md">
      {!confirmDelete?<button onClick={() => setConfirmDelete(!confirmDelete)} className="absolute right-0 top-0 text-red-500 rounded-full p-2">
        <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
        </button>:
        <button onClick={() => deleteItem(product)} className="absolute right-0 top-0 text-red-500 rounded-full p-2">
        <svg className="h-5 w-5"  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
        </svg>
        </button>}
        <div className="w-1/4 flex-shrink-0">
          <img className="border-solid border-2 border-gray-200 h-20 w-20 bg-white rounded-full p-2" alt="" src={'/img/'+product.src}/>
        </div>
        <div className="w-1/2 ml-6 pt-1">
          <h4 className="text-md font-bold text-gray-700 leading-tight uppercase">{product.name}</h4>
          <p className  ="text-sm text-gray-600 leading-normal">{product.regular_price+'€'}</p>
          <p className  ="text-sm pt-2 text-gray-600 leading-normal">{product.store.toUpperCase()}</p>
        </div>
        <div className="w-1/6 ml-6 pt-1">
          <h4 className="text-lg items-end font-bold text-green-600 leading-tight uppercase">{product.promotion_price+'€'}</h4>
        </div>
      </div>
    </div>
  )
}

export default ProductCard;
