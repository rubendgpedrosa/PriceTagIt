import React from 'react';

const ProductCard = ({ product }) => {
  return (
    <div>
      <div className="flex items-center max-w-sm border-solid border-l-8 border-blue-200 border mb-4 mx-auto flex p-4 rounded-md">
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
