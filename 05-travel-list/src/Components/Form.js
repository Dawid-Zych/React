export default function Form() {
	function handleSubmit(e) {
		e.preventDefault();

	}

	return (
		<form className='add-form' onSubmit={handleSubmit}>
			<h3>What do you need for your 😍 trip?</h3>
			<select>
				{Array.from({ length: 20 }, (_, i) => i + 1).map(num => (
					<option value={num} key={num}>
						{num}
					</option>
				))}
			</select>
			<input type='text' placeholder='Item...'></input>
			<button>Add</button>
		</form>
	);
}
