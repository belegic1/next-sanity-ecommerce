import Link from 'next/link'
import React from 'react'
import { urlFor } from '../lib/client';

const HeroBanner = ({herroBanner }) => {
  console.log({herroBanner});
  return (
    <div className="hero-banner-container">
      <div>
        <p className="beats-solo">
          {herroBanner.smallText}
        </p>
        <h3>{herroBanner.midText}</h3>
        <h1>{ herroBanner.largeText1}</h1>
        <img src={urlFor(herroBanner.image)} alt="headphones" className='hero-banner-image' />
        <div>
          <Link href={`/product/${herroBanner.product}`}>
            <button type='button'>{herroBanner.buttonText }</button>
          </Link>
          <div className="desc">
            <h5>Description</h5>
            <p>{ herroBanner.desc}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroBanner