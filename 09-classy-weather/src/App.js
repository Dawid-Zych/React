import React from 'react';
import { getWeather } from './starter';

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = { location: 'lisbon' };

		this.fetchWeather = this.fetchWeather.bind(this);
	}

	fetchWeather(city) {
		console.log('Loading data...');
		console.log(this);
		console.log(city);
		getWeather(city);
	}

	render() {
		return (
			<div className='app'>
				<h1>Classy Weather</h1>
				<div>
					<input
						type='text'
						placeholder='Search for location...'
						value={this.state.location}
						onChange={e => this.setState({ location: e.target.value })}></input>
				</div>
				<button onClick={() => this.fetchWeather(this.state.location)}>Get weather</button>
			</div>
		);
	}
}

export default App;
