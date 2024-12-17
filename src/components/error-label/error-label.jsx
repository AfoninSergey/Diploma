import { useState } from 'react';
import styles from './error-label.module.css';
import { useDispatch } from 'react-redux';

import { setSuccessInfo } from '../../actions';

export const ErrorLabel = ({ children, addClass }) => {
	const [addedClass, setAddedClass] = useState(addClass);

	const dispatch = useDispatch();

	return (
		<div className={`${styles.errorLabel} ${styles[addedClass]}`}>
			{children}{' '}
			{addClass && (
				<button
					onClick={() => {
						setAddedClass('hidden');
						dispatch(setSuccessInfo(null));
					}}
				>
					×
				</button>
			)}
		</div>
	);
};
