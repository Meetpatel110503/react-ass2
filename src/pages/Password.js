import dcrypt from "dcryptjs"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import { useDispatch, useSelector } from "react-redux"
import { updateUser } from "../redux/action/userSlice"
import { useNavigate } from "react-router-dom"

const Password = () => {
  const { register, handleSubmit } = useForm()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const existingUsers = useSelector((store) => store.userSignUp.userSignUp)
  const users = useSelector((store) => store.user.user)

  const onSubmit = (data) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,32}$/

    if (!passwordRegex.test(data.newpassword)) {
      toast.error(
        "Password must be 8-32 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character."
      )
      return
    }
    if (data.newpassword === data.cnewpassword) {
      if (dcrypt.compare(data.password, existingUsers[0].password)) {
        if (!dcrypt.compare(data.newpassword, existingUsers[0].password)) {
          const newpassword = dcrypt.hash(data.newpassword)
          const updatedPass = users.map((u) => {
            if (u.email === existingUsers[0].email) {
              return {
                ...u,
                fname: u.fname,
                lname: u.lname,
                email: u.email,
                number: u.number,
                password: newpassword,
              }
            }
            return u
          })
          dispatch(updateUser(updatedPass))
          toast.success("password updated successfully")
          navigate("/profile")
        } else {
          toast.error("Password is already taken.")
        }
      } else {
        toast.error("current password is incorrect.")
      }
    } else {
      toast.error("New password and Confirm new password are not match.")
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='max-w-sm mx-auto  mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 p-4 m-4'>
        <h4 className='text-2xl font-bold dark:text-whit pb-3 text-center'>
          Reset Password
        </h4>

        <div className='mb-3'>
          <label
            for='password'
            className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
          >
            Current Password
          </label>
          <input
            type='password'
            id='password'
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 '
            placeholder='Current password'
            {...register("password")}
            required
          />
        </div>
        <div className='mb-3'>
          <label
            for='password'
            className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
          >
            New Password
          </label>
          <input
            type='password'
            id='newpassword'
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 '
            placeholder='New Password'
            {...register("newpassword")}
            required
          />
        </div>
        <div className='mb-3'>
          <label
            for='cpassword'
            className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
          >
            Confirm New Password
          </label>
          <input
            type='password'
            id='cnewpassword'
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 '
            placeholder='Confirm new password'
            {...register("cnewpassword")}
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

export default Password
