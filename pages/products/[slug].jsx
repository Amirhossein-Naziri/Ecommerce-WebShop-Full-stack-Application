import React, { useContext, useState } from 'react';
import {urlFor , client} from "../../lib/client";
import {AiOutlineMinus , AiOutlinePlus , AiFillStar , AiOutlineStar} from "react-icons/ai";
import Product from "./../../components/Product";
import { useStateContext } from '../../context/stateContext';



const ProductDetails = ({product , products}) => {
    

    const {image , name , Details , price } = product;
    const [index , setIndex] = useState(0);
    const {incQty , decQty , qty , onAdd } = useStateContext();
  return (
    <div>
        <div className="product-detail-container">
            <div>
                <div className="image-container">
                <img src={urlFor(image && image[index])} alt="image" className='product-detail-image' />
                </div>
                <div className='small-images-container'>
                    {image?.map((item , i)=>(
                        <img
                        key={i}
                        className={i === index ? 'small-image selected-image' :  'small-image'}
                        src={urlFor(item)}
                        onMouseEnter={()=> setIndex(i)}
                        alt="" />
                    ))}
                    
                </div>
            </div>
            <div className="product-detail-desc">
                <h1>{name}</h1>
                <div className="reviews">
                   <div>
                   <AiFillStar/>
                    <AiFillStar/>
                    <AiFillStar/>
                    <AiFillStar/>
                    <AiOutlineStar/>
                   </div>
                <p>(20)</p>
                </div>
                <h4>Detail:</h4>
                <p>{Details}</p>
                <p className='price'>${price}</p>
                <div className='quantity'>
                    <h3>Quantity:</h3>
                    <p className="quantity-desc">
                        <span className='minus' onClick={decQty}><AiOutlineMinus/></span>
                        <span className='num' onClick="">{qty}</span>
                        <span className='plus' onClick={incQty}><AiOutlinePlus/></span>
                    </p>
                </div>
                <div className="buttons">
                    <button className="add-to-cart" onClick={()=> onAdd(product , qty)} type='button'>Add to cart</button>
                    <button className="buy-now" onClick="" type='button'>buy now</button>
                </div>
            </div>
        </div>

        <div className="maylike-products-wrapper">
                <h2>you may also like</h2>
                <div className="marquee">
                    <div className='maylike-products-container track'>
                        {products.map((item )=>(
                            <Product key={item._id} product={item}/>
                        ))}
                    </div>
                </div>
        </div>
    </div>
  )
}

export const getStaticPaths = async () => {
    const query = `*[_type == "product"] {
        slug {
            current
        }
    }`

    const products = await client.fetch(query);

    const paths = products.map((product)=> ({
        params: {
            slug:product.slug.current
        }
    }))

    return {
        paths,
        fallback:"blocking"
    }
}

export const getStaticProps = async ({params:{slug}}) => {
    const query = `*[_type == "product" && slug.current == "${slug}"][0]`;
    const productQuery = `*[_type == "product"]`;

    const product = await client.fetch(query);
    const products = await client.fetch(productQuery);

    // console.log("product: ",product)

    return {
        props:{products , product}
    }
}

export default ProductDetails;