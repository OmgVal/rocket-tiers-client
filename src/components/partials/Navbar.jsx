import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from "axios"

export default function Navbar({ currentUser, handleLogout, setCurrentUser }) {
	const [admin, setAdmin] = useState(false)
	const [msg, setMsg] = useState("")
	const [isInitialRender, setIsInitialRender] = useState(true);
    
    
    useEffect(() => {
        const checkAdmin = async () => {
            try{
                if (isInitialRender) {
                    
                    if (admin == false){
                        const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api-v1/admins`)
                        console.log(response)
                        if (currentUser.id === response.data._id) {
                            setAdmin(true)
                        } else { setAdmin(false) }
    
                    }

                }
                
            }catch(err){
                console.warn(err)
                if(err.response) {
                    setMsg(err.response.data.msg)
                }
            }
        }
    	checkAdmin()
    },[ currentUser, setCurrentUser, isInitialRender])

	const adProf = (
		<>
		{msg}
		<Link to={`/admin/${currentUser.username}`}>
				profile
		</Link>
		</>
	)

	const userProf = (	
		<Link to={`/${currentUser.username}`}>
				profile
		</Link>

	)
	 const loggedIn = (
		<>
			{/* if the user is logged in... */}
			<Link to="/">
				<span onClick={handleLogout}>logout</span>
			</Link>

			{admin ? adProf : userProf}
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