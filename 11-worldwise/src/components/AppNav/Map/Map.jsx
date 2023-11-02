import { useNavigate, useSearchParams } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet';
import styles from './Map.module.css';
import { useEffect, useState } from 'react';
import { useCities } from '../../../../contexts/CitiesContext';
import PropTypes from 'prop-types';
/* instalujemy nasza mape 
 npm i react-leaflet leaflet */
const flagemojiToPNG = flag => {
	var countryCode = Array.from(flag, codeUnit => codeUnit.codePointAt())
		.map(char => String.fromCharCode(char - 127397).toLowerCase())
		.join('');
	return <img src={`https://flagcdn.com/24x18/${countryCode}.png`} alt='flag' />;
};

function Map() {
	const { cities } = useCities();
	const [mapPosition, setMapPosition] = useState([40, 0]);
	const [searchParams] = useSearchParams();

	const mapLat = searchParams.get('lat');
	const mapLng = searchParams.get('lng');

	useEffect(
		function () {
			if (mapLat && mapLng) setMapPosition([mapLat, mapLng]);
		},
		[mapLat, mapLng]
	);

	return (
		<div className={styles.mapContainer}>
			<MapContainer className={styles.map} center={mapPosition} zoom={6} scrollWheelZoom={true}>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url='https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png'
				/>
				{cities.map(city => (
					<Marker position={[city.position.lat, city.position.lng]} key={city.id}>
						<Popup>
							<span>{flagemojiToPNG(city.emoji)}</span>
							<span>{city.cityName}</span>
						</Popup>
					</Marker>
				))}
				<ChangeCenter position={mapPosition} />
				<DetectClick />
			</MapContainer>
		</div>
	);
}

function ChangeCenter({ position }) {
	ChangeCenter.propTypes = {
		position: PropTypes.array,
	};

	const map = useMap();
	map.setView(position);
	return null;
}

function DetectClick() {
	const navigate = useNavigate();

	useMapEvents({
		click: e => {
			console.log(e);
			navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
		},
	});
}

export default Map;
