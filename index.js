import { useState } from "react";

export const useSet = set => {

	const [ [ theSet ], setWrap] = useState([ set ]);

	const modifiers = new Set([ "add", "delete", "clear" ]);

	const setProxy = new Proxy(theSet, {
		get: (_, key) => {
			if (key === "toggle") {
				return value =>
					theSet.has(value)
						? setProxy.delete(value)
						: setProxy.add(value);
			} else if (modifiers.has(key)) {
				return value => {
					theSet[key](value);
					setWrap([ theSet ]);
					return setProxy;
				}
			} else {
				return theSet[key].bind(theSet);
			}

		},
	});

	return setProxy;

};
