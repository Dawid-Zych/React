import PropTypes from 'prop-types';
import styles from './CityItem.module.css';
import { Link } from 'react-router-dom';
import { useCities } from '../contexts/CitiesContext';

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
	const { currentCity } = useCities();
	const { cityName, emoji, date, id, position } = city;
	return (
		<li>
			<Link
				to={`${id}?lat=${position.lat}&lng=${position.lng}`}
				className={`
				${styles.cityItem} 
				${id === currentCity.id ? styles['cityItem--active'] : ''}`}>
				<span className={styles.emoji}>{emoji}</span>
				<h3 className={styles.name}>{cityName}</h3>
				<time className={styles.date}>{formatDate(date)}</time>
				<button className={styles.deleteBtn}>&times;</button>
			</Link>
		</li>
	);
}

export default CityItem;
