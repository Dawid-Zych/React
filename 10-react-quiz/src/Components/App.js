import { useEffect, useReducer } from 'react';
import Error from './Error';
import Loader from './Loader';
import Header from './Header';
import Main from './Main';
import StartScreen from './StartScreen';
import Questions from './Questions';
import NextButton from './NextButton';
import Progress from './Progress';

const initialState = {
	questions: [],

	// 'loading', 'error','ready','active','finished
	status: 'loading',
	index: 0,
	answer: null,
	points: 0,
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

		default:
			throw new Error('Action unknown');
	}
}

export default function App() {
	const [{ questions, status, index, answer, points }, dispatch] = useReducer(reducer, initialState);

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
						<NextButton dispatch={dispatch} answer={answer} />
					</>
				)}
			</Main>
		</div>
	);
}
