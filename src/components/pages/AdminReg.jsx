import { useEffect, useState } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import axios from "axios"

export default function AdminReg({handleLogout, setCurrentUser, currentUser}){
    const { username } = useParams()
    const [isInitialRender, setIsInitialRender] = useState(true);
    const [form, setForm] = useState({
        username: username,
		admin: 'true',
        adminkey: ''
        // profilePic: '' 
        // edit user password?
    })
    const [msg, setMsg] = useState('')

    const navigate = useNavigate()

    useEffect(() => {
        const getUser = async () => {
            try {
                if (isInitialRender) {
                    setIsInitialRender(false);
                    
                    // get the token from local storage
                    const token = localStorage.getItem('jwt')
                    // make the auth headers
                    const options = {
                        headers: {
                            'Authorization': token
                        }
                    }
                    // hit the auth locked endpoint
                    const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api-v1/users/${username}`, options)
                    // if (response.data.username) {
                    //     setForm({ ...form, username: response.data.username })
                    // }
                    // console.log('admin',response.data)
                }
            } catch (err) {
                console.warn(err)
                if (err.response) {
                    setMsg(err.response.data.msg)
                }
            }
        }
        getUser()
    }, [form, username, isInitialRender])

    const handleSubmit = async e => {
        try {
            e.preventDefault()
			const token = localStorage.getItem('jwt')
                    // make the auth headers
                    const options = {
                        headers: {
                            'Authorization': token
                        }
                    }
            // axios.put/.post('url', data for the req body)
            const response = await axios.put(`${process.env.REACT_APP_SERVER_URL}/api-v1/users/${username}/verified`, form)
            // navigate back to the details page for this bounty
            // console.log('edit page:', response)
            setCurrentUser({...currentUser, username: response.data.username})
            setForm({ username: response.data.username}) 
            // console.log(currentUser)
            navigate(`/${form.username}`)
        } catch (err) {
            console.warn(err)
            if (err.response) {
                setMsg(err.response.data.msg)
            }
        }
    }

    return(
        <>
            <div>
            <h1>Verification Form:</h1>
            <p>{msg}</p>

            <form onSubmit={handleSubmit}>
                <div>
                    <input
                        type='hidden'
                        id='username'
                        value={form.username}
                        onChange={e => setForm({ ...form, username: e.target.value })}
                    />
                </div>
                <div>
                    <input
                        type='hidden'
                        id='admin'
                        value={form.value}
                        onChange={e => setForm({ ...form, admin: e.target.value })}
                    />
                </div>
                <div>
                    <label htmlFor='adminkey'>Your Adminkey:</label>
                    <input
                        type='password'
                        id='adminkey'
                        value={form.adminkey}
                        onChange={e => setForm({ ...form, adminkey: e.target.value })}
                    />
                </div>

                <button type='submit' style={{ width: '150px' }}>Submit</button>
            </form>

            <Link to={`/${username}`}>
                <button style={{ width: '150px' }}>Cancel</button>
            </Link>
        </div>
        </>
    )
}