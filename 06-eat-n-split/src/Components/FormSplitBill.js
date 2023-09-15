import Button from './Button';

export default function FormSplitBill() {
	return (
		<form className='form-split-bill'>
			<h2>Split a bill with X</h2>

			<label>💰 Bill value</label>
			<input type='text'></input>

			<label>🧍‍♀️ Your expanse</label>
			<input type='text'></input>

			<label>👫 X's expanse</label>
			<input type='text' disabled></input>

			<label>🤑 Who is paying the bill</label>
            <select>
                <option value='user'>You</option>
                <option value='friend'>x</option>
            </select>
			<Button>Split bill</Button>
		</form>
	);
}
