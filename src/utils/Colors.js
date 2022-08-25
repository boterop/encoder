import Storage from './Storage';

const Colors = async () => {
	let colors = {};

	await Storage.retrieveData('color_background').then(value => {
		if (value === undefined) {
			value = '#2AB8FA';
			Storage.storeData('color_background', value);
		}

		colors = { ...colors, ...{ color_background: value } };
	});

	await Storage.retrieveData('color_panel').then(value => {
		if (value === undefined) {
			value = '#1BD8E3';
			Storage.storeData('color_panel', value);
		}

		colors = { ...colors, ...{ color_panel: value } };
	});

	await Storage.retrieveData('color_button_encrypt').then(value => {
		if (value === undefined) {
			value = '#1E41FD';
			Storage.storeData('color_button_encrypt', value);
		}

		colors = { ...colors, ...{ color_button_encrypt: value } };
	});

	await Storage.retrieveData('color_button_decrypt').then(value => {
		if (value === undefined) {
			value = '#1B6FE3';
			Storage.storeData('color_button_decrypt', value);
		}

		colors = { ...colors, ...{ color_button_decrypt: value } };
	});

	return colors;
};

export default Colors;
