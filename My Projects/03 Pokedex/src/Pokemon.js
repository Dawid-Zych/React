import { useState, useEffect } from 'react';

function Pokemon({ name, imgSrc, num, checked, dispatch }) {
	const [isChecked, setIsChecked] = useState(false);
	const pokemonName = name.charAt(0).toUpperCase() + name.slice(1);
	const urlParts = num.split('/');
	const numPokemon = urlParts[urlParts.length - 2];

	useEffect(() => {
		setIsChecked(checked);
	}, [checked]);

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
						checked={isChecked}
						onChange={() => {
							const newChecked = !isChecked;
							setIsChecked(newChecked);
							dispatch({
								type: 'TOGGLE_CHECKBOX',
								payload: { pokemonName: name, checked: newChecked },
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
