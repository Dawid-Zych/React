import Sidebar from '../components/AppNav/Sidebar/Sidebar';
import Map from '../components/AppNav/Map/Map';
import styles from './AppLayout.module.css';
function AppLeyout() {
	return (
		<div className={styles.app}>
			<Sidebar />
			<Map />
		</div>
	);
}

export default AppLeyout;
