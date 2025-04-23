import { useCallback } from "react"
import { useSelector } from "react-redux"

const ValidationError = () => {
    const { error } = useSelector(state => state.auth)

    const errorMessage = useCallback(() => {
        if (!error || typeof error !== 'object') return []
        return Object.keys(error).map(name => {
            const msg = Array.isArray(error[name])
                ? error[name].join(', ')
                : error[name]
            return `${name} - ${msg}`
        })
    }, [error])

    return error && errorMessage().length > 0 && errorMessage().map(msg => (
        <div className="alert alert-danger m-1 p-1 text-start" role="alert" key={msg}>
            {msg}
        </div>
    ))
}

export default ValidationError