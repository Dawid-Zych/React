import Button from './Button';
import FormAddFriend from './FormAddFriend';
import FriendsList from './FriendsList';
import FormSplitBill from './FormSplitBill';
import { useState } from 'react';

export default function App() {
	const [showAddFriend, setShowAddFriend] = useState(false);

	function handleShowAddFriend() {
		setShowAddFriend(show => !show);
	}

	return (
		<div className='app'>
			<div className='sidebar'>
				<FriendsList />
				{showAddFriend && <FormAddFriend />}
				<Button onClick={handleShowAddFriend}>{showAddFriend ? 'Close' : 'Add Friend'}</Button>
			</div>
			<FormSplitBill />
		</div>
	);
}
