import React, { useState } from 'react'
import { Input } from '../ui'
import { useDispatch, useSelector } from 'react-redux'
import { signUserFailure, signUserStart, signUserSuccess } from '../slice/auth'
import AuthService from '../service/auth'
import {ValidationError} from './'

const Register = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const {isLoading} = useSelector(state => state.auth)

  const registerHandler = async (e) => {
    e.preventDefault()
    dispatch(signUserStart())
    const user = {username: name, email, password}
    try{
      const response = await AuthService.userRegister(user)
      dispatch(signUserSuccess(response.user))
    } catch (error) {
      dispatch(signUserFailure(error.response.data.errors))
    }
  }

  return (
    <main className="form-signin w-25 m-auto mt-5">
      <form>
        <h1 className="h3 mb-3 fw-normal">Please register</h1>
        <ValidationError/>
        <Input label={'Username'} state={name} setState={setName}/>
        <Input label={'Email Adress'} state={email} setState={setEmail} />
        <Input label={'Password'} state={password} setState={setPassword} type={'password'} />
        <button className="btn btn-primary w-100 py-2  mt-2" disabled={isLoading} onClick={registerHandler} type="submit">{isLoading ? 'loading...' : 'register'}</button>
        <p className="mt-5 mb-3 text-body-secondary">© 2017–2025</p>
      </form>
    </main>
  )
}

export default Register
