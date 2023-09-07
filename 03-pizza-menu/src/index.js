import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

const pizzaData = [
	{
		name: 'Focaccia',
		ingredients: 'Bread with italian olive oil and rosemary',
		price: 6,
		photoName: 'pizzas/focaccia.jpg',
		soldOut: false,
	},
	{
		name: 'Pizza Margherita',
		ingredients: 'Tomato and mozarella',
		price: 10,
		photoName: 'pizzas/margherita.jpg',
		soldOut: false,
	},
	{
		name: 'Pizza Spinaci',
		ingredients: 'Tomato, mozarella, spinach, and ricotta cheese',
		price: 12,
		photoName: 'pizzas/spinaci.jpg',
		soldOut: false,
	},
	{
		name: 'Pizza Funghi',
		ingredients: 'Tomato, mozarella, mushrooms, and onion',
		price: 12,
		photoName: 'pizzas/funghi.jpg',
		soldOut: false,
	},
	{
		name: 'Pizza Salamino',
		ingredients: 'Tomato, mozarella, and pepperoni',
		price: 15,
		photoName: 'pizzas/salamino.jpg',
		soldOut: true,
	},
	{
		name: 'Pizza Prosciutto',
		ingredients: 'Tomato, mozarella, ham, aragula, and burrata cheese',
		price: 18,
		photoName: 'pizzas/prosciutto.jpg',
		soldOut: false,
	},
];

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
	const pizzas = pizzaData;
	// const pizzas = [];
	const numPizzas = pizzas.length;

	return (
		<main className='menu'>
			<h2>Our menu</h2>

			{numPizzas > 0 ? (
				<ul className='pizzas'>
					{pizzas.map(pizza => (
						<Pizza pizzaObj={pizza} key={pizza.name} />
					))}
				</ul>
			) : (
				<p>We're still working on our menu. Please come back later :)</p>
			)}

			{/* <div className='pizzas'>
				<Pizza
					name='Pizza Spinaciaaa'
					ingredients='Tomato, mozarella, spinach, and ricotta cheese'
					photoName='pizzas/spinaci.jpg'
					price={10}
				/>
				<Pizza 
				    name='Pizza Funghi'
				    ingredients='Tomato,mushrooms'					
				    price={12}					
				    photoName='pizzas/funghi.jpg' />
				<Pizza />
			</div> */}
		</main>
	);
}

function Pizza(props) {
	if (props.pizzaObj.soldOut) return null;

	return (
		<li className='pizza'>
			<img src={props.pizzaObj.photoName} alt={props.pizzaObj.name} />
			<div>
				<h3>{props.pizzaObj.name}</h3>
				<p>{props.pizzaObj.ingredients}</p>
				<span>{props.pizzaObj.price}</span>
			</div>
		</li>
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

	//if (!isOpen) return<p>CLOSED</p>

	return (
		<footer className='footer'>
			{isOpen ? (
				<Order closeHour={closeHour} />
			) : (
				<p>
					We're happy to welcome you between {openHour}:00 and {closeHour}:00
				</p>
			)}
		</footer>
	);
}

function Order(props) {
	return (
		<div className='order'>
			<p>We're currently open until {props.closeHour}:00. Come visit us or order online!</p>
			<button className='btn'>Order</button>
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
