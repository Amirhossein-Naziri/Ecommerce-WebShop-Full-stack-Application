import React from 'react'
import Link from 'next/link'
import {AiFillInstagram , AiFillTwitterCircle , AiFillFacebook} from "react-icons/ai"

const Footer = () => {
  return (
    <div className='footer-container'>
      <p>2023 My webshop All rights reserved</p>
      <p className='icons'>
        <AiFillFacebook/>
        <AiFillInstagram/>
        <AiFillTwitterCircle/>
      </p>
    </div>
  )
}

export default Footer