import styles from './error-label.module.css';

export const ErrorLabel = ({ children }) => (
	<div className={styles.errorLabel}>{children}</div>
);
