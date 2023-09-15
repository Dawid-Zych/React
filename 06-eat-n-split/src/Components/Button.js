export default function Button({ children, onClick }) {
	return (
		<button class='button' onClick={onClick}>
			{children}
		</button>
	);
}
