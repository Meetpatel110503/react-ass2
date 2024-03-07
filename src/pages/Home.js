import React from "react"
import { Link } from "react-router-dom"
import AOS from "aos"
import "aos/dist/aos.css"
AOS.init({
  duration: 3000,
})

function LandingScreen() {
  return (
    <div className='justify-center items-center h-screen'>
      <div className='text-center'>
        <h2 data-aos='zoom-in' className='mb-4 text-center'>
          <img
            src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8fGy2AvJnE1yPJ0FppDwWViwXvB99DiLewoI5kkpOcaxzwdGdt6oaexoB8RmzFWxqOoY&usqp=CAU'
            alt='image not found'
            style={{ height: "300px", width: "300px", marginInline: "auto" }}
          />
          MK SHOPPING
        </h2>
        <h4 data-aos='zoom-out' className=' mb-4'>
          There is only one boss. The Customer.
        </h4>
        <p className='mb-4'>
          We compare prices from 100s of sites. We’ll do the searching. You do
          the saving.
        </p>
        <Link to='/productlist'>
          <button className='btn btn-primary'>Go to shopping</button>
        </Link>
      </div>
    </div>
  )
}

export default LandingScreen
