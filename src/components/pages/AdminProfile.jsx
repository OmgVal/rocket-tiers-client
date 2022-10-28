import { useState, useEffect, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
// import Moment from 'react-moment';
import Modal from 'react-modal';
Modal.setAppElement('*');


export default function Profile({ currentUser, handleLogout }) {
	const [tournaments, setTournaments] = useState([])
	const [user, setUser] = useState([])
	const [profile, setProfile] = useState(true)
	const [msg, setMsg] = useState('')
	const [modalIsOpen, setModalIsOpen] = useState(false);
	const [previewSource, setPreviewSource] = useState('')
    const [isInitialRender, setIsInitialRender] = useState(true);


	const { username } = useParams()
	

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

	// Find a profile
	useEffect(() => {
		const getProfile = async () => {
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
                    const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api-v1/admins/${username}`, options)

                    //check to see if user is viewing their own profile and set Profile state accordingly
                    if (currentUser.id === response.data._id) {
                        setProfile(true)
                    } else { setProfile(false) }

                    // console.log(response.data)
                    setUser(response.data)
                    setTournaments(response.data.tournaments)
                }
			} catch (err) {
				console.warn(err)
				setMsg(err.response.data.msg)
				handleLogout()
			}
		}
		getProfile()
		//username is passed in the array to render the useEffect again each time user goes to different user's profile
	}, [username, isInitialRender, currentUser, handleLogout])



	const handlePhotoUpdate = async e => {
		e.preventDefault()
		try {
			// post form data to the backend
			const formData = new FormData()
			formData.append('userId', user._id)
			formData.append('image', formImg)
			const options = {
				headers: {
					"Content-Type": "multipart/form-data"
				}
			}
			const response = await axios.put(`${process.env.REACT_APP_SERVER_URL}/api-v1/admins/${username}/photo`, formData, options)
			return 
			setUser(response.data)
			setModalIsOpenToFalse()

		} catch (err) {
			console.warn(err)
			if (err.response) {
				setMsg(err.response.data.msg)
			}
		}
	}


	const ranksCheck = () => {
		if (user.ranks) {
			return (
				<h3 className='fs-4'>{user.ranks}</h3>
			)
		} else {
			return (
				<p>Click 'Edit Profile' to add ranks & platform...</p>
			)
		}
	}

	let photoMsg;
	const photoCheck = () => {
		if (user.image) {
			photoMsg = 'Change Photo'
			return (
				<>
					<img src={user.image} className='profileAvi' />
				</>
			)
		} else {
			photoMsg = 'Add Photo'
			return (
				<>
					<img src={require('../../assets/defaultPic.jpeg')} className='profileAvi' />
				</>
			)
		}
	}

	const viewUserProfile = (
		<div>
			{/* if the user viewing their own profile... */}
			<div>
				<div>
					{photoCheck()}
					<h3 >@{username}</h3>
					{ranksCheck()}
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
									accept=".jpg, .jpeg, .png"
									style={{ color: formImg ? 'transparent' : '' }}
								/>
								<label htmlFor='file'>Upload Profile Photo:</label>
							</div>
							{previewSource ?
								<img src={previewSource} alt="User uploaded image" style={{ height: 'auto', width: '100%' }} /> : ''
							}
							<div>
								<button type="submit" >Submit</button>

							</div>
						</form>
					</Modal>
				</div>

				<div>
					<div><p>{tournaments ? tournaments.length : 'No Tournaments Here'} Tournaments</p></div>
				</div>

				<div>
					<div>
						<div>
							<button onClick={setModalIsOpenToTrue} >{photoMsg}</button>
						</div>

						<Link to={`/admin/${username}/edit`}>
							<button>Edit Profile</button>
						</Link>
					</div>
				</div>
			</div>
		</div>
	)

	const viewOtherProfile = (
		// if the user is viewing someone else's profile...
		<div>
			<div>
				{photoCheck()}
				{/* <h3>@{currentUser.username}</h3> */}
				{user.bio}
			</div>

			<div>
				{/* <div><p>{tournaments.length} Posts</p></div> */}
			</div>
		</div>

	)

	return (
		<div>
			{msg}
			{/* conditionally render based on currentUser and profileUser */}
			{profile ? viewUserProfile : viewOtherProfile}
		</div>
	)

}