import Sidebar from '../components/Sidebar';
import Map from '../components/Map';
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
