
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

			<div>
				<Link to='/tournaments'> <button>Tournaments</button></Link>

			</div>
			

		</div>
	)
}