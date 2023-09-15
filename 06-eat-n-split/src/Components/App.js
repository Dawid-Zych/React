import Button from './Button';
import FormAddFriend from './FormAddFriend';
import FriendsList from './FriendsList';
import FormSplitBill from './FormSplitBill';

export default function App() {
	return (
		<div className='app'>
			<div className='sidebar'>
				<FriendsList />
				<FormAddFriend />
				<Button>Add friend</Button>
			</div>
			<FormSplitBill/>
		</div>
	);
}
