import './App.css';

const skills = [
	{
		skill: 'HTML+CSS',
		level: 'advenced',
		color: 'royalblue',
	},
	{
		skill: 'JavaScript',
		level: 'advenced',
		color: 'yellow',
	},
	{
		skill: 'Web Design',
		level: 'advenced',
		color: 'green',
	},
	{
		skill: 'Git and Github',
		level: 'intermediate',
		color: 'red',
	},
	{
		skill: 'React',
		level: 'baginner',
		color: 'lightblue',
	},
	{
		skill: 'MongoDB',
		level: 'intermediate',
		color: 'grey',
	},
];

export default function App() {
	return (
		<div className='card'>
			<Avatar />
			<div className='data'>
				<Intro />
				<SkillList />
			</div>
		</div>
	);
}

function Avatar() {
	return <img className='avatar' src='picture.jpg' alt='myPhoto'></img>;
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
		<ul className='skill-list'>
			{skills.map(skill => (
				<Skill skill={skill.skill} color={skill.color} level={skill.level} key={skill.skill} />
			))}
		</ul>
	);
}

function Skill({ skill, color, level }) {
	return (
		<li className='skill' style={{ backgroundColor: color }}>
			<span>{skill}</span>
			{/* <span>{level === 'advenced' ? '🤠' : level === 'intermediate' ? '🤩' : '😫'}</span> */}
			<span>
				{level === 'baginner' && '👶'}
				{level === 'intermediate' && '🥳'}
				{level === 'advenced' && '🤓'}
			</span>
		</li>
	);
}
