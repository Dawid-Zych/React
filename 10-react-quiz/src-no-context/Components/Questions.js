import Options from './Options';

function Questions({ question, dispatch, answer }) {
	return (
		<div>
			<h4>{question.question}</h4>
			<Options question={question} dispatch={dispatch} answer={answer} />
		</div>
	);
}

export default Questions;
