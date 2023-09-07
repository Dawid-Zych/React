import React from 'react';
import ReactDOM from 'react-dom/client';
import pizzaData from '../src/data.js';
import './index.css';

function App() {
	return (
		<div className='container'>
			<Header />
			<Menu />
			<Footer />
		</div>
	);
}

function Header() {
	//const style = { color: 'red', fontSize: '48px', textTransform: 'uppercase' };
	const style = {};

	return (
		<header className='header'>
			<h1 style={style}>Fast React Pizza Co.</h1>
		</header>
	);
}

function Menu() {
	return (
		<main className='menu'>
			<h2>Our menu</h2>
			<div className='pizzas'>
			    <Pizza />
    			<Pizza />
    			<Pizza />
    			<Pizza />
			</div>
		</main>
	);
}

function Footer() {
	const hour = new Date().getHours();
	const openHour = 12;
	const closeHour = 22;
	const isOpen = hour >= openHour && hour <= closeHour;
	console.log(isOpen);

	/* 	if (hour >= openHour && hour <= closeHour) alert("We're currently open!");
	else alert("We're closed!"); */

	// return React.createElement('footer', null, "We're currently open!");
	return <footer className='footer'>{isOpen ? "We're currently open!" : "We're closed!"}</footer>;
}

function Pizza() {
	return (
		<div className='pizza'>
			<img src='pizzas/spinaci.jpg' alt='Pizza spinaci' />
			<h3>Pizza Spinaci</h3>
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
