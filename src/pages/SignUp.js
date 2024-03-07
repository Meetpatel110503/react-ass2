import dcrypt from "dcryptjs"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import { useDispatch, useSelector } from "react-redux"
import { setUser } from "../redux/action/userSlice"
import { addUser } from "../redux/action/currrentUserSlice"
import { Link, useNavigate } from "react-router-dom"

const SignUp = () => {
  const { register, handleSubmit } = useForm()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const users = useSelector((store) => store.user.user)

  const onSubmit = (data) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,32}$/

    if (!passwordRegex.test(data.password)) {
      toast.error(
        "Password must be 8-32 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character."
      )
      return
    }

    const emailExists = users.some((user) => user.email === data.email)
    if (emailExists) {
      toast.error("Email already exists")
      return
    }

    const password = dcrypt.hash(data.password)
    const cpassword = dcrypt.compare(data.cpassword, password)
    if (!cpassword) {
      toast.error("Passwords is not match.Try again...")
      return
    }
    const userIs = {
      fname: data.fname,
      lname: data.lname,
      email: data.email,
      number: data.number,
      password: password,
    }
    dispatch(setUser(userIs))
    navigate("/login")
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='max-w-sm mx-auto  mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 p-4 m-4'>
        <h4 className='text-2xl font-bold dark:text-whit pb-3 text-center'>
          Sign Up Form
        </h4>
        <div className='mb-3'>
          <label
            for='fname'
            className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
          >
            First Name
          </label>
          <input
            type='text'
            id='fname'
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
            placeholder='first name'
            required
            {...register("fname")}
          />
        </div>
        <div className='mb-3'>
          <label
            for='lname'
            className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
          >
            Last Name
          </label>
          <input
            type='text'
            id='lname'
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
            placeholder='last name'
            {...register("lname")}
            required
          />
        </div>
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
            for='number'
            className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
          >
            Mobile Number
          </label>
          <input
            type='number'
            id='number'
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
            placeholder='mobile number'
            {...register("number")}
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
        <div className='mb-3'>
          <label
            for='cpassword'
            className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
          >
            Confirm Password
          </label>
          <input
            type='password'
            id='cpassword'
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 '
            placeholder='confirm password'
            {...register("cpassword")}
            required
          />
        </div>
        <div className='flex items-start mb-3'>
          <div className='flex items-center h-5'>
            <input
              id='remember'
              type='checkbox'
              value=''
              className='w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300'
              required
            />
          </div>
          <label
            for='remember'
            className='ms-2 text-sm font-medium text-gray-900 dark:text-gray-300'
          >
            Remember me
          </label>
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
            You already have an account? <Link to='/login'>log in</Link>
          </p>
        </div>
      </div>
    </form>
  )
}

export default SignUp
