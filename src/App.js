import {Routes, Route} from 'react-router-dom'
import {Main, Login, Register, Navbar, ArticleDetail, CreateArticle} from './components/'
import { useEffect } from 'react'
import AuthService from './service/auth'
import { useDispatch } from 'react-redux'
import { signUserFailure, signUserSuccess } from './slice/auth'
import { getItem } from './helpers/persistance-storage'
import ArticleService from './service/article'
import { getArticlesFailure, getArticlesStart, getArticlesSuccess } from './slice/article'


const App = () => {
  const dispatch = useDispatch()


  const getUser = async() =>{
    try {
      const response = await AuthService.getUser()
      dispatch(signUserSuccess(response.user))
    } catch (error) {
      dispatch(signUserFailure())
    }
  }



  useEffect(()=>{
    const token = getItem('token')
    if(token){
      getUser()
    }
  }, [])

  return (
    <div>
      <Navbar/>
      <div className='container'>
        <Routes>
          <Route path='/' element={<Main/>} />
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>} />
          <Route path='/article/:slug' element={<ArticleDetail/>} />
          <Route path='/create-article' element={<CreateArticle/>} />
        </Routes>
      </div>
    </div>
  )
}

export default App

