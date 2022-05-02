import React, {useState} from 'react'
import { urlFor, client } from '../../lib/client'
import { AiOutlineMinus, AiOutlinePlus, AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { Product } from '../../components';
import {useStateContext} from "../../context/StateContext";

const ProductDetails = ({ product, products }) => {
    const { image, name, details, price } = product;
    const [index, setIndex] = useState(0)
    const {incQty,decQty,qty, onAdd} = useStateContext();
  return (
      <div>
          <div className="product-detail-container">
              <div>
                  <div className="image-container">
                      <img src={urlFor(image  && image[index])} alt="" className='product-detail-image' />
                  </div>
                  <div className="small-images-container">
                      {image?.map((item, idx) =>(
                      <img key={idx} onMouseEnter={()=>setIndex(idx)} src={ urlFor(item)} alt="" className={idx===index? 'small-image selected-image': 'small-image' } />
                      ))}
                  </div>
              </div>
              <div className="product-detail-desc">
                  <h1>{name}</h1>
                  <div className="reviews">
                      <div>
                          <AiFillStar />
                          <AiFillStar />
                          <AiFillStar />
                          <AiFillStar />
                          <AiOutlineStar />
                      </div>
                      <p>(20)</p>
                  </div>
                  <h4>Details: </h4>
                  <p>{details}</p>
                  <p className="price">${price}</p>
                  <div className="quantity">
                      <h3>Quantity: </h3>
                      <p className="quantity-desc">
                          <span className="minus" onClick={decQty}>
                              <AiOutlineMinus />
                          </span>
                          <span className="num" >
                              {qty}
                          </span>
                          <span className="plus" onClick={incQty}>
                              <AiOutlinePlus />
                          </span>
                      </p>
                  </div>
                  <div className="buttons">
                      <button onClick={()=> onAdd(product, qty)} type='button' className='add-to-cart'>
                          add To cart
                      </button>
                      <button type='button' className="buy-now">Buy now</button>
                  </div>
              </div>
          </div>

          <div className="maylike-products-wrapper">
              <h2>You may also like</h2>
              <div className="marquee">
                  <div className='maylike-products-container track'>
                      {products.map((product, idx) => (
                            <Product key={idx} product={product} />
                        ))}
                  </div>
              </div>
          </div>
    </div>
  )
}


export const getStaticPaths = async () => { 
    const query = `*[_type == "product"]{
        slug {
            current
        }
    }`
    const products = await client.fetch(query)
    const paths = products.map(product => ({
        params: {
            slug: product.slug.current
        }
    }))

    return {
        paths,
        fallback: 'blocking'
   }
} 


export const getStaticProps = async ({params: {slug}}) => {
    const query = `*[_type == "product" && slug.current == "${slug}"][0]`
    const productsQuery = `*[_type == "product"]`

    const product = await client.fetch(query)
    const products = await client.fetch(productsQuery)
    return {
        props:{product,products}
    }
}

export default ProductDetails