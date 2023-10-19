import Options from './Options';
function Questions({ questions }) {
	const { question, options, currenctOption, poins } = questions;
	console.log(question);
	return (
		<div>
			<h4>{question}</h4>
			<Options options={options} />
		</div>
	);
}

export default Questions;
