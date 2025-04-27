import { useSelector } from "react-redux"
import { Input, TextArea } from "../ui"


const ArticleForm = (props) => {
    const {isLoading} = useSelector(state => state.article)
    const {title, setTitle, description, setDescription, body, setBody, formSubmit} = props
    return (
        <form>
            <Input label={'Title'} state={title} setState={setTitle} />
            <TextArea label={'Description'} state={description} setState={setDescription} />
            <TextArea height={'150px'} label={'Body'} state={body} setState={setBody} />
            <button onClick={formSubmit} className="btn btn-primary w-100 py-2 mt-2" disabled={isLoading} type="submit">
                {isLoading ? 'Loading...' : 'Create'}
            </button>
        </form>
    )
}

export default ArticleForm
