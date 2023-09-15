import Friend from './Friend';

export default function FriendsList({ friends, onSelection, selectedFriend }) {
	return (
		<ul>
			{friends.map(friend => (
				<Friend friend={friend} key={friend.id} onSelection={onSelection} selectedFriend={selectedFriend} />
			))}
		</ul>
	);
}
