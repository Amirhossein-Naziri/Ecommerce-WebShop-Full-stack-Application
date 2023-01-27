import React from 'react';
// import {Product , FooterBanner , HeroBanner } from "./../components/"
import Product from '../components/Product';

import HeroBanner from '../components/HeroBanner';
import FooterBanner from '../components/FooterBanner';

const index = () => {
  return (
    <>
      <HeroBanner/>

        <div className='products-heading'>
          <h2>Best Seller Products</h2>
          <p>iphone 14 Apple</p>
        </div>

        <div className='products-container'>
          {[
            "product 1 " , "product 2"].map((product) => product)}
        </div>

      <FooterBanner/>
    
    </>
  )
}

export default index