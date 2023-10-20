import { useEffect, useReducer } from 'react';
import Error from './Error';
import Loader from './Loader';
import Header from './Header';
import Main from './Main';
import StartScreen from './StartScreen';
import Questions from './Questions';
import NextButton from './NextButton';
import Progress from './Progress';
import FinishScreen from './FinishScreen';
import Timer from './Timer';
import Footer from './Footer';

const SECS_PER_QUESTION = 30;
const initialState = {
	questions: [],

	// 'loading', 'error','ready','active','finished
	status: 'loading',
	index: 0,
	answer: null,
	points: 0,
	highscore: 0,
	secondsRemaining: null,
};

function reducer(state, action) {
	switch (action.type) {
		case 'dataReceived':
			return {
				...state,
				questions: action.payload,
				status: 'ready',
			};
		case 'dataFailed':
			return {
				...state,
				status: 'error',
			};
		case 'start':
			return {
				...state,
				status: 'active',
				secondsRemaining: state.questions.length * SECS_PER_QUESTION,
			};
		case 'newAnswer':
			const question = state.questions.at(state.index);

			return {
				...state,
				answer: action.payload,
				points: action.payload === question.correctOption ? state.points + question.points : state.points,
			};
		case 'nextQuestion':
			return {
				...state,
				index: state.index + 1,
				answer: null,
			};
		case 'finish':
			return {
				...state,
				status: 'finished',
				highscore: state.points > state.highscore ? state.points : state.highscore,
			};
		case 'restart':
			return { ...initialState, questions: state.questions, status: 'ready', highscore: state.highscore };
		/* return {
				...state,
				status: 'ready',
				index: 0,
				answer: null,
				points: 0,
			}; */

		case 'tick':
			return {
				...state,
				secondsRemaining: state.secondsRemaining - 1,
				status: state.secondsRemaining === 0 ? 'finished' : state.status,
			};

		default:
			throw new Error('Action unknown');
	}
}

export default function App() {
	const [{ questions, status, index, answer, points, highscore, secondsRemaining }, dispatch] = useReducer(
		reducer,
		initialState
	);

	const numQuestions = questions.length;
	const maxPossiblePoints = questions.reduce((prev, curr) => prev + curr.points, 0);

	// instalujemy json-server
	/* useEffect(function () {
		fetch('http://localhost:8000/questions')
			.then(res => res.json())
			.then(data => console.log(data))
			.catch(err => console.log(err));
	}); */

	useEffect(function () {
		async function fetchData() {
			try {
				const res = await fetch('http://localhost:8000/questions');
				const data = await res.json();
				dispatch({ type: 'dataReceived', payload: data });
			} catch (error) {
				dispatch({ type: 'dataFailed' });
			}
		}
		fetchData();
	}, []);

	return (
		<div className='app'>
			<Header />
			<Main>
				{status === 'loading' && <Loader />}
				{status === 'error' && <Error />}
				{status === 'ready' && <StartScreen numQuestions={numQuestions} dispatch={dispatch} />}
				{status === 'active' && (
					<>
						<Progress
							index={index}
							points={points}
							numQuestions={numQuestions}
							maxPossiblePoints={maxPossiblePoints}
							answer={answer}
						/>
						<Questions question={questions[index]} dispatch={dispatch} answer={answer} />
						<Footer>
							<Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />
							<NextButton dispatch={dispatch} answer={answer} index={index} numQuestions={numQuestions} />
						</Footer>
					</>
				)}

				{status === 'finished' && (
					<FinishScreen
						maxPossiblePoints={maxPossiblePoints}
						points={points}
						highscore={highscore}
						dispatch={dispatch}
					/>
				)}
			</Main>
		</div>
	);
}
