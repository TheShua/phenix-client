export const showModifier = (base, text = false) => {
	let r = Math.floor((base - 10) / 2);
	if (text) r = r > 0 ? `+${r}` : r;
	return r;
};
