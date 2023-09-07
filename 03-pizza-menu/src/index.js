import React from 'react';
import ReactDOM from 'react-dom/client';
import pizzaData from '../src/data.js';

function App() {
	return (
		<div>
			<h2>Hello React!</h2>
			<Pizza />
			<Pizza />
			<Pizza />
			<Pizza />
		</div>
	);
}

function Pizza() {
	return (
		<div>
			<img src='pizzas/spinaci.jpg' alt='Pizza spinaci' />
			<h2>Pizza Spinaci</h2>
			<p>Tomato, mozarella, spinach, and ricotta cheese</p>
		</div>
	);
}

// React v18
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);

/* React before v18
ReactDOM.render(<App/>)
import ReactDOM from 'react-dom';
 */
