import Logo from '../../Logo/Logo';
import AppNav from '../AppNav';
import styles from './Sidebar.module.css';

function Sidebar() {
	return (
		<div className={styles.sidebar}>
			<Logo />
			<AppNav />
			<p>List of cities</p>
			<footer className={styles.footer}>
				<p className={styles.copyright}>Copyright {new Date().getFullYear()} by WorldWise Inc.</p>
			</footer>
		</div>
	);
}

export default Sidebar;
