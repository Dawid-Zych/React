import { useState } from 'react';
import Button from './Button';

export default function FormAddFriend({ onAddFriend }) {
	const [name, setName] = useState('');
	const [image, setImage] = useState('https://i.pravatar.cc/48');

	function handleSubmit(e) {
		e.preventDefault();
		if (!name || !image) return;

		const id = crypto.randomUUID();
		const newFriend = {
			name,
			image: `${image}?u=${id}`,
			balance: 0,
			id,
		};
		console.log(newFriend);
		onAddFriend(newFriend);

		setImage('https://i.pravatar.cc/48');
		setName('');
	}

	return (
		<form className='form-add-friend' onSubmit={handleSubmit}>
			<label>👫Friend name</label>
			<input type='text' value={name} onChange={e => setName(e.target.value)}></input>

			<label>🖼 Image URL</label>
			<input type='text' value={image} onChange={e => setImage(e.target.value)}></input>

			<Button>Add</Button>
		</form>
	);
}
