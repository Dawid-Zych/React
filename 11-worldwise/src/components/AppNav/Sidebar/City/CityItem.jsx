import PropTypes from 'prop-types';
import styles from './CityItem.module.css';

const formatDate = date =>
	new Intl.DateTimeFormat('en', {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
	}).format(new Date(date));

function CityItem({ city }) {
	CityItem.propTypes = {
		city: PropTypes.shape({
			cityName: PropTypes.string,
			country: PropTypes.string,
			emoji: PropTypes.string,
			date: PropTypes.string,
			notes: PropTypes.string,
			position: PropTypes.shape({
				lat: PropTypes.number,
				lng: PropTypes.number,
			}),
			id: PropTypes.number,
		}),
	};

	const { cityName, emoji, date } = city;
	return (
		<li className={styles.cityItem}>
			<span className={styles.emoji}>{emoji}</span>
			<h3 className={styles.name}>{cityName}</h3>
			<time className={styles.date}>{formatDate(date)}</time>
			<button className={styles.deleteBtn}>&times;</button>
		</li>
	);
}

export default CityItem;
