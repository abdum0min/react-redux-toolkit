import React, { useState } from 'react'
import { Input } from '../ui'

const Register = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <main className="form-signin w-25 m-auto mt-5">
      <form>
        {/* <img class="mb-4" src="/docs/5.3/assets/brand/bootstrap-logo.svg" alt="" width="72" height="57"/> */}
        <h1 class="h3 mb-3 fw-normal">Please register</h1>
        <Input label={'Username'} state={name} setState={setName}/>
        <Input label={'Email Adress'} state={email} setState={setEmail} />
        <Input label={'Password'} state={password} setState={setPassword} type={'password'} />
        <button class="btn btn-primary w-100 py-2  mt-2" type="submit">Register</button>
        <p class="mt-5 mb-3 text-body-secondary">© 2017–2025</p>
      </form>
    </main>
  )
}

export default Register
