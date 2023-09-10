import Logo from './Components/Logo.js';
import Form from './Components/Form.js';
import Stats from './Components/Stats.js';
import PackingList from './Components/PackingList.js';

export default function App() {
	return (
		<div className='app'>
			<Logo />
			<Form />
			<PackingList />
			<Stats />
		</div>
	);
}
