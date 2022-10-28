import { useState, useEffect } from "react"
import axios from "axios"
import Moment from 'react-moment';
import { Link } from "react-router-dom";

export default function Tournaments({currentUser, setCurrentUser}){
    const [tournaments, setTournaments] = useState([])
    const [msg, setMsg] = useState("")
    const [comment, setComment] = useState("")
    const [commentNum, setCommentNum] = useState({})   
    const [submissions, setSub] = useState({})
    const [subNum, setSubNum] = useState({})
    const [admin, setAdmin] = useState(false)
    const [isInitialRender, setIsInitialRender] = useState(true);
    
    
    useEffect(() => {
        const getTournaments = async () => {
            try{
                if (isInitialRender) {
                    const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api-v1/tournaments`)
                    setTournaments(response.data)
                    response.data.forEach((tournament) => {
                        subNum[tournament._id] = tournament.submissions.length
                        setSubNum(subNum)
                        commentNum[tournament._id] = tournament.comments.length
                    })
                    
                    if (admin == false){
                        const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api-v1/admins/${currentUser.username}`)
                        
    
                    }

                }
                
            }catch(err){
                console.warn(err)
                if(err.response) {
                    setMsg(err.response.data.msg)
                }
            }
        }
        getTournaments()
    },[subNum, currentUser, setCurrentUser, isInitialRender])


    const handleComment = async (e, tournament_id) => {
        e.preventDefault()
        try{
            const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api-v1/tournaments/${tournament_id}/comments`, {content: comment, userId : currentUser.id})
            setComment("")
            commentNum[tournament_id] = commentNum[tournament_id] + 1
            setCommentNum(commentNum)
        }catch(err){
            console.warn(err)
            if(err.response) {
                setMsg(err.response.data.msg)
            }
        }
    }

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
    
    const renderTournaments = tournaments.map((tournament, idx) => {
        return (
        <div className="container " key={tournament._id}>
        
            <div className="card my-2" key={`key-${idx}`}>
                
                <div>
                    <h6 className='mb-0 fw-bold'>{tournament.user.username}</h6>
                </div>
                <div>
                    <Link to={`/tournaments/${tournament._id}`}>
                    </Link>
                </div>
                    <div>
                        <img src={tournament.photo} alt={tournament._id} className='mw-100' height="auto"/>
                    </div>
                            
                    <div>
                        {subNum}
                        {/* {sub[tournament._id]? <button onClick={() => handleSubs(tournament._id)}>❤️</button> : <button onClick={() => handleLikes(tournament._id)}>🤍</button>}
                        <p>{likeNum[tournament._id]} likes</p> */}
                    </div>
                    <div>
                        <Moment fromNow>{tournament.createdAt}</Moment>
                    </div>
        
                    <div>
                        <h4 className='fw-bold ms-0 mt-3'>{tournament.user.username}</h4>
                        <h4 className='ms-2 mt-3'>{tournament.content}</h4>
                    </div>

                    <div>
                        <p><Link to={`/tournaments/${tournament._id}`} className='commentsLink'>View all {commentNum[tournament._id]} comments</Link> </p>
                    </div>
                    <div>
                        <form onSubmit={(e) => handleComment(e, tournament._id)}>
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
                        </form>
                    </div>
                </div>
            </div>


        )

    })


    const adminView = (
        <div>
            <Link to='/tournaments/new'><button>Add New</button></Link>
        </div>
    )

    return(
        <div>  
            <h1>Tournaments</h1>      
            {msg}
            {renderTournaments} 

            {admin ? adminView : null}
        </div>
    )
}