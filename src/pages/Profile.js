import { useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"

const Profile = () => {
  const user = useSelector((store) => store.userSignUp.userSignUp)
  const navigate = useNavigate()

  return (
    <>
      <div className='flex'>
        <div className='max-w-sm mx-auto  mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 p-4 m-4'>
          <p className='text-2xl font-bold dark:text-whit pb-3 text-center'>
            My Profile
          </p>
          <img
            src='https://media.istockphoto.com/id/1393750072/vector/flat-white-icon-man-for-web-design-silhouette-flat-illustration-vector-illustration-stock.jpg?s=612x612&w=0&k=20&c=s9hO4SpyvrDIfELozPpiB_WtzQV9KhoMUP9R9gVohoU='
            alt='image not found'
            style={{
              height: "90px",
              width: "90px",
              marginInline: "auto",
            }}
            className='p-2 mb-2 border rounded-md'
          />
          <div className='p-2'>
            <p>First Name: {user[0].fname}</p>
            <p>Last Name: {user[0].lname}</p>
            <p>Email: {user[0].email}</p>
            <p>Mobile Number: {user[0].number}</p>
          </div>
          <button
            className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 align-center'
            type='submit'
            onClick={() => navigate("/editprofile")}
          >
            Edit Profile
          </button>
          <div className='flex items-start p-1'>
            <p
              for='remember'
              className='ms-2 text-sm font-medium text-gray-900 dark:text-gray-300 m-2'
            >
              Change password? <Link to='/editpassword'>password</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
export default Profile
