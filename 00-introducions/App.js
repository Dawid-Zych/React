import { useEffect, useState } from 'react';

export default function App() {
	const [joke, setJoke] = useState('');
	const [count, setCount] = useState(0);

	async function getJoke() {
		const res = await fetch('https://api.chucknorris.io/jokes/random');
		const data = await res.json();
		setJoke(data.value);
		setCount(c => c + 1);
	}

	useEffect(function () {
		getJoke();
	}, []);

	return (
		<div>
			<h1>{joke}</h1>
			<button onClick={getJoke}>get joke</button>
			<Message count={count} />
		</div>
	);
}

function Message(props) {
	return (
		<p>
			You have read <strong>{props.count}</strong> pieces of advice
		</p>
	);
}