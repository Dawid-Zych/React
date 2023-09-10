export default function App() {
	const messages = ['Learn React ⚛️', 'Apply for jobs 💼', 'Invest your new income 🤑'];

	let step = 1;

	function handlePreviouse() {}
	function handleNext() {}
	console.log(step);
	return (
		<div className='steps'>
			<div className='numbers'>
				<div className={`${step >= 1 ? 'active' : ''}`}>1</div>
				<div className={`${step >= 2 ? 'active' : ''}`}>2</div>
				<div className={`${step >= 3 ? 'active' : ''}`}>3</div>
			</div>

			<p className='message'>
				Step {step}: {messages[step - 1]}
			</p>

			<div className='buttons'>
				<button style={{ backgroundColor: '#7950f2', color: '#fff' }} onClick={handlePreviouse}>
					Previous
				</button>
				<button style={{ backgroundColor: '#7950f2', color: '#fff' }} onClick={handleNext}>
					Next
				</button>
			</div>
		</div>
	);
}
