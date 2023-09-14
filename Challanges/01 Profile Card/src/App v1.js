import './App.css';

export default function App() {
	return (
		<div className='card'>
			<Avatar />
			<div className='data'>
				<Intro />
				{/* Should contain one Skill component
        for each web dev skill that you have,
        customized with props */}
				<SkillList />
			</div>
		</div>
	);
}

function Avatar() {
	return <img className='avatar' src='picture.jpg' alt='myPhoto' />;
}

function Intro() {
	return (
		<div>
			<h1>Dawid Zych </h1>
			<p>
				Highly motivated with a solid foundation in programming and market trends, with aninnate ability to
				learn and master new technologies
			</p>
		</div>
	);
}

function SkillList() {
	return (
		<div className='skill-list'>
			<Skill skill='HTML+CSS' emoji='💪' color='royalblue' />
			<Skill skill='JavaScript' emoji='💪' color='yellow' />
			<Skill skill='Git and Github' emoji='💪' color='red' />
			<Skill skill='Web Design' emoji='💪' color='green' />
			<Skill skill='React' emoji='💪' color='lightblue' />
			<Skill skill='MongoDB' emoji='👶' color='grey' />
		</div>
	);
}

function Skill(props) {
	return (
		<div className='skill' style={{ backgroundColor: props.color }}>
			<span>{props.skill}</span>
			<span>{props.emoji}</span>
		</div>
	);
}
