const addListKeys = (inputList: Array<any>) => {
	let outputList = [];
	inputList.map((item, index) => {
		outputList.push({ ...item, key: index });
	});
	return outputList;
};

export default addListKeys;
