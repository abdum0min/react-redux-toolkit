import React, { useEffect, useState } from 'react'
import ArticleForm from './article-form'
import { useDispatch } from 'react-redux'
import { getArticleDetailFailure, getArticleDetailStart, getArticleDetailSuccess, postArticleFailure, postArticleStart, postArticleSuccess } from '../slice/article'
import ArticleService from '../service/article'
import { useNavigate, useParams } from 'react-router-dom'

const EditArticle = () => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [body, setBody] = useState('')
    const dispatch = useDispatch()
    const {slug} = useParams()
    const navigate = useNavigate()

    useEffect(()=>{
        const getArticleDetail = async () => {
        dispatch(getArticleDetailStart())
        try {
            const response = await ArticleService.getArticleDetail(slug)
            setTitle(response.article.title)
            setDescription(response.article.description)
            setBody(response.article.body)
            dispatch(getArticleDetailSuccess(response.article))
        } catch (error) {
            dispatch(getArticleDetailFailure())
        }
    }
    getArticleDetail()
    }, [])

    const formSubmit = async (e) => {
        e.preventDefault()
        dispatch(postArticleStart())
        const article = {title, description, body}
        try {
            await ArticleService.editArticle(slug, article)
            dispatch(postArticleSuccess())
            navigate('/')
        } catch (error) {
            dispatch(postArticleFailure())
        }
    }

    const formProps = {title, setTitle, description, setDescription, body, setBody, formSubmit}

    return (
        <div className='text-center'>
            <h1 className=' fs-2'>Edit article</h1>
            <div className='w-75 mx-auto'>
                <ArticleForm {...formProps} />
            </div>
        </div>
    )
}

export default EditArticle
