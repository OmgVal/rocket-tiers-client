import { useState, useRef } from 'react'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import { Navigate } from 'react-router-dom'

export default function Register({ currentUser, setCurrentUser }) {
	// state for the controlled form
	const [username, setUsername] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [msg, setMsg] = useState('')
	
	    // Cloudinary 
		const [fileInputState, setFileInputState] = useState('')
	
	
		// Multer
		const inputRef = useRef(null)
		const [formImg, setFormImg] = useState('')

		const handleFileInputChange = (e) => {
			const file = e.target.files[0]
			// previewFile(file);
			setFormImg(file)
		}
		
		

	// submit event handler
	const handleSubmit = async e => {
		e.preventDefault()
		try {
			// post fortm data to the backend
			const formData = new FormData()
			formData.append('username', username)
			formData.append('email', email)
			formData.append('password', password)
			formData.append('image', formImg)
			const options = {
				headers: {
					"Content-Type" : "multipart/form-data"
				}
			}
			const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api-v1/users/register`, formData, options)

			// save the token in localstorage
			const { token } = response.data
			localStorage.setItem('jwt', token)

			// decode the token
			const decoded = jwt_decode(token)

			// set the user in App's state to be the decoded token
			setCurrentUser(decoded)

		} catch (err) {
			console.warn(err)
			if (err.response) {
				setMsg(err.response.data.msg)
			}
		}
 	}

	// conditionally render a navigate component
	if (currentUser) {
		return <Navigate to={`/${currentUser.username}`} />
	}

	return (
		<div className='grid grid-cols-1 sm:grid-cols-2 h-screen w-full'>
			<div className='hidden sm:block'>
				<img className='w-50 h-full object-cover' src={require('../../assets/rlLogin.jpg')} alt="rocketleague field with ball"  />
			</div>
			 
			 <div className='g-gray-800 flex flex-col justify-center'>
				<form className='max-w-[400px] w-full mx-auto rounded-lg bg-gray-900 p-8 px-8' onSubmit={handleSubmit}>
				<h1>Register for an account:</h1>
				<div className='flex flex-col text-gray-400 py-2'>
					<label htmlFor='username'>Username:</label>
					<input className='p-2 rounded-lg bg-gray-700 mt-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none'
						type="text"
						id="username"
						placeholder='your username...'
						onChange={e => setUsername(e.target.value)}
						value={username}
					/>
				</div>
				<div className='flex flex-col text-gray-400 py-2'>
					<label htmlFor='email'>Email:</label>
					<input className='p-2 rounded-lg bg-gray-700 mt-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none'
						type="email"
						id="email"
						placeholder='your email...'
						onChange={e => setEmail(e.target.value)}
						value={email}
					/>
				</div>
				<div className='flex flex-col text-gray-400 py-2'>
					<label htmlFor='password'>Password:</label>
					<input className='p-2 rounded-lg bg-gray-700 mt-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none'
						type="password"
						id="password"
						placeholder='password...'
						onChange={e => setPassword(e.target.value)}
						value={password}
					/>
					
				<div className='flex flex-col text-gray-400 py-2'>
							<label htmlFor='file'>Profile Photo (optional):</label>
							<input 
								type = "file"  
								name = "image" 
								id = "image"
								ref = {inputRef}					
								onChange={handleFileInputChange} 
								value={fileInputState}
								accept=".jpg, .jpeg, .png"
								style = {{height: '60px', color: formImg ? 'transparent' : ''}}

							/>
							<div className="preview">
									<p>{formImg ? 'Profile photo uploaded successfully!' : 'No profile photo currently selected'}</p>
							</div>

						</div>
					</div>



					<button type="submit">Register</button>
				</form>
				<p>{msg}</p>
			</div>
		</div>
	)
}