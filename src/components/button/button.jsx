import styles from './button.module.css';

export const Button = ({ children, type }) => <button className={styles.button} type={type}>{children}</button>;
