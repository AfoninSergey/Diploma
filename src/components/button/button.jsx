import styles from './button.module.css';

export const Button = ({ children, small, save, del, cancel, gray, up, down, ...props }) => (
	<button
		className={`
			${styles.button}
			${up ? styles.up : ''}
			${down ? styles.down : ''}
			${small ? styles.smallButton : ''}
			${save ? styles.saveButton : ''}
			${del ? styles.deleteButton : ''}
			${del ? styles.deleteButton : ''}
			${cancel ? styles.cancelButton : ''}
			`}
		{...props}
	>
		{children}
	</button>
);
