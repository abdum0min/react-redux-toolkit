import { useState } from 'react'
import { Input } from '../ui'
import { useDispatch, useSelector } from 'react-redux'
import { loginUserStart } from '../slice/auth'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const {isLoading} = useSelector(state => state.auth)

  const loginHandler = e => {
    e.preventDefault()
    dispatch(loginUserStart())
  }

  return (
    <main className="form-signin w-25 m-auto mt-5">
      <form>
        <h1 class="h3 mb-3 fw-normal">Please login</h1>
        <Input label={'Email Adress'} state={email} setState={setEmail} />
        <Input label={'Password'} state={password} setState={setPassword} type={'password'} />
        <button class="btn btn-primary w-100 py-2  mt-2" disabled={isLoading} onClick={loginHandler} type="submit">{isLoading ? 'loading...' : 'login'}</button>
        <p class="mt-5 mb-3 text-body-secondary">© 2017–2025</p>
      </form>
    </main>
  )
}

export default Login
