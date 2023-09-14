import { useState } from 'react';

export default function PackingList({ items, onDeleteItem, onToggleItem }) {
	const [sortBy, setSortBy] = useState('input');

	let sortedItems;

	if (sortBy === 'input') sortedItems = items;
	if (sortBy === 'description')
		sortedItems = items.slice().sort((a, b) => a.description.localeCompare(b.description));
	if (sortBy === 'packed') sortedItems = items.toSorted((a, b) => Number(a.packed) - Number(b.packed));
	return (
		<div className='list'>
			<ul>
				{sortedItems.map(item => (
					<Item item={item} key={item.id} onDeleteItem={onDeleteItem} onToggleItem={onToggleItem} />
				))}
			</ul>

			<div className='action'>
				<select value={sortBy} onChange={e => setSortBy(e.target.value)}>
					<option value='input'>Sort by input order</option>
					<option value='description'>Sort by description</option>
					<option value='packed'>Sort by packed status</option>
				</select>
			</div>
		</div>
	);
}

function Item({ item, onDeleteItem, onToggleItem }) {
	return (
		<li>
			<input type='checkbox' value={item.packed} onChange={() => onToggleItem(item.id)} />
			<span style={item.packed ? { textDecoration: 'line-through' } : {}}>
				{item.quantity} {item.description}
			</span>
			<button onClick={() => onDeleteItem(item.id)}>❌</button>
		</li>
	);
}
