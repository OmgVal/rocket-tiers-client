import { useState, useEffect } from "react"
import axios from "axios"
import Moment from 'react-moment';
import jwt_decode from "jwt-decode";
import { Link, useParams, useNavigate } from "react-router-dom";

export default function Tournament({currentUser, setCurrentUser}){
    const { id } = useParams()
    const [tournament, setTournament] = useState({user: {_id: ''}})
    const [msg, setMsg] = useState("")
    const [currUser, setCurrUser] = useState(false)
    const [comment, setComment] = useState("")
    const [comments, setComments] = useState([])
    const [submissions, setSubmissions] = useState(0)
    const [sub, setSub] = useState(false)
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
                    setComments(response.data.comments)
                    setSubmissions(response.data.submissions)
                    if (currentUser.id === response.data.admin._id) {
                        setCurrUser(true)
                    }
    
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
    }, [currentUser, isInitialRender])

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

    // const handleSubs = async (e, tournament_id) => {
    //     e.preventDefault()
    //     try{
    //         const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api-v1/tournaments/${tournament_id}/submissions`)
    //         setSubNum("")
    //         subNum[tournament_id] = subNum[tournament_id] + 1
    //         setSubNum(subNum)
    //     }catch(err){
    //         console.warn(err)
    //         if(err.response) {
    //             setMsg(err.response.data.msg)
    //         }
    //     }
    // }
    console.log(comments)

    const add = (
        <div>
            <Link to='/tournaments/edit'><button>Edit</button></Link>
        </div>
    )
    
    const renderComments = comments.map((comment, idx) => {
        return (
            <div key={`comment-${comment._id}-${idx}`}>
                <div>
                    <div>
                        {/* <p><span>{comment.user.username}: </span> */}
                            <p>{comment.content}</p>
                    </div>
                    <div>
                        {/* {comment.user.username === currentUser.username ? <div> */}
                            <Link to={`/tournaments/${id}/comments/${comment._id}/edit`}>
                                <button></button>
                            </Link>
                            <button onClick={() => deleteComment(comment._id)}></button>
                        {/* </div> : <p></p>} */}
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
            {currUser ? add : false}
            {msg}

            <div key={tournament._id}>
                
              <div>
                    
                </div>
                            
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
                        <h4>Ranks: {tournament.ranks}</h4>
                        <h4>Reward: {tournament.reward} USD</h4>

                        {currUser ? <Link to={`/tournaments/${id}/edit`}> <button> Edit</button>
                                    </Link> : <p></p>}
                                    {currUser ? <button onClick={handleDelete}> Delete</button> : <p></p>}
                        

                    </div>
                    <div>
                        <Moment fromNow>{tournament.createdAt}</Moment>
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
                </div>
            </div>
    )
}