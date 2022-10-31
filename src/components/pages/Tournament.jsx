import { useState, useEffect, useRef } from "react"
import axios from "axios"
import { Link, useParams, useNavigate } from "react-router-dom";
import Moment from 'react-moment';

export default function Tournament({currentUser, setCurrentUser}){
    const { id } = useParams()
    const [tournament, setTournament] = useState([])
    const [subAlready, setSubAlready] = useState(false)
    const [roster, setRoster] = useState([])
    const [msg, setMsg] = useState("")
    const [teamsize, setTeamsize] = useState("")
    const [othermember, setOthermember] = useState('')
    const [currUser, setCurrUser] = useState(false)
    const [comment, setComment] = useState("")
    const [comments, setComments] = useState([])
    const [submissions, setSubmissions] = useState(0)
    const [submission, setSubmission] = useState('')
    const [isInitialRender, setIsInitialRender] = useState(true);

    let user = ''
	
	if(currentUser){
		user = currentUser
	} 

    const navigate = useNavigate()

    
    useEffect(() => {
        const getTour = async () => {
        try {
            if (isInitialRender){
                setIsInitialRender(false)
                const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api-v1/tournaments/${id}`)
                setTournament(response.data)
                setRoster(response.data.roster)
                setComments(response.data.comments)
                setSubmissions(response.data.submissions)
                if(response.data.submissions.includes(currentUser.id)) {
                    setSubAlready(true)
                }
                // console.log(currentUser.id)
                // console.log(response.data.admin)
                
                if (currentUser.id == response.data.admin) return setCurrUser(true)

            
            // response.data.submissions.forEach((submission) => {
                //     if (submission.user === currentUser.id) {
                    //         setSub(true)
                    //     }
                    // })
            }
                
            } catch (err) {
                console.warn(err)
                if(err.response) {
                    setMsg(err.response.data.msg)
                }
            }
        }
        getTour()
    }, [currentUser, isInitialRender, setSubAlready])
            
    const handleDelete = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.delete(`${process.env.REACT_APP_SERVER_URL}/api-v1/tournaments/${id}`)
            setTournament(response.data)
            navigate('/tournaments')
        } catch (err) {
            console.warn(err)
            if(err.response) {
                setMsg(err.response.data.msg)
            }
        }
    }
     // console.log(currentUser)
            
              
    const handleComment = async (e) => {
        e.preventDefault()
        try {
            console.log(user)
            const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api-v1/tournaments/${id}/comments`, { content: comment, user: user.id })
            setComments([...comments, response.data])
            setComment("")
        } catch (err) {
            console.warn(err)
            if(err.response) {
                setMsg(err.response.data.msg)
            }
        }
    }
    
    const deleteComment = async (commentid) => {
        try {
            const response = await axios.delete(`${process.env.REACT_APP_SERVER_URL}/api-v1/tournaments/${id}/comments/${commentid}`)
            setComments(response.data.comments)
        } catch (err) {
            console.warn(err)
            if(err.response) {
                setMsg(err.response.data.msg)
            }
        }
    }
    
    console.log(comments)
    
    const handleCreate = async (e) => {
        e.preventDefault()
        try {
            console.log(user)
            const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api-v1/tournaments/${id}/comments`, { content: comment, user: user.id })
            setSubmissions([...comments, response.data])
            setSubmission("")
        } catch (err) {
            console.warn(err)
            if(err.response) {
                setMsg(err.response.data.msg)
            }
        }
    }

    const submissionForm = (
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
    )

    
    const renderComments = comments.map((comment, idx) => {
        return (
            <div key={`comment-${comment._id}-${idx}`}>
                <div>
                    <div>
                        <span>{comment.user.username} </span>
                        {comment.user.admin == true ? <img src={require('../../assets/check.png')} className='verifiedComment' alt='verified user' style={{width: '20px'}} /> : false }:
                            <p>{comment.content}</p>
                    </div>
                    <div>
                        {comment.user.username === currentUser.username ? <div>
                            <Link to={`/tournaments/${id}/comments/${comment._id}/edit`}>
                                <button></button>
                            </Link>
                            <button onClick={() => deleteComment(comment._id)}></button>
                        </div> : <p></p>}
                       </div>
                    <div>
                        <Moment fromNow>{comment.createdAt}</Moment>
                    </div>
                </div>

            </div>
        )
    })

    return(
        <div>  
        
            <h1>{tournament.title}</h1>  
            <img src={tournament.image} alt={tournament.title} />    
            {msg}

            {currUser ? <Link to={`/tournaments/${tournament._id}/edit`}> <button> Edit</button> </Link> : <p></p>}
            {currUser ? <button onClick={handleDelete}> Delete</button> : <p></p>}

            <div key={tournament._id}>

                            
                    <div>
                        <h2> Stream: </h2>
                        <iframe src={tournament.url} frameBorder="0" allowFullScreen={true} scrolling="no" height="378" width="620"></iframe>

                    </div>
                    <div>
                        {/* <p>{subNum} Submissions</p> */}
                         <p> {submissions.length} Submissions </p>
                        {/* <p>{likeNum[tournament._id]} likes</p>  */}
                    </div>
                    <div>
                        {/* <h4>{tournament.admin}</h4> */}
                        <h4>{tournament.content}</h4>
                        <h4>{tournament.date}</h4>
                        <h4>Ranks: {tournament.ranks}</h4>
                        <h4>Reward: {tournament.reward} USD</h4>

                        

                    </div>
                    <div>
                        <Moment fromNow>{tournament.createdAt}</Moment>
                    </div> 
                    <div>
                        {subAlready == false ? submissionForm : true }
                    </div>       

                    <div>   
                        {renderComments}
                    </div>
                    <div>
                        <form onSubmit={(e) => handleComment(e, tournament._id)}>
                            <div>
                                <div>
                                    <label htmlFor="comment">{currentUser.username}</label>
                                    <input type="text" 
                                    placeholder='add comment...' 
                                    value={comment} 
                                    onChange={(e) => setComment(e.target.value)} id="comment"/>
                                    <button type="submit" style = {{backgroundColor: '#FC6767', width: '80px' }}>Submit</button>
                                </div>
                                
                            </div>
                        </form>
                    </div>
                    <div>
                        <p> Want to Sign Up? <Link to={`/tournaments/${tournament._id}/submission`}><button>Enter Here!</button></Link></p>

                    </div>

                </div>
            </div>
    )
}