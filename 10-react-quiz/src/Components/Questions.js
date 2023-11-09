import { useQuizContext } from '../context/QuizContext';
import Options from './Options';

function Questions() {
	const { question } = useQuizContext();
	return (
		<div>
			<h4>{question.question}</h4>
			<Options />
		</div>
	);
}

export default Questions;
