import React from 'react';
import Link from 'next/link';
import { urlFor } from '../lib/client';

const Product = ({product:{
  name , slug , image , price 
}}) => {
  return (
    <div>
      <Link href={`/products/${slug.current}`} >
      <div className='product-card'>
        <img src={urlFor(image && image[1])} alt="image"
        className='product-image'
        width={250}
        height ={250}
         />
         <p className='product-name'>{name}</p>
         <p className='product-price'>${price}</p>
      </div>
      </Link>
    </div>

  )
}

export default Product;