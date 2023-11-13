/* instalujemy nasz router npm i react-router-dom */
import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { CitiesProvider } from './contexts/CitiesContext';
import { AuthProvider } from './contexts/FakeAuthContext';
import ProtectedRoute from './pages/ProtectedRoute';
import CityList from './components/CityList';
import CountryList from './components/CountryList';
import City from './components/City';
import Form from './components/Form';
import SpinnerFullPage from './components/SpinnerFullPage';
// import Product from './pages/Product';
// import Pricing from './pages/Pricing';
// import Homepage from './pages/Homepage';
// import Login from './pages/Login';
// import AppLeyout from './pages/AppLayout';
// import PageNotFound from './pages/PageNotFound';

const Homepage = lazy(() => import('./pages/Homepage'));
const Product = lazy(() => import('./pages/Product'));
const Pricing = lazy(() => import('./pages/Pricing'));
const Login = lazy(() => import('./pages/Login'));
const AppLeyout = lazy(() => import('./pages/AppLayout'));
const PageNotFound = lazy(() => import('./pages/PageNotFound'));

// dist/assets/index-95636945.css   31.32 kB │ gzip:   5.23 kB
// dist/assets/index-5d6de762.js   529.40 kB │ gzip: 150.10 kB

export default function App() {
	return (
		<AuthProvider>
			<CitiesProvider>
				<BrowserRouter>
					<Suspense fallback={<SpinnerFullPage />}>
						<Routes>
							<Route index element={<Homepage />} />
							<Route path='product' element={<Product />} />
							<Route path='pricing' element={<Pricing />} />
							<Route path='login' element={<Login />} />
							<Route
								path='app'
								element={
									<ProtectedRoute>
										<AppLeyout />
									</ProtectedRoute>
								}>
								<Route index element={<Navigate replace to='cities' />} />
								<Route path='cities' element={<CityList />} />
								<Route path='cities/:id' element={<City />} />
								<Route path='countries' element={<CountryList />} />
								<Route path='form' element={<Form />} />
							</Route>
							<Route path='*' element={<PageNotFound />} />
						</Routes>
					</Suspense>
				</BrowserRouter>
			</CitiesProvider>
		</AuthProvider>
	);
}
