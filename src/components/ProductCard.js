import React, {useState} from 'react';

const ProductCard = ({ product, deleteItem, editItem }) => {
  //Checks if the user really wants to delete.
  const [confirmDelete, setConfirmDelete] = useState(false);

  return (
    <div className="relative items-center max-w-sm mx-auto">
      <div className="h-24 static flex items-center w-sm border-solid border-l-8 border-blue-200 border mb-2 mx-auto flex p-2 rounded-md">

      {/* EDIT BUTTON */}
      <button onClick={() => editItem(product)} className="absolute right-0 mr-6 top-0 text-gray-700 rounded-full p-1 focus:outline-none">
        <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
          <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
        </svg>
        </button>

      

      {/* DELETE BUTTON THAT ALTERNATES BETWEEN BIN AND CHECKMARK*/}
      {!confirmDelete?<button onClick={() => setConfirmDelete(!confirmDelete)} className="absolute right-0 top-0 text-red-600 rounded-full p-1 focus:outline-none">
        <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
        </button>:
        <button onClick={() => deleteItem(product)} className="absolute right-0 top-0 text-red-600 rounded-full p-1 focus:outline-none">
        <svg className="h-5 w-5"  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
        </svg>
        </button>}

        {/* CARD INFORMATION LAYOUT. */}
        <div className="w-1/4 ml-3 flex-shrink-0">
          <img className="border-solid border-2 border-gray-200 h-16 bg-white rounded-full" alt="" src={'/img/'+product.src}/>
        </div>
        <div className="w-1/2 pt-1">
          <h4 className="text-sm font-bold text-gray-700 leading-tight uppercase">{product.name}</h4>
          <p className  ="text-xs text-gray-600 leading-normal">{product.store.toUpperCase()}</p>
        </div>
        <div className="w-1/4 ml-6 pt-1 mr-2">
          <h4 className="text-lg items-end font-bold text-green-600 leading-tight uppercase">{product.discounted_price? product.discounted_price+'€':'N/A'}</h4>
          <p className="text-sm font-bold text-gray-500 leading-normal">{product.normal_price? product.normal_price+'€':'N/A'}</p>
        </div>
      </div>
    </div>
  )
}

export default ProductCard;
