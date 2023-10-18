import { useState } from 'react';
import { Button } from './App';

export default function AddTask({ onAdd, setIsOpen }) {
	const [list, setList] = useState('Default');
	const [date, setDate] = useState(new Date(Date.now()).toDateString());
	const [priority, setPriority] = useState('None');
	const [taskTitle, setTaskTitle] = useState(null);

	function handleAddTask() {
		const task = {
			id: Math.random() * 1000,
			task: taskTitle,
			list: list,
			priority: priority,
			date: date,
		};

		if (!task.task) return;
		setList('Default');
		setDate(new Date(Date.now()).toDateString());
		setPriority('None');
		setTaskTitle(null);
		onAdd(task);
	}

	return (
		<div className='form-add-task'>
			<div id='add-task-area'>
				<Button className='delete-add-new-task-button right' onClick={() => setIsOpen(false)}>
					X
				</Button>
				<textarea
					className='textarea'
					placeholder='Add new task'
					value={taskTitle}
					onChange={e => setTaskTitle(e.target.value)}></textarea>
				<div className='add-task-properties'>
					<div className='add-priority priority-list'>
						<h4>List:</h4>
						<select value={list} onChange={e => setList(e.target.value)}>
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
						<h4>Date:</h4>
						<input type='date' value={date} onChange={e => setDate(e.target.value)} />
					</div>
					<div className='add-priority priority-priority'>
						<h4>Priority:</h4>
						<select id='priority-select' value={priority} onChange={e => setPriority(e.target.value)}>
							<option>None</option>
							<option>Low</option>
							<option>Middle</option>
							<option>High</option>
						</select>
					</div>
				</div>

				<Button className='button-to-input' onClick={handleAddTask}>
					Add Task
				</Button>
			</div>
		</div>
	);
}
