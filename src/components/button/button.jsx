import styles from './button.module.css';

export const Button = ({
	type,
	children,
	small,
	save,
	del,
	cancel,
	gray,
	sort,
	...props
}) => (
	<button
		className={`
			${styles.button}
			${sort === 1 ? styles.up : ''}
			${sort === 2 ? styles.down : ''}
			${small ? styles.smallButton : ''}
			${save ? styles.saveButton : ''}
			${del ? styles.deleteButton : ''}
			${del ? styles.deleteButton : ''}
			${cancel ? styles.cancelButton : ''}
			`}
		{...props}
		type={type || 'button'}
	>
		{children}
	</button>
);
