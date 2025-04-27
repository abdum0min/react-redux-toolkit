import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Loader } from '../ui'
import { useNavigate } from 'react-router-dom'
import { getArticlesFailure, getArticlesStart, getArticlesSuccess } from '../slice/article'
import ArticleService from '../service/article'


const Main = () => {
  const {articles, isLoading} = useSelector(state => state.article)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const getArticles = async () => {
    dispatch(getArticlesStart())
    try {
      const response = await ArticleService.getArticles()
      console.log(response)
      dispatch(getArticlesSuccess(response.articles))
    } catch (error) {
      dispatch(getArticlesFailure(error))
    }
  }

  useEffect(()=>{
    getArticles()
  }, [])

  return (
    <div className="album py-5">
      <div>
        {isLoading && <Loader/>}
        
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
          {articles.map(item => (
            <div className="col" key={item.id}>
              <div className="card h-100 shadow-sm">
                <svg className="bd-placeholder-img card-img-top" width="100%" height="225" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c"></rect></svg>
                <div className="card-body">
                  <p className="card-text fw-bold m-0">{item.title}</p>
                  <p className="card-text ">{item.description}</p>
                </div>
                  <div className="d-flex justify-content-between align-items-center card-footer">
                    <div className="btn-group">
                      <button onClick={()=>navigate(`/article/${item.slug}`)} type="button" className="btn btn-sm btn-outline-success ">View</button>
                      <button type="button" className="btn btn-sm btn-outline-secondary">Edit</button>
                      <button type="button" className="btn btn-sm btn-outline-danger">Delete</button>
                    </div>
                    <small className="text-body-secondary fw-bold text-capitalize">{item.author.username}</small>
                  </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Main
