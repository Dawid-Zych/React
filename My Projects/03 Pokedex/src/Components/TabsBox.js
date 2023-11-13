import regions from '../data/regions.json';
import Tab from '../Components/Tab';
import { memo } from 'react';
function TabsBox({ dispatch }) {
	return (
		<ul className='tabs'>
			{regions.map(reg => (
				<Tab name={reg.name} generation={reg.gen} key={reg.name} dispatch={dispatch} />
			))}
		</ul>
	);
}

export default memo(TabsBox);
