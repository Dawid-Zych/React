import { useEffect, useState } from 'react';

export function useLocalStorageState(initialState, key) {
	const [value, setValue] = useState(function () {
		const storadValue = localStorage.getItem(key);
		return storadValue ? JSON.parse(storadValue) : initialState;
	});

	useEffect(
		function () {
			localStorage.setItem(key, JSON.stringify(value));
		},
		[value, key]
	);

	return [value, setValue];
}
