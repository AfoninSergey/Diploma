import styles from './input.module.css';

export const Input = ({ id, label, ...props }) => (
	<>
		{label && (
			<label className={styles.label} htmlFor={id}>
				{label}
			</label>
		)}
		<input id={id} className={styles.input} {...props} />
	</>
);
