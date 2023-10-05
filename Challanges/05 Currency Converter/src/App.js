import { useEffect, useState } from 'react';
import './App.css';

// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`

export default function App() {
	const [fromCur, setFromCur] = useState('USD');
	const [toCur, setToCur] = useState('EUR');
	const [amount, setAmount] = useState(1);
	const [isLoading, setIsLoading] = useState(false);
	const [converted, setConverted] = useState('');

	useEffect(() => {
		async function convert() {
			setIsLoading(true);
			const res = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${fromCur}&to=${toCur}`);

			const data = await res.json();
			setConverted(data.rates[toCur]);
			setIsLoading(false);
		}

		if (fromCur === toCur || amount === 0) {
			return setConverted(amount);
		}

		if (amount < 0) {
			return setConverted('Wpisz poprawną wartość');
		}

		convert();
	}, [amount, fromCur, toCur]);

	return (
		<div>
			<input type='number' value={amount} onChange={e => setAmount(Number(e.target.value))} />
			<select value={fromCur} onChange={e => setFromCur(e.target.value)} disabled={isLoading}>
				<option value='USD'>USD</option>
				<option value='EUR'>EUR</option>
				<option value='CAD'>CAD</option>
				<option value='INR'>INR</option>
				<option value='PLN'>PLN</option>
			</select>
			<select value={toCur} onChange={e => setToCur(e.target.value)} disabled={isLoading}>
				<option value='USD'>USD</option>
				<option value='EUR'>EUR</option>
				<option value='CAD'>CAD</option>
				<option value='PLN'>PLN</option>
				<option value='INR'>INR</option>
			</select>
			<p>
				{converted} {toCur}
			</p>
		</div>
	);
}
