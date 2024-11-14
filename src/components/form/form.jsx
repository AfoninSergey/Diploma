import styles from './form.module.css';

export const Form = ({ children, title, onSubmit, errorMessage, className }) => (
	<section className={`${styles.form} ${className || ''}`}>
		<h2>{title}</h2>
		
		<form onSubmit={onSubmit}>
			{errorMessage && <div className={styles.errorLabel}>{errorMessage}</div>}
			{children}
		</form>
	</section>
);
