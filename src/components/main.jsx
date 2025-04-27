import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Loader } from '../ui'
import { getArticlesFailure, getArticlesStart, getArticlesSuccess } from '../slice/article'
import ArticleService from '../service/article'
import ArticleCard from './article-card'


const Main = () => {
  const {articles, isLoading} = useSelector(state => state.article)
  const dispatch = useDispatch()

  const getArticles = async () => {
    dispatch(getArticlesStart())
    try {
      const response = await ArticleService.getArticles()
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
            <ArticleCard key={item.id} item={item} getArticles={getArticles}/>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Main
