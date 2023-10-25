/* instalujemy nasz router npm i react-router-dom */
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Product from './pages/Product';
import Pricing from './pages/Pricing';
import PageNotFount from './pages/PageNotFount';
import AppLeyout from './pages/AppLayout';
import Login from './pages/Login';

export default function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route index element={<Homepage />} />
				<Route path='product' element={<Product />} />
				<Route path='pricing' element={<Pricing />} />
				<Route path='app' element={<AppLeyout />}>
					<Route index element={<p>List of Cities</p>} />
					<Route path='cities' element={<p>List of cities</p>} />
					<Route path='countries' element={<p>Countries</p>} />
					<Route path='form' element={<p>Form</p>} />
				</Route>
				<Route path='login' element={<Login />} />
				<Route path='*' element={<PageNotFount />} />
			</Routes>
		</BrowserRouter>
	);
}
