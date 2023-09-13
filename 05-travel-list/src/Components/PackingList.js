export default function PackingList({ items }) {
	const initialItems = [
		{ id: 1, description: 'Passports', quantity: 2, packed: false },
		{ id: 2, description: 'Socks', quantity: 12, packed: true },
		{ id: 3, description: 'Charger', quantity: 1, packed: false },
	];
	return (
		<div className='list'>
			<ul>
				{items.map(item => (
					<Item item={item} key={item.id} />
				))}
			</ul>
		</div>
	);
}

function Item({ item }) {
	return (
		<li>
			<span style={item.packed ? { textDecoration: 'line-throught' } : {}}>
				{item.quantity} {item.description}
			</span>
			<button>❌</button>
		</li>
	);
}
