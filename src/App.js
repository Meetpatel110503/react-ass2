import "../src/assets/App.css"
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import "bootstrap/dist/css/bootstrap.min.css"
import SignUp from "./pages/SignUp"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Navbar from "./pages/Navbar"
import Profile from "./pages/Profile"
import EditProfile from "./pages/EditProfile"
import ProductListing from "./pages/ProductListing"
import ViewProduct from "./pages/ViewProduct"
import Password from "./pages/Password"
import Loader from "./components/Loader"

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/login' element={<Login />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/editprofile' element={<EditProfile />} />
          <Route path='/productlist' element={<ProductListing />} />
          <Route path='/productlist/:id' element={<ViewProduct />} />
          <Route path='/editpassword' element={<Password />} />
          <Route path='/loader' element={<Loader />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer
        position='top-center'
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='colored'
      />
    </div>
  )
}

export default App
