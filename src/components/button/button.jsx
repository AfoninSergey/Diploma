import styles from './button.module.css';

export const Button = ({ children, ...props }) => (
	<button className={styles.button} {...props}>
		{children}
	</button>
);
