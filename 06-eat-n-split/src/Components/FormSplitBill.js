import Button from './Button';

export default function FormSplitBill({ selectedFriend }) {
	return (
		<form className='form-split-bill'>
			<h2>Split a bill with {selectedFriend.name}</h2>

			<label>💰 Bill value</label>
			<input type='text'></input>

			<label>🧍‍♀️ Your expanse</label>
			<input type='text'></input>

			<label>👫 {selectedFriend.name}'s expanse</label>
			<input type='text' disabled></input>

			<label>🤑 Who is paying the bill</label>
			<select>
				<option value='user'>You</option>
				<option value='friend'>{selectedFriend.name}</option>
			</select>
			<Button>Split bill</Button>
		</form>
	);
}
