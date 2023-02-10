import React , {useRef} from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { useStateContext } from '../context/stateContext';
import { AiOutlineLeft, AiOutlineMinus, AiOutlinePlus, AiOutlineShopping } from 'react-icons/ai';
import { urlFor } from '../lib/client';
import {TiDeleteOutline} from "react-icons/ti";
import getStripe from '../lib/getStripe';
import Stripe from 'stripe';


function Card() {
  const cardRef = useRef();
  const {totalPrice , cartItems , showCart ,
     setShowCart ,
     totalQuantities ,
     toggleCartItemQuanitity,
     OnRemove
    } = useStateContext();

    const handleCheckout = async () =>{
      console.log("cartItems: ",cartItems)

      const stripe = await getStripe();

      const response = await fetch("/api/stripe" , {
        method:"POST",
        headers:{
          'Content-Type': 'application/json',
        },
        body:JSON.stringify(cartItems),
        // body:JSON.stringify({hello:"hello"}),
        // body:{hello:"hello"},
      });

      // console.log(response.body)

      if(response.status === "500") return;

      const data = await response.json();

      toast.loading("Redirecting...");

      console.log("data" ,data.body);

      stripe.redirectToCheckout({ sessionId: data.id });
    }

  return (
    <div className='cart-wrapper' ref={cardRef}>
      <div className="cart-container">
        <button type='button' className='cart-heading'
        onClick={()=>setShowCart(false)}>
          <AiOutlineLeft/>
          <span className='heading'>Your Cart</span>
          <span className='cart-num-items'>({totalQuantities} items)</span>
        </button>
        {cartItems.length < 1 && (
          <div className="empty-cart">
            <AiOutlineShopping size={150}/>
            <h3>Your shopping bag is empty</h3>
            <Link href="/">
              <button type='button'
               onClick={() => setShowCart(false)}
               className="btn"
               >
                continue Shoping
              </button>
            </Link>
          </div>
        )}
        <div className="product-container">
          {cartItems.length >= 1 && cartItems.map((item)=>(
            <div className="product" key={item._id}>
              <img src={urlFor(item?.image[1])} className="cart-product-image" alt="" />
              <div className="item-desc">
                <div className="flex top">
                  <h5>{item.name}</h5>
                  <h5>${item.price}</h5>
                </div>
                <div className="flex bottom">
                  <div>
                  <p className="quantity-desc">
                        <span className='minus' onClick={()=> toggleCartItemQuanitity(item._id , "dec")}><AiOutlineMinus/></span>
                        <span className='num' onClick="">{item.quantity}</span>
                        <span className='plus' onClick={()=> toggleCartItemQuanitity(item._id , "inc")}><AiOutlinePlus/></span>
                    </p>
                  </div>
                  <button type="button" 
                  className='remove-item' onClick={()=> OnRemove(item)}>
                    <TiDeleteOutline/>
                  </button>
                </div>
              </div>
            </div>
          ))}
          {cartItems.length >= 1 && (
            <div className="cart-bottom">
              <div className="total">
                <h3>Subtotal:</h3>
                <h3>${totalPrice}</h3>
              </div>
              <div className="btn-container">
              <button type="button" className="btn" onClick={handleCheckout}>
                Pay with Stripe
              </button>
            </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Card;