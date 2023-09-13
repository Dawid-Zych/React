import './App.css';
import { useState } from 'react';

export default function App() {
	return (
		<div className='App'>
			<Counter />
		</div>
	);
}

function Counter() {
	const [step, setStep] = useState(1);
	const [count, setCount] = useState(0);

	const date = new Date();
	date.setDate(date.getDate() + count);

	function handleReset() {
		setCount(0);
		setStep(1);
	}

	return (
		<>
			<div>
				<input
					type='range'
					min='0'
					max='10'
					step='1'
					value={step}
					onChange={e => setStep(Number(e.target.value))}
				/>
				<span> Step: {step} </span>
			</div>

			<div>
				<button onClick={() => setCount(c => c - step)}>-</button>
				<input type='number' onChange={e => setCount(Number(e.target.value))} value={count} />
				<button onClick={() => setCount(c => c + step)}>+</button>
			</div>
			<br></br>
			<div>
				<span>
					{count === 0 ? 'Today is ' : count > 0 ? `${count} days from today is ` : `${-count} days ago was `}
				</span>
				<span>{date.toDateString()}</span>
			</div>
			{(count !== 0 || step !== 1) && (
				<div>
					<button onClick={handleReset}>Reset</button>
				</div>
			)}
		</>
	);
}
