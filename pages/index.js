import React from 'react'
import { Product, FooterBanner, HeroBanner } from '../components'
import {client} from "../lib/client";

const Home = ({ products, bannerData }) => {
  console.log({bannerData});
  return (
    <>
      <HeroBanner herroBanner={bannerData.length > 0 && bannerData[0]} />
      <div className='products-heading'>
        <h2>Best seling products</h2>
        <p>Speakers of many variations</p>

      </div>
      <div className='products-container'>
        {products.map((product, idx) => (
          <Product key={idx} product={product} />
        ))}
      </div>
      <FooterBanner footerBanner={bannerData && bannerData[0]} />
    </>
  )
}

export const getServerSideProps = async () => {
  const query = '*[_type == "product"]'
  const products = await client.fetch(query)

  const bannerQuery = '*[_type == "banner"]'
  const bannerData = await client.fetch(bannerQuery)

  return {
    props: {
      products,
      bannerData
    }
  }
}

export default Home