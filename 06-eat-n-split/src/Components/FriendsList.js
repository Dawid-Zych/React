import Friend from './Friend';

export default function FriendsList({ friends }) {
	return (
		<ul>
			{friends.map(friend => (
				<Friend friend={friend} key={friend.id} />
			))}
		</ul>
	);
}
