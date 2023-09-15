import './App.css';
import { useState } from 'react';

export default function App() {
	const [bill, setBill] = useState('');
	const [percentage1, setPercentage1] = useState(0);
	const [percentage2, setPercentage2] = useState(0);

	const tip = bill * ((percentage1 + percentage2) / 2 / 100);

	function handleReset() {
		setBill('');
		setPercentage2(0);
		setPercentage1(0);
	}

	return (
		<div className='App'>
			<BillInput bill={bill} onSetBill={setBill} />
			<SelectPercentage percentage={percentage1} onSelect={setPercentage1}>
				How did you like the service?
			</SelectPercentage>
			<SelectPercentage percentage={percentage2} onSelect={setPercentage2}>
				How did your friend like the service?
			</SelectPercentage>

			{bill > 0 && (
				<>
					<Output bill={bill} tip={tip} />
					<Reset onReset={handleReset} />
				</>
			)}
		</div>
	);
}

function BillInput({ bill, onSetBill }) {
	return (
		<div>
			<label htmlFor='bill'>How much was the bill?</label>
			<input
				type='number'
				placeholder='bill value'
				id='bill'
				value={bill}
				onChange={e => onSetBill(Number(e.target.value))}
			/>
		</div>
	);
}

function SelectPercentage({ percentage, onSelect, children }) {
	return (
		<div>
			<span>{children}</span>
			<select value={percentage} onChange={e => onSelect(Number(e.target.value))}>
				<option value='0'>Dissatisfied (0%)</option>
				<option value='5'>It was okay (5%)</option>
				<option value='10'>It was good (10%)</option>
				<option value='20'>Absolutely amazing! (20%)</option>
			</select>
		</div>
	);
}

function Output({ bill, tip }) {
	return (
		<h3>
			You pay ${bill + tip} (${bill} + ${tip} tip)
		</h3>
	);
}
function Reset({ onReset }) {
	return <button onClick={onReset}> Reset</button>;
}
