import { useState, useEffect } from "react"
import axios from "axios"
import Moment from 'react-moment';
import jwt_decode from "jwt-decode";
import { Link, useParams } from "react-router-dom";

export default function Tournament(currentUser, setCurrentUser){
    const [tournament, setTournament] = useState([])
    const [msg, setMsg] = useState("")
    const [currUser, setCurrUser] = useState(false)
    const [comment, setComment] = useState("")
    const [comments, setComments] = useState("")
    const [commentNum, setCommentNum] = useState({})   
    const [sub, setSub] = useState({})
    const [submissions, setSubmissions] = useState({})
    const [subNum, setSubNum] = useState('')
    const [isInitialRender, setIsInitialRender] = useState(true);

    const {id} = useParams()

    
    
    useEffect(() => {
        const getPost = async () => {
            try {
                if (isInitialRender){
                    setIsInitialRender(false)
                    const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api-v1/tournaments/${id}`)
                    setTournament(response.data)
                    setComments(response.data.comments)
                    setSubmissions(response.data.submissions.length)
                    if (currentUser.id === response.data.admin._id) {
                        setCurrUser(true)
                    }
    
                    response.data.submissions.forEach((submission) => {
                        if (submission.user === currentUser.id) {
                            setSub(true)
                        }
                    })
                }

            } catch (err) {
                console.warn(err)
                if(err.response) {
                    setMsg(err.response.data.msg)
                }
            }
        }
        getPost()
    }, [currentUser, isInitialRender])


    // const handleComment = async (e, tournament_id) => {
    //     e.preventDefault()
    //     try{
    //         const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api-v1/tournaments/${tournament_id}/comments`, {content: comment, userId : currentUser.id})
    //         setComment("")
    //     }catch(err){
    //         console.warn(err)
    //         if(err.response) {
    //             setMsg(err.response.data.msg)
    //         }
    //     }
    // }

    const handleSubs = async (e, tournament_id) => {
        e.preventDefault()
        try{
            const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api-v1/tournaments/${tournament_id}/submissions`, {content: submissions, userId : currentUser.id})
            setSubNum("")
            subNum[tournament_id] = subNum[tournament_id] + 1
            setSubNum(subNum)
        }catch(err){
            console.warn(err)
            if(err.response) {
                setMsg(err.response.data.msg)
            }
        }
    }
    console.log(subNum)

    const add = (
        <div>
            <Link to='/tournaments/edit'><button>Edit</button></Link>
        </div>
    )
    

    return(
        <div>  
            <h1>Tournaments</h1>      
            {currUser ? add : false}
            {msg}

            <div key={tournament._id}>
                
              <div>
                    {tournament.title}
                </div>
                            
                    <div>
                        {/* <p>{subNum} Submissions</p> */}
                         <p> {subNum[tournament._id]} Submissions </p>
                        {/* <p>{likeNum[tournament._id]} likes</p>  */}
                    </div>
                    <div>
                        {/* <h4>{tournament.admin}</h4> */}
                        <h4>{tournament.content}</h4>
                        <h4>Ranks: {tournament.ranks}</h4>
                        <h4>Reward: {tournament.reward} USD</h4>
                        

                    </div>
                    <div>
                        <Moment fromNow>{tournament.createdAt}</Moment>
                    </div>
                {/* iframe src={tournament.url} frameborder="0" allowfullscreen="true" scrolling="no" height="378" width="620"></iframe> */}
        

                    <div>
                        {/* <p><Link to={`/tournaments/${tournament._id}`} className='commentsLink'>View all {commentNum[tournament._id]} comments</Link> </p> */}
                    </div>
                    <div>
                        {/* <form onSubmit={(e) => handleComment(e, tournament._id)}>
                            <div>
                                <div>
                                    <label htmlFor="comment">{currentUser.username}</label>
                                </div>
                                <div>
                                    <input type="text" 
                                    placeholder='add comment...' value={comment} onChange={(e) => setComment(e.target.value)} id="comment"/>
                                    <button type="submit" style = {{backgroundColor: '#FC6767', width: '80px' }}>Submit</button>
                                </div>
                                
                            </div>
                        </form> */}
                    </div>
                </div>
            </div>
    )
}