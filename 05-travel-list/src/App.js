import Logo from './Components/Logo.js';
import Form from './Components/Form.js';
import Stats from './Components/Stats.js';
import PackingList from './Components/PackingList.js';

const initialItems = [
	{ id: 1, description: 'Passports', quantity: 2, packed: false },
	{ id: 2, description: 'Socks', quantity: 12, packed: true },
	{ id: 3, description: 'Charger', quantity: 1, packed: false },
];

export default function App() {
	return (
		<div className='app'>
			<Logo />
			<Form />
			<PackingList initial={initialItems} />
			<Stats />
		</div>
	);
}
