import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import { Link } from "react-router-dom"
import Carousel from "react-bootstrap/Carousel"
import Loader from "../components/Loader"

const ViewProduct = () => {
  const { id } = useParams()
  const [product, setProduct] = useState(null)

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await axios.get(`https://dummyjson.com/products/${id}`)
      setProduct(response.data)
    }

    fetchProduct()
  }, [id])

  if (!product) {
    return <Loader />
  }

  return (
    <div className='card m-3 w-80'>
      <Carousel prevLabel='' nextLabel=''>
        {product.images.map((url) => {
          return (
            <Carousel.Item>
              <img className='d-block bigimg' src={url} alt='First slide' />
            </Carousel.Item>
          )
        })}
      </Carousel>

      <div className='card-body'>
        <h5 className='card-title'>{product.title}</h5>
        <p className='text-gray-600 text-base mb-2'>
          Discription:{product.description}
        </p>
        <p className='text-gray-600 text-base mb-2'>Brand: {product.brand}</p>
        <p className='text-gray-600 text-base mb-2'>
          category: {product.category}
        </p>
        <p className='text-gray-600 text-base mb-2'>Rating: {product.rating}</p>
        <p className='text-gray-600 text-base mb-2'>Price: {product.price}</p>
        <p className='text-gray-600 text-base mb-2'>
          Discount: {product.discountPercentage}%
        </p>
        <Link to={`/productlist`} className='btn btn-primary'>
          Go to shopping list
        </Link>
      </div>
    </div>
  )
}

export default ViewProduct
