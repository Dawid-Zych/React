import Error from './Error';
import Loader from './Loader';
import Header from './Header';
import Main from './Main';

export default function App() {
	return (
		<div className='app'>
			<Header />
			<Main>
				<p>1/15</p>
				<p>Question?</p>
			</Main>
		</div>
	);
}
