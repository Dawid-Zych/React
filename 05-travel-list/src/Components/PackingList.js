export default function PackingList({ initial }) {
	return (
		<div className='list'>
			<ul>
				{initial.map(item => (
					<Item item={item} key={item.id} />
				))}
			</ul>
		</div>
	);
}

function Item({ item }) {
	return (
		<li>
			<span style={item.packed ? {textDecoration: 'line-throught'} : {}}>
				{item.quantity} {item.description}
			</span>
			<button>❌</button>
		</li>
	);
}
