import { useEffect, useState } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import axios from "axios"

export default function EditSubmission(){
  const [form, setForm] = useState({
    content: ''
})
const [msg, setMsg] = useState('')
const [isInitialRender, setIsInitialRender] = useState(true);


const { id, commentid } = useParams()
const navigate = useNavigate()

useEffect(() => {
    const getComment = async () => {
        try {
          if (isInitialRender) {
            setIsInitialRender(false);
            const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api-v1/tournaments/${id}/comments/${commentid}`)
            setForm(response.data)
          }
        } catch (err) {
            console.warn(err)
            if (err.response) {
                setMsg(err.response.data.msg)
            }
        }
    }
    getComment()
}, [id, commentid, isInitialRender])

const handleSubmit = async e => {
    try {
        e.preventDefault()
        // axios.put/.post('url', data for the req body)
        const response = await axios.put(`${process.env.REACT_APP_SERVER_URL}/api-v1/tournaments/${id}/comments/${commentid}`, form)
        setForm(response.data)
        navigate(`/posts/${id}`)
    } catch (err) {
        console.warn(err)
        if (err.response) {
            setMsg(err.response.data.msg)
        }
    }
}

    return(
      <div>
      <h1>Edit Comment:</h1>
      <p>{msg}</p>

      <form onSubmit={handleSubmit}>
          <div>
              <label htmlFor='content'>Comment:</label>
              <input
                  type='text'
                  id='content'
                  value={form.content}
                  onChange={e => setForm({ ...form, content: e.target.value })}
              />
          </div>

          <button type='submit' style={{ backgroundColor: '#FC6767', width: '150px' }}>Submit</button>
          <Link to={`/posts/${id}`}>
              <button style={{ backgroundColor: '#FC6767', width: '150px' }}>Cancel</button>
          </Link>
      </form>

  </div>
    )
}