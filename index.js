import { useState } from "react";

export const useSet = set => {

	const [, setWrap] = useState([ set ]);

	const modifiers = new Set([ "add", "delete", "clear" ]);

	const setProxy = new Proxy(set, {
		get: (_, key) => {
			if (key === "toggle") {
				return value =>
					set.has(value)
						? setProxy.delete(value)
						: setProxy.add(value);
			} else if (modifiers.has(key)) {
				return value => {
					set[key](value);
					setWrap([ set ]);
					return setProxy;
				}
			} else {
				return set[key].bind(set);
			}

		},
	});

	return setProxy;

};
