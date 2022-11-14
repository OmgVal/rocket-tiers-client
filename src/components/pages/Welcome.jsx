
import { Link } from "react-router-dom";

export default function Welcome() {
	return (
		<div className="w-full h-screen flex flex-col justify-between">
			<div className="grid md:grid-cols-2 max-w-[1140px] m-auto pt-28">
				<div>
					<img src={require('../../assets/yllwOct.png')} alt='yellow octane' style={{width: '650px'}} />
					
				</div>
				<div className="flex flex-col justify-right md:items-start w-full py-8 " >
					<p className="text-2xl">This is Rocket League!</p>
					<h1 className="text-5xl md:text-7xl font-bold">ROCKET TIERS</h1>
					<p className="text-2xl py-3">Welcome to Rocket Tiers where you can participate in tournaments and win REAL prizes for us... "average" players!</p>
					<Link to='/tournaments'> <button className="py-3 bg-cyan animate-pulse font-bold">All Tournaments</button></Link>
				</div>
			</div>
			
			<div className= 'py-28'>
			<div className="text-4xl flex justify-around pt-8 w-full">
				<h3 className='font-bold'>News</h3>
			</div>
			<div className="flex text-gray-600">
        		<div className="container flex row px-5 py-7 mx-auto">
					<div className="p-4 sm:w-1/2 lg:w-1/3">
							<div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
								<img className="lg:h-72 md:h-48 w-full object-cover object-center"
									src="https://rocketleague.media.zestyio.com/rl_haunted_hallows_2022_key_art_16_9_4k_legal.jpg?width=650&height=366&fit=crop" alt="blog" style={{width: 'fit'}} />
								<div className="p-6 hover:bg-indigo-700 hover:text-white transition duration-300 ease-in">
									<h2 className="text-base font-medium text-indigo-300 mb-1">October 13,
										2022</h2>
									<h1 className="text-2xl font-semibold mb-3">HAUNTED HALLOWS VI: ICONS OF HORROR</h1>
									<div className="flex items-center flex-wrap ">
										<a className="text-cyan-300 inline-flex items-center md:mb-2 lg:mb-0">Read More
											<svg className="w-4 h-4 ml-2 animate-pulse" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"
												fill="none" strokeLinecap="round" strokeLinejoin="round">
												<path d="M5 12h14"></path>
												<path d="M12 5l7 7-7 7"></path>
											</svg>
										</a>
								</div>
							</div>
						</div>
					</div>
					<div className="p-4 sm:w-1/2 lg:w-1/3">
						<div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
							<img className="lg:h-72 md:h-48 w-full object-cover object-center"
								src='https://rocketleague.media.zestyio.com/RL_RP_Keyart_1920x1080_NoLogos.B1At9Rj1o.jpg?width=650&height=366&fit=crop' alt="blog" style={{width: 'auto'}} />
							<div className="p-6 hover:bg-indigo-700 hover:text-white transition duration-300 ease-in">
								<h2 className="text-base font-medium text-indigo-300 mb-1">September 7,
									2022</h2>
								<h1 className="text-2xl font-semibold mb-3">PATCH NOTES: SEASON 8 IS NOW LIVE</h1>
								<div className="flex items-center flex-wrap ">
									<a className="text-cyan-300 inline-flex items-center md:mb-2 lg:mb-0">Read More
										<svg className="w-4 h-4 ml-2 animate-pulse" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"
											fill="none" strokeLinecap="round" strokeLinejoin="round">
											<path d="M5 12h14"></path>
											<path d="M12 5l7 7-7 7"></path>
										</svg>
									</a>
								</div>
							</div>
						</div>
					</div>
					<div className="p-4 sm:w-1/2 lg:w-1/3">
							<div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
								<img className="lg:h-72 md:h-48 w-full object-cover object-center"
									src='https://rocketleague.media.zestyio.com/8644d448-04ba-435a-ad1d-91a4c97f3c9a.S1Qw6NQ2c.jpg?width=650&height=366&fit=crop' alt="blog" style={{width: 'auto'}} />
								<div className="p-6 hover:bg-indigo-700 hover:text-white transition duration-300 ease-in">
									<h2 className="text-base font-medium text-indigo-300 mb-1">July 20,
										2022</h2>
									<h1 className="text-2xl font-semibold mb-3">NIKE AIR ZOOM MERCURIAL ENTERS THE ...</h1>
									<div className="flex items-center flex-wrap ">
										<a className="text-cyan-300 inline-flex items-center md:mb-2 lg:mb-0">Read More
											<svg className="w-4 h-4 ml-2 animate-pulse" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"
												fill="none" strokeLinecap="round" strokeLinejoin="round">
												<path d="M5 12h14"></path>
												<path d="M12 5l7 7-7 7"></path>
											</svg>
										</a>
									
								</div>
							</div>
						</div>
					</div>

				</div>
			</div>
			</div>

			<div className="flex flex-col2 justify-center w-70 py-28 px-20">
				<div>
					<iframe src="https://clips.twitch.tv/embed?clip=AuspiciousSuccessfulParrotKeyboardCat-PhTWaH_dbYaU5pIT&parent=localhost" frameBorder="0" allowFullScreen={true} scrolling="no" height="328" width="570"></iframe>
				</div>
				<div className="flex flex-col justify-right align-center md:items-start w-full h-full px-8 pt-5 mx-8">
					<h1 className="text-2xl py-4">What is rocket league?</h1>
					<p className="">Rocket League is a fantastical sport-based video game, developed by Psyonix (it's “soccer with cars”).
					 It features a competitive game mode based on teamwork and outmaneuvering opponents. Players work with their team to advance the ball down the field, and score goals in their opponents' net.</p>
				</div>
			</div>
			

			

		</div>
	)
}