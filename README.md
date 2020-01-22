# use-set

Use a Set in your React Hooks.

## Installation

```bash
npm i react-hook-set
```

## Usage

```JavaScript
import { useSet } from "use-set";

const List = (props) => {
	const checked = useSet(new Set());

	const toggle = key =>
		checked.has(key)
			? checked.delete(key)
			: checked.add(key);

	return <div>
		{props.list.map(item =>
			<Checkbox
				key={item.key}
				name={item.name}
				checked = {checked.has(item.key)}
				onChange={() => toggle(item.key)}
			/>}
	</div>;

};
```
