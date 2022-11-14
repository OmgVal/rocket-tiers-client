import { useState } from 'react'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import { Navigate, Link } from 'react-router-dom'

export default function Login({ currentUser, setCurrentUser }) {
	// state for the controlled form
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [msg, setMsg] = useState('')

	// submit event handler
	const handleSubmit = async e => {
		e.preventDefault()
		try {
			// post fortm data to the backend
			const reqBody = {
				email, 
				password
			}
			const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api-v1/users/login`, reqBody)

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
			 
			 <div className='bg-gray-800 flex flex-col justify-center'>
				<form className='max-w-[400px] w-full mx-auto rounded-lg bg-gray-900 p-8 px-8' onSubmit={handleSubmit}>
				<h1 className='text-4xl dark:text-white font-bold text-center'>Login to Your Account:</h1>
					<div className='flex flex-col text-gray-400 py-2'>
						<label htmlFor='email'>Email:</label>
						<input className='rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none' type="text"
							type="email"
							id="email"
							placeholder='your email...'
							onChange={e => setEmail(e.target.value)}
							value={email}
						/>
					</div>
					
					<div className='flex flex-col text-gray-400 py-2'>
						<label htmlFor='password'>Password:</label>
						<input 
							className='p-2 rounded-lg bg-gray-700 mt-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none'
							type="password"
							id="password"
							placeholder='password...'
							onChange={e => setPassword(e.target.value)}
							value={password}
						/>
					</div>

					<div className='flex justify-between text-gray-400 py-2'>
						<button type="submit">Login</button>
					</div>
						<p>No Account? <Link to='/register' className='hover:scale-125 duration-300 py-1 hover:text-cyan-400 font-underline'> Sign up here.</Link></p>
				</form>

			 </div>

			<p>{msg}</p>

		</div>
	)
}