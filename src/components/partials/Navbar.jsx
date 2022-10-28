import { useState, useEffect } from "react"
import axios from "axios"
import { Link } from 'react-router-dom'

export default function Navbar({ currentUser, handleLogout, setCurrentUser }) {
	const [admin, setAdmin] = useState(true)
	const [user, setUser] = useState(false)
	const [isInitialRender, setIsInitialRender] = useState(true);

	useEffect(() => {
		const adminCheck  = async () => {
			try{
				if (isInitialRender) {
					if (admin == false) {
						const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api-v1/admins/${currentUser.username}`)
						console.log(response.data.id)
						if (currentUser.id === response.data.id) {
							setAdmin(true)
						} else { 
							setAdmin(false)
							setUser(true) 
						} return console.log(admin)
	
					}
	
				}
				
			}catch(err){
				console.warn(err)
			}
		}
		adminCheck()

	})

	const adminlog = (
		<>
			<Link to={`/admin/${currentUser.username}`}>
				profile
			</Link>	
		</>

	)

	const userlog = (
	<>
		<Link to={`/${currentUser.username}`}>
			profile
		</Link>
	</>
	)

	 const loggedIn = (
		<>
			{/* if the user is logged in... */}
			<Link to="/">
				<span onClick={handleLogout}>logout</span>
			</Link>

        	{admin ? adminlog : userlog}
    
		</>
	 )

	 const loggedOut = (
		<>
			{/* if the user is not logged in... */}
			<Link to="/register">
				register
			</Link>

			<Link to="/login">
				login
			</Link>
		</>
	 )

	return (
		<nav>
			{/* user always sees this section */}
			<Link to="/">
				<p>User App</p>
			</Link>

			{currentUser ? loggedIn : loggedOut}
		</nav>
	)
}