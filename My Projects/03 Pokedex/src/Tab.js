function Tab({ name, generation, onClick }) {
	return (
		<button onClick={onClick}>
			<strong>{name}</strong>
			<p>{generation}</p>
		</button>
	);
}

export default Tab;
