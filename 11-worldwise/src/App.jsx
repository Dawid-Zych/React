/* instalujemy nasz router npm i react-router-dom */
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Product from './pages/Product';
import Pricing from './pages/Pricing';
import PageNotFount from './pages/PageNotFount';

export default function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Homepage />}></Route>
				<Route path='product' element={<Product />}></Route>
				<Route path='pricing' element={<Pricing />}></Route>
        <Route path='*' element={<PageNotFount />}></Route>
			</Routes>
		</BrowserRouter>
	);
}
