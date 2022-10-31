import {
    useState,
    useEffect
} from "react"
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

export default function Submission({currentUser, setCurrentUser}){
    const { id } = useParams()
    const [submissions, setSubmissions] = useState([])
    const [subAlready, setSubAlready] = useState(false)
    const [teamsize, setTeamsize] = useState("")
    const [othermember, setOthermember] = useState('')
    const [user, setUser] = useState(currentUser)
    const [msg, setMsg] = useState("")
    const [isInitialRender, setIsInitialRender] = useState(true);


    
    // console.log(user)

    const navigate = useNavigate()

    useEffect(() => {
        const getTour = async () => {
        try {
            if (isInitialRender){
                setIsInitialRender(false)
                const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api-v1/tournaments/${id}`)
                setSubmissions(response)
                console.log(submissions)
                // if(response.data.submissions.includes(currentUser.id)) {
                //     setSubAlready(true)
                // }
            }
                
            } catch (err) {
                console.warn(err)
                if(err.response) {
                    setMsg(err.response.data.msg)
                }
            }
        }
        getTour()
    }, [currentUser, isInitialRender])

    console.log(subAlready)



    const handleCreate = async (e) => {
        e.preventDefault()
        try {
            // console.log(user)
            const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api-v1/tournaments/${id}/submissions`, { teamsize: teamsize, othermember: othermember, user: user.id })
            navigate(`/tournaments/${id}`)
        } catch (err) {
            console.warn(err)
            if(err.response) {
                setMsg(err.response.data.msg)
            }
        }
    }  



    

    // console.log(tournament)

    return(
        <>
            <div>
            <form>
                    <div>
                        <div>

                            <label htmlFor="teamsize">Teamsize:</label>
                            <input type="text" 
                            placeholder='add teamsize...' 
                            value={teamsize} 
                            onChange={(e) => setTeamsize(e.target.value)} id="teamsize"/>

                            <label htmlFor="othermember">Othermember:</label>
                            <input type="text" 
                            placeholder='list all team usernames(must have account)' 
                            value={othermember} 
                            onChange={(e) => setOthermember(e.target.value)} />
                            <button type="submit" style = {{backgroundColor: '#FC6767', width: '80px' }} onSubmit={handleCreate}>Submit</button>
                        </div>
                        
                    </div>
                </form>
            </div>
        </>
    )
}