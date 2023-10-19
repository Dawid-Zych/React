import { useEffect, useReducer } from 'react';
import Error from './Error';
import Loader from './Loader';
import Header from './Header';
import Main from './Main';
import StartScreen from './StartScreen';
import Questions from './Questions';

const initialState = {
	questions: [],

	// 'loading', 'error','ready','active','finished
	status: 'loading',
	index: 0,
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

		default:
			throw new Error('Action unknown');
	}
}

export default function App() {
	const [{ questions, status, index }, dispatch] = useReducer(reducer, initialState);

	const numQuestions = questions.length;

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
				{status === 'active' && <Questions questions={questions[index]} />}
			</Main>
		</div>
	);
}
