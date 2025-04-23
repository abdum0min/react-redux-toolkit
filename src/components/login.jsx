import { useEffect, useState } from 'react'
import { Input } from '../ui'
import { useDispatch, useSelector } from 'react-redux'
import { signUserFailure, signUserStart, signUserSuccess } from '../slice/auth'
import AuthService from '../service/auth'
import {ValidationError} from './'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const {isLoading, loggedin} = useSelector(state => state.auth)
  const navigate = useNavigate()

  const loginHandler = async (e) => {
    e.preventDefault()
    dispatch(signUserStart())
    const user = {email, password}
    try {
      const response = await AuthService.userLogin(user)
      dispatch(signUserSuccess(response.user))
      navigate('/')
    } catch (error) {
      dispatch(signUserFailure(error.response.data.errors))
    }
  }

    useEffect(() => {
      if(loggedin){
        navigate('/')
      } 
    }, [])

  return (
    <main className="form-signin w-25 m-auto mt-5">
      <form>
        <h1 className="h3 mb-3 fw-normal">Please login</h1>
        <ValidationError/>
        <Input label={'Email Adress'} state={email} setState={setEmail} />
        <Input label={'Password'} state={password} setState={setPassword} type={'password'} />
        <button className="btn btn-primary w-100 py-2  mt-2" disabled={isLoading} onClick={loginHandler} type="submit">{isLoading ? 'loading...' : 'login'}</button>
        <p className="mt-5 mb-3 text-body-secondary">© 2017–2025</p>
      </form>
    </main>
  )
}

export default Login
