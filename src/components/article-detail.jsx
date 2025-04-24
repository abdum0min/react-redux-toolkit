import { useEffect } from "react"
import { useParams } from "react-router-dom"
import ArticleService from "../service/article"
import { useDispatch } from "react-redux"
import { getArticleDetailFailure, getArticleDetailStart, getArticleDetailSuccess } from "../slice/article"

const ArticleDetail = () => {
    const {slug} = useParams()
    const dispatch = useDispatch(state => state.article)

    const getArticleDetail = async () => {
        dispatch(getArticleDetailStart())
        try {
            const response = await ArticleService.getArticleDetail(slug)
            dispatch(getArticleDetailSuccess(response.article))
            console.log(response)
        } catch (error) {
            dispatch(getArticleDetailFailure())
        }
    }
    useEffect(()=>{
        getArticleDetail()
    },[slug])
    return (
        <div>
            ArticleDetail {slug}
        </div>
    )
}

export default ArticleDetail
