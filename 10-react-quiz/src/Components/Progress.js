import { useQuizContext } from '../context/QuizContext';

function Progress() {
	const { index, numQuestions, maxPossiblePoints, points, answer } = useQuizContext();

	return (
		<header className='progress'>
			<progress value={index + Number(answer !== null)} max={numQuestions}></progress>
			<p>
				Question <strong>{index + 1}</strong> / {numQuestions}
			</p>
			<p>
				<strong>{points}</strong> / {maxPossiblePoints} points
			</p>
		</header>
	);
}

export default Progress;
