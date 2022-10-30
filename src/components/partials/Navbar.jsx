
import { Link } from 'react-router-dom'

export default function Navbar({ currentUser, handleLogout, setCurrentUser }) {
	let user = ''
	
	if(currentUser){
		user = currentUser.username
	}

	 const loggedIn = (
		<>
			{/* if the user is logged in... */}
			<Link to="/">
				<span onClick={handleLogout}>logout</span>
			</Link>{' | '}
			<Link to={`/${user}`}>
		 		profile
		 	</Link>
    
		</>
	 )

	 const loggedOut = (
		<>
			{/* if the user is not logged in... */}
			<Link to="/register">
				register
			</Link>{' | '}

			<Link to="/login">
				login
			</Link>{' | '}
		</>
	 )

	return (
		<nav>
			{/* user always sees this section */}
			<Link to="/">
				<p>User App</p>
			</Link> {' | '}
			<Link to="/tournaments">
				Tournaments
			</Link>{' | '}

			{currentUser ? loggedIn : loggedOut}
		</nav>
	)
}