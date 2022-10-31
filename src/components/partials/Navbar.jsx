
import { Link } from 'react-router-dom'

export default function Navbar({ currentUser, handleLogout, setCurrentUser }) {
	let user = ''
	
	if(currentUser){
		user = currentUser.username
	}

	 const loggedIn = (
		<nav className='top-0 left-0 w-full py-3'>
			<div className='container mx-auto flex justify-between'>
				<img src={require('../../assets/RocketTiers.png')} alt='logo' className='h-8 navbarLogo'/>
				<ul className='text-sm tracking-wide items-center flex gap-x-8'> 
				 	<li className="hover:scale-125 duration-300 py-1 hover:text-cyan-400">
						<Link className='cursor-pointer' to="/">
							<p>Home</p>
						</Link> 
					</li>
					<li className="hover:scale-125 duration-300 py-1 hover:text-cyan-400">
						<Link className='' to="/tournaments">
							Tournaments
						</Link>
					</li>
					<li className="hover:scale-125 duration-300 py-1 hover:text-cyan-400">
						<Link to="/">
							<span onClick={handleLogout}>logout</span>
						</Link>
					</li>
					<li className="hover:scale-125 duration-300 py-1 hover:text-cyan-400">
						<Link to={`/${user}`}>
							profile
						</Link>
					</li>
				
				</ul>
			</div>
		</nav>
	 )

	 const loggedOut = (
		<nav className='top-0 left-0 w-full py-3'>
			<div className='container mx-auto flex justify-between'>
				<img src={require('../../assets/RocketTiers.png')} alt='logo' className='h-8 navbarLogo'/>
				<ul className='text-sm tracking-wide items-center flex gap-x-8'> 
				 	<li className="hover:scale-125 duration-300 py-1 hover:text-cyan-400">
						<Link className='cursor-pointer' to="/">
							<p>Home</p>
						</Link> 
					</li>
					<li className="hover:scale-125 duration-300 py-1 hover:text-cyan-400">
						<Link className='' to="/tournaments">
							Tournaments
						</Link>
					</li>
					<li className="hover:scale-125 duration-300 py-1 hover:text-cyan-400">
						<Link to="/register">
							register
						</Link>
					</li>

					<li className="hover:scale-125 duration-300 py-1 hover:text-cyan-400">
						<Link to="/login">
							login
						</Link>
					</li>
				</ul>
				

				
			</div>
		</nav>
	 )

	return (
		<>
			{/* user always sees this section */}
			{currentUser ? loggedIn : loggedOut}
			

		</>
	)
}