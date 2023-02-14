import React , {useEffect , useState} from 'react';
import Link from 'next/link';
import {BsBagCheckFill} from "react-icons/bs";
import { useRouter } from 'next/router';
import { useStateContext } from '../context/stateContext';
import { runFirewoks } from '../lib/utils';


const success = () => {
    const {setCartItems , setTotalPrice , setTotalQuantities} = useStateContext();
    const [ order, setOrder] = useState(null)

    useEffect(()=>{
      localStorage.clear();
      setCartItems([]);
      setTotalPrice(0)
      setTotalQuantities(0);
      runFirewoks();
    } , [])

  return (
    <div className='success-wrapper'>
        <div className='success'>
            <p className='icon'>
                <BsBagCheckFill/>
            </p>
            <h2>Thanks for your order!</h2>
            <p className="email-msg">Check your email inbox for the receipt.</p>
            <p className="description">if you have any qeustion , please email
            <a className='email' href="mailto:order@examle.com">
              san800000@gmail.com
            </a>
            </p>
            <Link href="/">
               <button type='button' className="btn" width="300px">
                Continue Shopping
               </button>
            </Link>
        </div>
    </div>
  )
}

export default success