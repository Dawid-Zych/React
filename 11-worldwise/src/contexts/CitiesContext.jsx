import { createContext, useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';

const BASE_URL = 'http://localhost:8000/cities';
const CitiesContext = createContext();

function CitiesProvider({ children }) {
	const [cities, setCities] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [currentCity, setCurrentCity] = useState({});

	CitiesProvider.propTypes = {
		children: PropTypes.any,
	};

	useEffect(function () {
		async function fetchCities() {
			try {
				setIsLoading(true);
				const res = await fetch(BASE_URL);
				const data = await res.json();
				setCities(data);
			} catch {
				alert('There was an error loading data...');
			} finally {
				setIsLoading(false);
			}
		}
		fetchCities();
	}, []);

	async function getCity(id) {
		try {
			setIsLoading(true);
			const res = await fetch(`${BASE_URL}/${id}`);
			const data = await res.json();
			setCurrentCity(data);
			console.log(data);
		} catch {
			alert('There was an error loading data...');
		} finally {
			setIsLoading(false);
		}
	}

	return (
		<CitiesContext.Provider
			value={{
				cities,
				isLoading,
				currentCity,
				getCity,
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
