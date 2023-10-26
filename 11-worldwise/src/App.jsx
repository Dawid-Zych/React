/* instalujemy nasz router npm i react-router-dom */
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';

import Homepage from './pages/Homepage';
import Product from './pages/Product';
import Pricing from './pages/Pricing';
import PageNotFount from './pages/PageNotFount';
import AppLeyout from './pages/AppLayout';
import Login from './pages/Login';
import CityList from './components/AppNav/Sidebar/City/CityList';
import CountryList from './components/AppNav/Sidebar/City/CountryList';
import City from './components/AppNav/Sidebar/City/City';

const BASE_URL = 'http://localhost:8000/cities';
export default function App() {
	const [cities, setCities] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
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

	return (
		<BrowserRouter>
			<Routes>
				<Route index element={<Homepage />} />
				<Route path='product' element={<Product />} />
				<Route path='pricing' element={<Pricing />} />
				<Route path='app' element={<AppLeyout />}>
					<Route index element={<CityList cities={cities} isLoading={isLoading} />} />
					<Route path='cities' element={<CityList cities={cities} isLoading={isLoading} />} />
					<Route path='cities/:id' element={<City />} />
					<Route path='countries' element={<CountryList cities={cities} isLoading={isLoading} />} />
					<Route path='form' element={<p>Form</p>} />
				</Route>
				<Route path='login' element={<Login />} />
				<Route path='*' element={<PageNotFount />} />
			</Routes>
		</BrowserRouter>
	);
}
