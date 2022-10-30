import { useState, useEffect, useRef } from "react"
import axios from "axios"
import Moment from 'react-moment';
import { Link, useParams, useNavigate } from "react-router-dom";
import Modal from 'react-modal';
Modal.setAppElement('*');

export default function Tournament({currentUser, setCurrentUser}){
    const { id } = useParams()
    const [tournament, setTournament] = useState({admin: {_id: ''}})
    const [msg, setMsg] = useState("")
    const [tour, setTour] = useState([])
    const [currUser, setCurrUser] = useState(false)
    const [comment, setComment] = useState("")
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [previewSource, setPreviewSource] = useState('')
    const [comments, setComments] = useState([])
    const [submissions, setSubmissions] = useState(0)
    const [sub, setSub] = useState(false)
    const [isInitialRender, setIsInitialRender] = useState(true);

    let user = ''
	
	if(currentUser){
		user = currentUser
	} 

    const navigate = useNavigate()
    // Cloudinary 
	const [fileInputState, setFileInputState] = useState('')


	// Multer
	const inputRef = useRef(null)
	const [formImg, setFormImg] = useState('')

	const previewFile = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file); //Converts the file to a url
        reader.onloadend = () => { //Once the reader is done loading
            setPreviewSource(reader.result);

        }
    }

	const setModalIsOpenToTrue = () => {
		setModalIsOpen(true)
	}

	const setModalIsOpenToFalse = () => {
		setModalIsOpen(false)
	}

	const handleFileInputChange = (e) => {
		const file = e.target.files[0]
		previewFile(file);
		setFormImg(file)
	}

    
    useEffect(() => {
        const getTour = async () => {
        try {
            if (isInitialRender){
                setIsInitialRender(false)
                const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api-v1/tournaments/${id}`)
                setTournament(response.data)
                setComments(response.data.comments)
                setSubmissions(response.data.submissions)
                // console.log(currentUser.id)
                // console.log(response.data.admin)
                
                if (currentUser.id == response.data.admin) return setCurrUser(true)

                setTour(response.data)

            
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

    const handlePhotoUpdate = async e => {
		e.preventDefault()
		try {
			// post form data to the backend
			const formData = new FormData()
			formData.append('id', id)
			formData.append('photo', formImg)
			const options = {
				headers: {
					"Content-Type": "multipart/form-data"
				}
			}
			const response = await axios.put(`${process.env.REACT_APP_SERVER_URL}/api-v1/tournaments/${id}/photo`, formData, options)
			setTour(response.data)
			setModalIsOpenToFalse()

		} catch (err) {
			console.warn(err)
			if (err.response) {
				setMsg(err.response.data.msg)
			}
		}
	}

    let photoMsg;
	const photoCheck = () => {
		if (tour.image) {
            photoMsg = 'Edit Photo'
			return (
				<>
					<img src={tour.photo} className='tournamentPhoto' alt='tournament bracket' />
				</>
			)
		} else {
            photoMsg = 'Edit Photo'
			return (
				<>
					<img src={require('../../assets/RocketTiers.png')} alt='tournament bracket' className='tournamentPhoto' />
				</>
			)
		}
	}
    photoCheck()
            
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

    const handleSubs = async (e, tournament_id) => {
        e.preventDefault()
        try{
            const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api-v1/tournaments/${tournament_id}/submissions`)
            setSubmissions("")
            submissions[tournament_id] = submissions[tournament_id] + 1
            setSubmissions(submissions)
        }catch(err){
            console.warn(err)
            if(err.response) {
                setMsg(err.response.data.msg)
            }
        }
    }

    console.log(comments)

    
    const renderComments = comments.map((comment, idx) => {
        return (
            <div key={`comment-${comment._id}-${idx}`}>
                <div>
                    <div>
                        <span>{comment.user.username} </span>
                        {/* {comment.user.admin == true ? <img src='../' className='verifiedComment' alt='verified user' style={{width: '20px'}} /> : false }: */}
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
            {msg}

            {currUser ? <Link to={`/tournaments/${tournament._id}/edit`}> <button> Edit</button> </Link> : <p></p>}
            {currUser ? <button onClick={handleDelete}> Delete</button> : <p></p>}

            <div key={tournament._id}>
                
              <div>
              {photoCheck()}
              <Modal isOpen={modalIsOpen}>
						<button onClick={setModalIsOpenToFalse}>close</button>
						<form onSubmit={handlePhotoUpdate}>
							<div>
								<input
									type="file"
									name="image"
									id="image"
									ref={inputRef}
									onChange={handleFileInputChange}
									value={fileInputState}
									alt='user profile pic'
									accept=".jpg, .jpeg, .png"
									style={{ color: formImg ? 'transparent' : '' }}
								/>
								<label htmlFor='file'>Upload Profile Photo:</label>
							</div>
							{previewSource ?
								<img src={previewSource} alt="file preview" style={{ height: 'auto', width: '100%' }} /> : ''
							}
							<div>
								<button type="submit" >Submit</button>

							</div>
						</form>
					</Modal>
                    
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