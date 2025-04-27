import { useEffect } from "react"
import { useParams } from "react-router-dom"
import ArticleService from "../service/article"
import { useDispatch, useSelector } from "react-redux"
import { getArticleDetailFailure, getArticleDetailStart, getArticleDetailSuccess } from "../slice/article"
import moment from "moment"
import { Loader } from "../ui"

const ArticleDetail = () => {
    const {slug} = useParams()
    const dispatch = useDispatch()
    const {articleDetail, isLoading} = useSelector(state => state.article)

    const getArticleDetail = async () => {
        dispatch(getArticleDetailStart())
        try {
            const response = await ArticleService.getArticleDetail(slug)
            dispatch(getArticleDetailSuccess(response.article))
        } catch (error) {
            dispatch(getArticleDetailFailure())
        }
    }
    useEffect(()=>{
        getArticleDetail()
    },[slug])
    
    return articleDetail !== null ? (
        <div className="p-5 mb-4 bg-body-tertiary rounded-3">
            
            <div className="container-fluid py-5">
                <h1 className="display-5 fw-bold">{articleDetail.title}</h1>
                <p className="col-md-8 fs-4">{articleDetail.description}</p>
                <p className="text-muted"> <span className="fw-bold">Created at:</span> {moment(articleDetail.createdAt).format("DD MMM, YYYY")}</p>
                <div>{articleDetail.body}</div>
                <div className="card mb-3"  style={{maxWidth:'540px'}}>
                    <div className="row g-0">
                        <div className="col-md-8">
                            <div className="card-body">
                                <h5 className="card-title">{articleDetail.author.username}</h5>
                                <p className="card-text">{articleDetail.author.bio}</p>
                            </div>
                        </div>
                        <div className="col-md-4 bg-secondary d-flex justify-content-center align-items-center">
                            {/* <img src="..." className="img-fluid rounded-start" alt="..."/> */}
                            <h1>{articleDetail.author.username[0]}</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ) : (isLoading && <Loader/>)
}

export default ArticleDetail
