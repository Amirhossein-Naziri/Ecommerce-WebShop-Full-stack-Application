import React from 'react';
// import {Product , FooterBanner , HeroBanner } from "./../components/"
import Product from '../components/Product';
import HeroBanner from '../components/HeroBanner';
import FooterBanner from '../components/FooterBanner';
import {client} from "../lib/client"

const index = ({products , bannerData}) => {
  return (
    <>
      <HeroBanner heroBanner={bannerData.length && bannerData[0]}/>
        
        <div className='products-heading'>
          <h2>Best Seller Products</h2>
          <p>iphone 14 Apple</p>
        </div>

        <div className='products-container'>
          {products?.map((product) => product)}
        </div>

      <FooterBanner/>
    
    </>
  )

}
export const getServerSideProps = async()=>{
    const productQuery = '*[_type == "product"]';
    const product = await client.fetch(productQuery);

    const bannerQuery = '*[_type == "banner"]';
    const bannerData = await client.fetch(bannerQuery);

    return {
      props:{product , bannerData}
    }
    
}

export default index;