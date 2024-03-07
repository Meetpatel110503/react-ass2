import axios from "axios"
import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { GrFormNextLink } from "react-icons/gr"
import { GrFormPreviousLink } from "react-icons/gr"
import Loader from "../components/Loader"
import { toast } from "react-toastify"

const ProductListing = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const limit = 8

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        const response = await axios.get(
          `https://dummyjson.com/products?skip=${
            (currentPage - 1) * limit
          }&limit=${limit}`
        )
        setProducts(response.data.products)
      } catch (error) {
        toast.error("error")
      }
      setLoading(false)
    }
    fetchProducts()
  }, [currentPage])

  return (
    <div>
      <div className='flex flex-wrap justify-center'>
        {loading ? (
          <Loader />
        ) : (
          products &&
          products.length > 0 &&
          products.map((product) => (
            <div className='card m-3' style={{ width: "20rem" }}>
              <img
                className='card-img-top h-56'
                src={product.thumbnail}
                alt='Card image cap'
              />

              <div className='card-body'>
                <h5 className='card-title'>{product.title}</h5>
                <p className='text-gray-600 text-base mb-2'>
                  {product.category}
                </p>
                <p className='text-gray-600 text-base mb-2'>
                  Brand: {product.brand}
                </p>
                <p className='text-gray-600 text-base mb-2'>
                  Rating: {product.rating}
                </p>
                <p className='text-gray-600 text-base mb-2'>
                  Price: {product.price}
                </p>
                <p className='text-gray-600 text-base mb-2'>
                  Discount: {product.discountPercentage}%
                </p>

                <Link
                  to={`/productlist/${product.id}`}
                  className='btn btn-primary'
                >
                  View Product
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
      <div className='m-8 p-3'>
        {currentPage === 1 ? (
          <></>
        ) : (
          <button
            style={{ float: "left" }}
            onClick={() =>
              setCurrentPage(() => setCurrentPage(currentPage - 1))
            }
            disabled={currentPage === 1}
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4'
          >
            <span className='flex'>
              <GrFormPreviousLink />
              Previous
            </span>
          </button>
        )}
        {currentPage === 10 ? (
          <></>
        ) : (
          <button
            style={{ float: "right" }}
            onClick={() => setCurrentPage(currentPage + 1)}
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
          >
            <span className='flex'>
              {" "}
              Next
              <GrFormNextLink />
            </span>
          </button>
        )}
      </div>
    </div>
  )
}

export default ProductListing
