function Pokemon({ name, imgSrc, num, checkboxes, dispatch }) {
	const pokemonName = name.charAt(0).toUpperCase() + name.slice(1);
	const urlParts = num.split('/');
	const numPokemon = urlParts[urlParts.length - 2];

	return (
		<li>
			<p>
				#{numPokemon} {pokemonName}
			</p>
			{imgSrc && <img src={imgSrc} alt={name} />}
			<div className='pokemon-form'>
				<label>
					<input
						type='checkbox'
						checked={checkboxes.checkbox1}
						onChange={() => {
							const newChecked = !checkboxes.checkbox1;
							dispatch({
								type: 'TOGGLE_CHECKBOX',
								payload: { pokemonName: name, checkbox: 'checkbox1', checked: newChecked },
							});
						}}
					/>
					Checkbox 1
				</label>
				<label>
					<input
						type='checkbox'
						checked={checkboxes.checkbox2}
						onChange={() => {
							const newChecked = !checkboxes.checkbox2;
							dispatch({
								type: 'TOGGLE_CHECKBOX',
								payload: { pokemonName: name, checkbox: 'checkbox2', checked: newChecked },
							});
						}}
					/>
					Checkbox 2
				</label>
				<label>
					<input
						type='checkbox'
						checked={checkboxes.checkbox3}
						onChange={() => {
							const newChecked = !checkboxes.checkbox3;
							dispatch({
								type: 'TOGGLE_CHECKBOX',
								payload: { pokemonName: name, checkbox: 'checkbox3', checked: newChecked },
							});
						}}
					/>
					Checkbox 3
				</label>
			</div>
		</li>
	);
}

export default Pokemon;
