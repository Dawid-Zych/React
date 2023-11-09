import { useContext, createContext, useReducer, useEffect } from 'react';

const QuizContext = createContext();
const SECS_PER_QUESTION = 30;

const initialState = {
	questions: [],
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

		case 'tick':
			return {
				...state,
				secondsRemaining: state.secondsRemaining - 1,
				status: state.secondsRemaining === 0 ? 'finished' : state.status,
				highscore: state.secondsRemaining === 0 ? Math.max(state.points, state.highscore) : state.highscore,
			};

		default:
			throw new Error('Action unknown');
	}
}

function QuizProvider({ children }) {
	const [{ questions, status, index, answer, points, highscore, secondsRemaining }, dispatch] = useReducer(
		reducer,
		initialState
	);
	const numQuestions = questions.length;
	const maxPossiblePoints = questions.reduce((prev, curr) => prev + curr.points, 0);

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
		<QuizContext.Provider
			value={{
				questions,
				question: questions[index],
				status,
				index,
				answer,
				points,
				highscore,
				secondsRemaining,
				numQuestions,
				maxPossiblePoints,
				dispatch,
			}}>
			{children}
		</QuizContext.Provider>
	);
}

function useQuizContext() {
	const context = useContext(QuizContext);
	if (context === undefined) throw new Error('QuizContext was used outside the QuizProvider');
	return context;
}

export { QuizProvider, useQuizContext };
