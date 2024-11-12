import styles from './button.module.css';

export const Button = ({ children, small,  ...props }) =>  (
	<button className={`${styles.button} ${ small ? styles.smallButton : ''}`} {...props}>
		{children}
	</button>
);
