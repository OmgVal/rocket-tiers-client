
import { Link } from "react-router-dom";

export default function Welcome() {
	return (
		<div>
			<h1> THIS IS ROCKET LEAGUE </h1>

			<div>
				<h2>About:</h2>
				<p>WHIHEHEOHHHKJDHKJHFKJGKJFKJKSJBKJC</p>
			</div>
			

			<div><h3>News</h3></div>
			<iframe src="https://clips.twitch.tv/embed?clip=AuspiciousSuccessfulParrotKeyboardCat-PhTWaH_dbYaU5pIT&parent=localhost" frameBorder="0" allowFullScreen={true} scrolling="no" height="278" width="420"></iframe>

			<div>
				<Link to='/tournaments'> <button>Tournaments</button></Link>

			</div>
			

		</div>
	)
}