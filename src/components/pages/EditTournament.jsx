import { useEffect, useState } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import axios from "axios"

export default function EditTournament(){
    const [form, setForm] = useState({
        title: '',
        content: '',
        url: '',
        category: '',
        ranks: '',
        reward: ''
    })
    const [msg, setMsg] = useState("")
    const [isInitialRender, setIsInitialRender] = useState(true);

    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        const getTour = async () => {
            try {
                if(isInitialRender){
                    setIsInitialRender(false)
                    const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api-v1/tournaments/${id}`)
                    setForm(response.data)
                }
            } catch (err) {
                console.warn(err)
                if (err.response) {
                    setMsg(err.response.data.msg)
                }
            }
        }
        getTour()
    }, [isInitialRender, id])
    
    const handleSubmit = async e => {
        try {
            e.preventDefault()
            // axios.put/.post('url', data for the req body)
            const response = await axios.put(`${process.env.REACT_APP_SERVER_URL}/api-v1/tournaments/${id}`, form)
            setForm(response.data)
            navigate(`/tournaments/${id}`)
        } catch (err) {
            console.warn(err)
            if (err.response) {
                setMsg(err.response.data.msg)
            }
        }
    }

    const formDisplay = (
        <div className="editTournamentFormBox">
            {msg}
            <h1>Edit Tournament</h1>

                <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="url">Stream: </label>
                    <textarea
                        type="text"
                        name="url"
                        id="url"
                        value={form.url}
                        onChange={e => setForm({ ...form, url: e.target.value })}
                        style={{ height: "27px", fontSize: "14pt", width: "100%" }}
                        required
                    ></textarea>
                    <label htmlFor="title">Title: </label>
                    <input
                        type="text"
                        name="title"
                        id="title"
                        value={form.title}
                        onChange={e => setForm({ ...form, title: e.target.value })}
                        required
                    />
                    <label htmlFor="content">Caption with ranks: </label>
                    <textarea
                        type="text"
                        name="content"
                        id="content"
                        value={form.content}
                        onChange={e => setForm({ ...form, content: e.target.value })}
                        style={{ height: "7rem", fontSize: "14pt", width: "100%" }}
                    ></textarea>

                    <label htmlFor="categoryOpt" className='categoryLabel'>Category: </label>
                    <datalist id='categoryOpt' className='categoryOptions'>
                        <option value='Doubles'></option>
                        <option value='Duel'></option>
                        <option value='Standard'></option>
                        {/* <option value='Platinum'></option>
                        <option value='Diamond'></option>
                        <option value='Champion'></option>
                        <option value='Grand Champion'></option>
                        <option value='Supersonic Legend'></option> */}
                    </datalist>
                    <input
                        className='categoryInput'
                        type="list"
                        name="category"
                        id="category"
                        list='categoryOpt'
                        value={form.category}
                        onChange={e => setForm({ ...form, category: e.target.value })}
                        required
                    />
                    
                    <label htmlFor="ranks">Ranks: </label>
                    <input
                        type="text"
                        name="ranks"
                        id="ranks"
                        value={form.ranks}
                        onChange={e => setForm({ ...form, ranks: e.target.value })}
                        required
                    />
                    <label htmlFor="reward">Reward Amount: </label>
                    <input
                        type="text"
                        name="reward"
                        id="reward"
                        value={form.reward}
                        onChange={e => setForm({ ...form, reward: e.target.value })}
                        required
                    />
                </div>

                    <button type="submit" style={{ backgroundColor: '#FC6767', width: '10rem' }}>Submit</button>
                    <Link to={`/tournaments/${id}`}>
                    <button style={{ backgroundColor: '#FC6767', width: '150px' }}>Cancel</button>
                </Link>
                </form> 
        </div>
    )

    return (

        <div>
            {msg}
            {formDisplay}
            {/* {admin == true ? formDisplay : "You do not have access, sorry."} */}
            
        </div>
    )
}