import { useState } from "react";

export const useSet = set => {

	const [, setWrap] = useState([ set ]);

	const modifiers = new Set([ "add", "delete", "clear" ]);

	const setProxy = new Proxy(set, {
		get: (_, key) => {
			if (modifiers.has(key)) {
				return value => {
					set[key](value);
					setWrap([ set ]);
					return set;
				}
			} else {
				return set[key];
			}

		},
	});

	return setProxy;

};
