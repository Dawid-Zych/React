import Header from './Header';
import Loader from './Loader';
import CartOverview from '../features/cart/CartOverview';
import { Outlet, useNavigation } from 'react-router-dom';

function AppLayout() {
	const navigation = useNavigation();
	const isLoading = navigation.state === 'loading';

	console.log(navigation);

	return (
		<div className='layout'>
			<Header />

			<main>
				{isLoading ? <Loader /> : <Outlet />}
			</main>

			<CartOverview />
		</div>
	);
}

export default AppLayout;
