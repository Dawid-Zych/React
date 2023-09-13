import Logo from './Components/Logo.js';
import Form from './Components/Form.js';
import Stats from './Components/Stats.js';
import PackingList from './Components/PackingList.js';
import { useState } from 'react';

export default function App() {
	const [items, setItems] = useState([]);

	function handleAddItems(item) {
		setItems(items => [...items, item]);
	}

	function handleDeleteItem(id) {
		setItems(items => items.filter(item => item.id !== id));
	}

	return (
		<div className='app'>
			<Logo />
			<Form onAddItems={handleAddItems} />
			<PackingList items={items} onDeleteItems={handleDeleteItem} />
			<Stats />
		</div>
	);
}
