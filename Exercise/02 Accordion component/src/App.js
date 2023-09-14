import './styles.css';
import { useState } from 'react';

const faqs = [
	{
		title: 'Where are these chairs assembled?',
		text: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium, quaerat temporibus quas dolore provident nisi ut aliquid ratione beatae sequi aspernatur veniam repellendus.',
	},
	{
		title: 'How long do I have to return my chair?',
		text: 'Pariatur recusandae dignissimos fuga voluptas unde optio nesciunt commodi beatae, explicabo natus.',
	},
	{
		title: 'Do you ship to countries outside the EU?',
		text: 'Excepturi velit laborum, perspiciatis nemo perferendis reiciendis aliquam possimus dolor sed! Dolore laborum ducimus veritatis facere molestias!',
	},
];

export default function App() {
	return (
		<div>
			<Accordion data={faqs} />
		</div>
	);
}

function Accordion({ data }) {
	// const [isOpen, setIsOpen] = useState(false);
	const [curOpen, setCurOpen] = useState(null);

	return (
		<div className='accordion'>
			{data.map((el, index) => (
				<AccordionItem curOpen={curOpen} onOpen={setCurOpen} num={index} title={el.title} key={el.title}>
					{el.text}
				</AccordionItem>
			))}

			<AccordionItem
				curOpen={curOpen}
				onOpen={setCurOpen}
				num={22}
				title='Thinking in React'
				key='Thinking in React'>
				<p>Allows React developers to:</p>
				<ul>
					<li>Break up UI into components</li>
					<li>Make components reusuable</li>
					<li>Place state efficiently</li>
				</ul>
			</AccordionItem>
		</div>
	);
}

function AccordionItem({ num, title, curOpen, onOpen, children }) {
	const isOpen = num === curOpen;

	function handleToggle() {
		onOpen(isOpen ? null : num);
	}

	return (
		<div className={` item ${isOpen ? 'open item' : ''}`} onClick={handleToggle}>
			<p className='number'>{num < 9 ? `0${num + 1}` : num + 1}</p>
			<p className='title'>{title}</p>
			<p className='icon'>{isOpen ? '-' : '+'}</p>

			{isOpen && <div className='content-box'>{children}</div>}
		</div>
	);
}
