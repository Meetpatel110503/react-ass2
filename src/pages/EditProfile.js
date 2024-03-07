import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import { useDispatch, useSelector } from "react-redux"
import { addUser } from "../redux/action/currrentUserSlice"
import { useNavigate } from "react-router-dom"
import { updateUser } from "../redux/action/userSlice"

const EditProfile = () => {
  const { register, handleSubmit } = useForm()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector((store) => store.userSignUp.userSignUp)
  const alluser = useSelector((store) => store.user.user)

  const onSubmit = (data) => {
    const emailExists = alluser.some((user) => user.email === data.email)
    if (emailExists && emailExists.email !== user[0].email) {
      toast.error("Email already exists")
      return
    } else {
      const updatedAllUsers = alluser.map((u) => {
        if (u.email === user[0].email) {
          return {
            ...u,
            fname: data.fname,
            lname: data.lname,
            email: data.email,
            number: data.number,
          }
        }
        return u
      })
      dispatch(updateUser(updatedAllUsers))
    }

    const updatedUser = {
      ...user[0],
      fname: data.fname,
      lname: data.lname,
      email: data.email,
      number: data.number,
    }

    dispatch(addUser(updatedUser))
    toast.success("profile updated successfully")
    navigate("/profile")
  }
  if (user.length === 0) {
    navigate("/login")
  } else {
    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='max-w-sm mx-auto  mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 p-4 m-4'>
          <h4 className='text-2xl font-bold dark:text-whit pb-3 text-center'>
            Edit Profile
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
              placeholder={user[0].fname}
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
              placeholder={user[0].lname}
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
              placeholder={user[0].email}
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
              placeholder={user[0].number}
              {...register("number")}
              required
            />
          </div>
          <input
            type='submit'
            className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 align-center'
          ></input>
        </div>
      </form>
    )
  }
}

export default EditProfile
