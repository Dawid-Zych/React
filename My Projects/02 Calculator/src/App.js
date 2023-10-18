import { useState } from 'react';
import './App.css';
const calculatorSymbols = [
	'C',
	'x²',
	'√x',
	'⌫',
	'7',
	'8',
	'9',
	'*',
	'4',
	'5',
	'6',
	'/',
	'1',
	'2',
	'3',
	'-',
	'0',
	',',
	'+-',
	'+',
	'=',
];

function App() {
	const [number, setNumber] = useState('');
	const [memory, setMemory] = useState('');
	const [result, setResult] = useState('');

	function resetClickHandler() {
		setMemory('');
		setNumber('');
		setResult('');
	}

	function numClickHandler(e) {
		setResult('');
		setNumber(number + e);
	}

	function invertClickHandler(e) {
		if (result) setResult(e => -e);
		setNumber(e => -e);
	}

	function equalsClickHandler(e) {
		if (result) return;
		setMemory(() => memory + number + e);
		// eslint-disable-next-line no-eval
		let calculate = eval(memory + number);
		setResult(calculate);
		setNumber('');
	}
	function undoAction() {
		let num = number.slice(0, -1);
		setNumber(num);
	}
	function signClickHandler(e) {
		setNumber('');
		setMemory(() => (result ? result + e : number + e));
	}
	function commaClickHandler() {}

	function specialClickSign(e) {
		console.log(e);
		if (e === '√x') {
			setMemory(`√(${number})`);
			setResult(parseFloat(result ? Math.sqrt(result) : Math.sqrt(number).toFixed(9)));
		}
		if (e === 'x²') {
			setMemory(`sqrt(${number})`);
			setResult(result ? result * 2 : number * 2);
		}
	}
	return (
		<div className='app'>
			<div className='screen'>
				<p className='memory'>{memory}</p>
				<p className='value'>{result ? result : number || 0}</p>
			</div>
			<div className='buttonBox'>
				{calculatorSymbols.map((symb, i) => (
					<Button
						key={i}
						className={symb === '=' ? 'equals' : ''}
						value={symb}
						onClick={
							symb === 'C'
								? resetClickHandler
								: symb === '+-'
								? invertClickHandler
								: symb === '='
								? equalsClickHandler
								: symb === '/' || symb === '*' || symb === '-' || symb === '+'
								? signClickHandler
								: symb === '.'
								? commaClickHandler
								: symb === '⌫'
								? undoAction
								: symb === 'x²' || symb === '√x'
								? specialClickSign
								: numClickHandler
						}></Button>
				))}
			</div>
		</div>
	);
}

export default App;

function Button({ className, onClick, value }) {
	return (
		<button className={className} onClick={e => onClick(e.target.innerHTML)}>
			{value}
		</button>
	);
}
