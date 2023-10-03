import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import StarRating from './StarRating';

/* function Test() {
	const [movieRating, setMovieRating] = useState(0);
	return (
		<div>
			<StarRating color='blue' maxRating={10} onSetRating={setMovieRating} />
			<p>This movies was rated {movieRating} stars</p>
		</div>
	);
}
 */
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<App />
		{/* <StarRating maxRating={2} />
		<StarRating maxRating={5} color='blue' size={56} messages={['Terrible', 'Bad', 'Okey', 'Good', 'Amazing']} />
		<StarRating maxRating={5} color='red' size={24} className='test' />
		<StarRating maxRating={5} color='grey' size={35} className='test' defaultRating={2} />
		<Test /> */}
	</React.StrictMode>
);
