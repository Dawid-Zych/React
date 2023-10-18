import { useState, useEffect, useRef } from 'react';

function getWeatherIcon(wmoCode) {
	const icons = new Map([
		[[0], '☀️'],
		[[1], '🌤'],
		[[2], '⛅️'],
		[[3], '☁️'],
		[[45, 48], '🌫'],
		[[51, 56, 61, 66, 80], '🌦'],
		[[53, 55, 63, 65, 57, 67, 81, 82], '🌧'],
		[[71, 73, 75, 77, 85, 86], '🌨'],
		[[95], '🌩'],
		[[96, 99], '⛈'],
	]);
	const arr = [...icons.keys()].find(key => key.includes(wmoCode));
	if (!arr) return 'NOT FOUND';
	return icons.get(arr);
}

function convertToFlag(countryCode) {
	const codePoints = countryCode
		.toUpperCase()
		.split('')
		.map(char => 127397 + char.charCodeAt());
	return String.fromCodePoint(...codePoints);
}

function formatDay(dateStr) {
	return new Intl.DateTimeFormat('en', {
		weekday: 'short',
	}).format(new Date(dateStr));
}

export default function App() {
	const [location, setLocation] = useState('');
	const [weather, setWeather] = useState({});
	const [isLoading, setIsLoading] = useState(false);
	const [displayLocation, setDisplayLocation] = useState('');

	useEffect(function () {
		const item = localStorage.getItem('location');
		if (item) setLocation(JSON.parse(localStorage.getItem('location')));
	}, []);

	useEffect(
		function () {
			async function fetchWeather() {
				if (location.length < 3) return setWeather({});
				try {
					setIsLoading(true);

					// 1) Getting location (geocoding)
					const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${location}`);
					const geoData = await geoRes.json();

					if (!geoData.results) throw new Error('Location not found');

					const { latitude, longitude, timezone, name, country_code } = geoData.results.at(0);
					setDisplayLocation(`${name} ${convertToFlag(country_code)}`);

					// 2) Getting actual weather
					const weatherRes = await fetch(
						`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&timezone=${timezone}&daily=weathercode,temperature_2m_max,temperature_2m_min`
					);
					const weatherData = await weatherRes.json();
					setWeather(weatherData.daily);
					localStorage.setItem('location', JSON.stringify(location));
				} catch (err) {
					console.error(err);
				} finally {
					setIsLoading(false);
				}
			}
			fetchWeather();
		},
		[location]
	);

	return (
		<div className='app'>
			<h1>Classy Weather</h1>
			<Input location={location} onChangeLocation={setLocation} />
			{isLoading && <p className='loader'>Loading....</p>}
			{weather.weathercode && <Weather weather={weather} location={displayLocation} />}
		</div>
	);
}

function Input({ location, onChangeLocation }) {
	const inputEl = useRef(null);

	useEffect(
		function () {
			function callback(e) {
				if (document.activeElement === inputEl.current) return;

				if (e.code === 'Enter') {
					inputEl.current.focus();
				}
			}

			document.addEventListener('keydown', callback);
			return () => document.removeEventListener('keydown', callback);
		},
		[onChangeLocation]
	);

	return (
		<div>
			<input
				type='text'
				placeholder='Search for location...'
				value={location}
				onChange={e => onChangeLocation(e.target.value)}
				ref={inputEl}></input>
		</div>
	);
}

function Weather({ weather, location }) {
	const { temperature_2m_max: max, temperature_2m_min: min, time: dates, weathercode: codes } = weather;
	return (
		<div>
			<h2>Weather {location}</h2>
			<ul className='weather'>
				{dates.map((date, index) => (
					<Day
						date={date}
						max={max.at(index)}
						min={min.at(index)}
						code={codes.at(index)}
						key={date}
						isToday={index === 0}
					/>
				))}
			</ul>
		</div>
	);
}

function Day({ date, max, min, code, isToday }) {
	return (
		<li className={isToday ? 'day  important' : 'day'}>
			<span>{getWeatherIcon(code)}</span>
			<p>{isToday ? 'Today' : formatDay(date)}</p>
			<p>
				{Math.floor(min)}&deg; &mdash; <strong>{Math.ceil(max)}&deg;</strong>
			</p>
		</li>
	);
}
