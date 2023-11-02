/* instalujemy nasz router npm i react-router-dom */
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { CitiesProvider } from './contexts/CitiesContext';
import Homepage from './pages/Homepage';
import Product from './pages/Product';
import Pricing from './pages/Pricing';
import PageNotFound from './pages/PageNotFound';
import AppLeyout from './pages/AppLayout';
import Login from './pages/Login';
import CityList from './components/CityList';
import CountryList from './components/CountryList';
import City from './components/City';
import Form from './components/Form';

export default function App() {
	return (
		<CitiesProvider>
			<BrowserRouter>
				<Routes>
					<Route index element={<Homepage />} />
					<Route path='product' element={<Product />} />
					<Route path='pricing' element={<Pricing />} />
					<Route path='app' element={<AppLeyout />}>
						<Route index element={<Navigate replace to='cities' />} />
						<Route path='cities' element={<CityList />} />
						<Route path='cities/:id' element={<City />} />
						<Route path='countries' element={<CountryList />} />
						<Route path='form' element={<Form />} />
					</Route>
					<Route path='login' element={<Login />} />
					<Route path='*' element={<PageNotFound />} />
				</Routes>
			</BrowserRouter>
		</CitiesProvider>
	);
}
