import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { logo } from '../constants'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../slice/auth'

const Navbar = () => {
  const {loggedin, user} = useSelector(state => state.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const logoutHandler = () => {
    dispatch(logoutUser())
    navigate('/login')
  }

  return (
    <div className="d-flex flex-column flex-md-row align-items-center pb-3 mb-4 border-bottom container pt-3">
    <Link to={'/'}>
        <img src={logo} width={200} height={100} alt="" />
    </Link>

    <nav className="d-inline-flex mt-2 mt-md-0 ms-md-auto">
      {loggedin ? (
        <>
          <p className='me-3 m-0 py-2 link-body-emphasis text-decoration-none'>{user.username}</p>
          <Link to={'/create-article'} className='me-3 py-2 link-body-emphasis text-decoration-none'>
            Create Article
          </Link>
          <button className='btn btn-outline-danger' onClick={logoutHandler}>Logout</button>
        </>
      ) : (
        <>
        <Link to={'/login'} className='me-3 py-2 link-body-emphasis text-decoration-none'>
            Login
        </Link>
        <Link to={'/register'} className='py-2 link-body-emphasis text-decoration-none'>
            Register
        </Link>
        </>
      )}
    </nav>
  </div>
  )
}

export default Navbar
