import Logo from './Components/Logo.js';
import Form from './Components/Form.js';
import Stats from './Components/Stats.js';
import PackingList from './Components/PackingList.js';
import { useState } from 'react';

export default function App() {
	const initialItems = [
		{ id: 1, description: 'Passports', quantity: 2, packed: false },
		{ id: 2, description: 'Socks', quantity: 12, packed: true },
		{ id: 3, description: 'Charger', quantity: 1, packed: false },
	];
	const [items, setItems] = useState(initialItems);

	function handleAddItems(item) {
		setItems(items => [...items, item]);
	}

	function handleDeleteItem(id) {
		setItems(items => items.filter(item => item.id !== id));
	}

	function handleToggleItem(id) {
		setItems(items => items.map(item => (item.id === id ? { ...item, packed: !item.packed } : item)));
	}

	return (
		<div className='app'>
			<Logo />
			<Form onAddItems={handleAddItems} />
			<PackingList items={items} onDeleteItem={handleDeleteItem} onToggleItem={handleToggleItem} />
			<Stats />
		</div>
	);
}
