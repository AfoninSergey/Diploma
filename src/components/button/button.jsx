import styles from './button.module.css';

export const Button = ({ children, small, save, del, cancel, ...props }) => (
	<button
		className={`
			${styles.button}
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
