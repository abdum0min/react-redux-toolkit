import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import ArticleService from '../service/article'

const ArticleCard = ({item, getArticles}) => {
    const navigate = useNavigate()
    const {loggedin, user} = useSelector(state => state.auth)

    const deleteArticle = async slug => {
        try {
            await ArticleService.deleteArticle(slug)
            getArticles()
        } catch (error) {
            console.log(error)
        } 
    }

    return (
        <div className="col">
            <div className="card h-100 shadow-sm">
                <svg className="bd-placeholder-img card-img-top" width="100%" height="225" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c"></rect></svg>
                <div className="card-body">
                    <p className="card-text fw-bold m-0">{item.title}</p>
                    <p className="card-text ">{item.description}</p>
                </div>
                <div className="d-flex justify-content-between align-items-center card-footer">
                    <div className="btn-group">
                        <button onClick={()=>navigate(`/article/${item.slug}`)} type="button" className="btn btn-sm btn-outline-success ">View</button>
                        {loggedin && user.username === item.author.username && (
                        <>
                        <button type="button" className="btn btn-sm btn-outline-danger" onClick={()=>deleteArticle(item.slug)}>Delete</button>
                        <button type="button" className="btn btn-sm btn-outline-secondary" onClick={()=>navigate(`/edit-article/${item.slug}`)}>Edit</button>
                        </>
                        )}
                    </div>
                    <small className="text-body-secondary fw-bold text-capitalize">{item.author.username}</small>
                </div>
            </div>
        </div>
    )
}

export default ArticleCard
