import { useState } from 'react'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import { Navigate, Link } from 'react-router-dom'

export default function AdminLog({ currentUser, setCurrentUser }) {
	// state for the controlled form
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [msg, setMsg] = useState('')

	// submit event handler
	const handleSubmit = async e => {
		e.preventDefault()
		try {
			// post fortm data to the backend
			const reqBody = {
				username, 
				password
			}
			const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api-v1/admins/login`, reqBody)

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
		console.log(currentUser)
		return <Navigate to={`/admin/${username}`} />
	}

	return (
		<div>
			<h1>Login to Your Account:</h1>

			<p>{msg}</p>

			<form onSubmit={handleSubmit}>
				<label htmlFor='username'>Username:</label>
				<input 
					type="username"
					id="username"
					placeholder='your username...'
					onChange={e => setUsername(e.target.value)}
					value={username}
				/>

				<label htmlFor='password'>Password:</label>
				<input 
					type="password"
					id="password"
					placeholder='password...'
					onChange={e => setPassword(e.target.value)}
					value={password}
				/>


				<button type="submit">Login</button>
				<p>Not an admin? <Link to='/login'>login here</Link></p>
				<p>New admin? <Link to='/adminreg'>sign up</Link></p>
			</form>
		</div>
	)
}