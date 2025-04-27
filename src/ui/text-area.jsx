const TextArea = ({label, state, setState, height='100px'}) => {
    return (
        <div className="form-floating">
            <textarea  style={{height:height}} value={state}  className="form-control" placeholder={label} onChange={e => setState(e.target.value)} id="floatingTextarea"></textarea>
            <label htmlFor="floatingTextarea">{label}</label>
        </div>
    )
}

export default TextArea
