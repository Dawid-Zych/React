import React from 'react';
import ReactDOM from 'react-dom/client';
import pizzaData from '../src/data.js';

function App() {
	return (
		<div>
			<Header />
			<Menu />
			<Footer />
		</div>
	);
}

function Header() {
	return <h1>Fast React Pizza Co.</h1>;
}

function Menu() {
	return (
		<div>
			<h2>Our menu</h2>
			<Pizza />
			<Pizza />
			<Pizza />
			<Pizza />
		</div>
	);
}

function Footer() {
	// return React.createElement('footer', null, "We're currently open!");
	return <footer>{new Date().toLocaleTimeString()}. We're currently open!</footer>;
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
