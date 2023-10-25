import { Link } from 'react-router-dom';
import PageNav from '../Components/PageNav';

function Homepage() {
	return (
		<>
			<PageNav />
			<div>
				<h1> WorldWise</h1>
				<Link to='/pricing'>Pricing</Link>
			</div>
		</>
	);
}

export default Homepage;
