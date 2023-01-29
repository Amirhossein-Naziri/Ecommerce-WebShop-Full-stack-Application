import React from 'react';
// import {Product , FooterBanner , HeroBanner } from "./../components/"
import Product from '../components/Product';
import HeroBanner from '../components/HeroBanner';
import FooterBanner from '../components/FooterBanner';
import {client} from "../lib/client"
import banner from '../ecomerce/schemas/banner';

const index = ({products , bannerData}) => {
  return (
    <>
      <HeroBanner heroBanner={bannerData.length && bannerData[0]}/>
        
        <div className='products-heading'>
          <h2>Best Seller Products</h2>
          <p>iphone 14 Apple</p>
        </div>
        {console.log(products)}
        <div className='products-container'>
          {products?.map((product) => <Product key={product._id} product={product}/>)}
        </div>

      <FooterBanner footerBanner={bannerData && bannerData[1]}/>
    
    </>
  )

}
export const getServerSideProps = async()=>{
    const productQuery = '*[_type == "product"]';
    const products = await client.fetch(productQuery);

    const bannerQuery = '*[_type == "banner"]';
    const bannerData = await client.fetch(bannerQuery);

    return {
      props:{products , bannerData}
    }
    
}

export default index;