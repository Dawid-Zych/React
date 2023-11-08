import { createContext, useEffect, useContext, useReducer } from 'react';
import PropTypes from 'prop-types';

const BASE_URL = 'http://localhost:8000/cities';
const CitiesContext = createContext();

function reducer(state, action) {
	switch (action.type) {
		case 'loading':
			return {
				...state,
				isLoading: true,
			};
		case 'cities/loaded':
			return {
				...state,
				isLoading: false,
				cities: action.payload,
			};
		case 'city/loaded':
			return {
				...state,
				isLoading: false,
				currentCity: action.payload,
			};

		case 'city/created':
			return {
				...state,
				isLoading: false,
				cities: [...state.cities, action.payload],
				currentCity: action.payload,
			};

		case 'city/deleted':
			return {
				...state,
				isLoading: false,
				cities: state.cities.filter(city => city.id !== action.payload),
				currentCity: {},
			};

		case 'rejected':
			return {
				...state,
				isLoading: false,
				error: action.payload,
			};

		default:
			throw new Error('Unknown action type');
	}
}

const initialState = {
	cities: [],
	isLoading: false,
	currentCity: {},
	error: '',
};

function CitiesProvider({ children }) {
	const [{ cities, isLoading, currentCity, error }, dispatch] = useReducer(reducer, initialState);

	CitiesProvider.propTypes = {
		children: PropTypes.any,
	};

	useEffect(function () {
		async function fetchCities() {
			dispatch({ type: 'loading' });

			try {
				const res = await fetch(BASE_URL);
				const data = await res.json();
				dispatch({ type: 'cities/loaded', payload: data });
			} catch {
				dispatch({ type: 'rejected', payload: 'There was an error loading cities...' });
			}
		}
		fetchCities();
	}, []);

	async function getCity(id) {
		if (Number(id) === currentCity.id) {
			return;
		}

		dispatch({ type: 'loading' });
		try {
			const res = await fetch(`${BASE_URL}/${id}`);
			const data = await res.json();
			dispatch({ type: 'city/loaded', payload: data });
		} catch {
			dispatch({ type: 'rejected', payload: 'There was an error loading city...' });
		}
	}

	async function createCity(newCity) {
		try {
			dispatch({ type: 'loading' });
			const res = await fetch(`${BASE_URL}`, {
				method: 'POST',
				body: JSON.stringify(newCity),
				headers: {
					'Content-Type': 'application/json',
				},
			});

			const data = await res.json();

			dispatch({ type: 'city/created', payload: data });
		} catch {
			dispatch({ type: 'rejected', payload: 'There was an error creating city...' });
		}
	}
	async function deleteCity(id) {
		try {
			dispatch({ type: 'loading' });
			await fetch(`${BASE_URL}/${id}`, {
				method: 'DELETE',
			});
			dispatch({ type: 'city/deleted', payload: id });
		} catch {
			dispatch({ type: 'rejected', payload: 'There was an error loading data...' });
		}
	}

	return (
		<CitiesContext.Provider
			value={{
				cities,
				isLoading,
				currentCity,
				error,
				getCity,
				createCity,
				deleteCity,
			}}>
			{children}
		</CitiesContext.Provider>
	);
}
function useCities() {
	const context = useContext(CitiesContext);

	if (context === undefined) throw new Error('CitiesContext was used outside the CitiesProvider');

	return context;
}
export { CitiesProvider, useCities };
