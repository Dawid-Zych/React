import { useState } from 'react';
import AddTask from './AddTask';

const initialTask = [
	{
		id: 1,
		task: 'Give dog a bath',
		list: 'Private',
		priority: 'Low',
	},
	{
		id: 2,
		task: 'Do laundry',
		list: 'Private',
		priority: 'High',
	},
	{
		id: 3,
		task: 'Vacuum floor',
		list: 'Private',
		priority: 'Low',
	},
	{
		id: 4,
		task: 'Feed cat',
		list: 'Private',
		priority: 'Low',
	},
	{
		id: 5,
		task: 'Change light bulbs',
		list: 'Private',
		priority: 'Low',
	},
	{
		id: 6,
		task: 'Go to Store',
		list: 'Private',
		priority: 'High',
	},
	{
		id: 7,
		task: 'Fill gas tank',
		list: 'Work',
		priority: 'High',
	},
];

export default function App() {
	const [isOpen, setIsOpen] = useState(false);
	const [taskList, setTaskList] = useState([]);

	function handleDeleteTask(id) {
		setTaskList(item => taskList.filter(item => item.id !== id));
	}

	function handleEditTask(newtask) {
		setTaskList(tasks => tasks.map(item => (item.id === newtask.id ? { ...newtask } : item)));
	}

	function handleAddTask(task) {
		setTaskList(item => [...item, task]);
		setIsOpen(false);
	}
	return (
		<>
			<div className='container'>
				<h2>React ToDo App</h2>
				<ul>
					{taskList.map(task => (
						<TaskList task={task} key={task.id} onDelete={handleDeleteTask} onEdit={handleEditTask} />
					))}
				</ul>

				<Button className='add-task' onClick={() => setIsOpen(isOpen => !isOpen)}>
					Add Task
				</Button>
			</div>
			{isOpen && <AddTask onAdd={handleAddTask} setIsOpen={setIsOpen} />}
		</>
	);
}

function TaskList({ task, onDelete, onEdit }) {
	const [checked, setChecked] = useState(false);
	const [edit, setEdit] = useState(false);
	const [editedTask, setEditedTask] = useState({ ...task });

	const handleInputChange = event => {
		const { name, value } = event.target;
		setEditedTask(prevEditedTask => ({
			...prevEditedTask,
			[name]: value,
		}));
	};

	const handleSaveEdit = () => {
		console.log(editedTask);
		onEdit(editedTask);
		setEdit(false);
	};

	return (
		<div>
			<li className={`one-task ${checked ? 'complete' : ''}`}>
				<div className='checkbox-container' value={checked} onChange={() => setChecked(e => !e)}>
					<input type='checkbox' className='checkbox-style'></input>
				</div>
				<div className='task-container'>
					<p className='task-text'>{task.task}</p>
					<p className='task-property'>
						List: {task.list} Priority: {task.priority} {task.date ? `Date:  ${task.date}` : ''}
					</p>
				</div>
				<div>
					<Button className='edit-task-button' onClick={() => setEdit(edit => !edit)}>
						<i className='fa-regular fa-pen-to-square'></i>
					</Button>
					<Button className='delete-task-button' onClick={() => onDelete(task.id)}>
						<i className='fa-solid fa-trash'></i>
					</Button>
				</div>
			</li>
			{edit && (
				<div className='form-add-task'>
					<div id='add-task-area'>
						<textarea
							className='textarea'
							placeholder='Add new task'
							defaultValue={task.task}
							onChange={handleInputChange}
							name='task'></textarea>
						<div className='add-task-properties'>
							<div className='add-priority priority-list'>
								<select defaultValue={task.list} onChange={handleInputChange} name='list'>
									<option className='option' value='Default'>
										Default
									</option>
									<option className='option' value='Private'>
										Private
									</option>
									<option className='option' value='Work'>
										Work
									</option>
								</select>
							</div>
							<div className='add-priority priority-date'>
								<input type='date' defaultValue={task.date} name='date' onChange={handleInputChange} />
							</div>
							<div className='add-priority priority-priority'>
								<select
									id='priority-select'
									defaultValue={task.priority}
									onChange={handleInputChange}
									name='priority'>
									<option value='None'>None</option>
									<option value='Low'>Low</option>
									<option value='Middle'>Middle</option>
									<option value='High'>High</option>
								</select>
							</div>
						</div>
						<Button className='button-to-input' onClick={handleSaveEdit}>
							Save Edit
						</Button>
					</div>
				</div>
			)}
		</div>
	);
}

export function Button({ children, className, onClick }) {
	return (
		<button className={className} onClick={onClick}>
			{children}
		</button>
	);
}
