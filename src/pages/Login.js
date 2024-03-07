import dcrypt from "dcryptjs"
import { Link, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import { useDispatch, useSelector } from "react-redux"
import { addUser } from "../redux/action/currrentUserSlice"

const Login = () => {
  const { register, handleSubmit } = useForm()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const userIs = useSelector((store) => store.user.user)

  const onSubmit = (data) => {
    const existingUser = userIs.find((user) => user.email === data.email)

    if (existingUser) {
      const passwordMatch = dcrypt.compare(data.password, existingUser.password)

      if (passwordMatch) {
        dispatch(addUser(existingUser))
        navigate("/productlist")
        toast.success("Login successful!")
      } else {
        toast.error("Incorrect password.")
      }
    } else {
      toast.error("User not found. Please sign up first.")
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='max-w-sm mx-auto  mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 p-4 m-4'>
        <h4 className='text-2xl font-bold dark:text-whit pb-3 text-center'>
          Login Form
        </h4>
        <div className='mb-3'>
          <label
            for='email'
            className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
          >
            Email
          </label>
          <input
            type='email'
            id='email'
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
            placeholder='email'
            {...register("email")}
            required
          />
        </div>
        <div className='mb-3'>
          <label
            for='password'
            className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
          >
            Password
          </label>
          <input
            type='password'
            id='password'
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 '
            placeholder='password'
            {...register("password")}
            required
          />
        </div>

        <input
          type='submit'
          className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 align-center'
        ></input>
        <div className='flex items-start p-3'>
          <p
            for='remember'
            className='ms-2 text-sm font-medium text-gray-900 dark:text-gray-300'
          >
            You don't have an account? <Link to='/signup'>Sign Up</Link>
          </p>
        </div>
      </div>
    </form>
  )
}

export default Login
