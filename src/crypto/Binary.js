import { Parser } from '../utils';

const Binary = {
	encode: text => {
		let bin = '';

		for (let i = 0; i < text.length; i++) {
			bin += Parser.asciiToBin(text.charCodeAt(i)) + ' ';
		}

		return bin;
	},
	decode: bin => {
		let text = '';

		if (!('' + bin).includes(' ')) {
			for (let i = 0; i < bin.length; i += 9) {
				bin =
					('' + bin).substring(0, i + 8) +
					' ' +
					('' + bin).substring(i + 8, bin.length);
			}
		}

		let binaries = ('' + bin).split(' ');

		let controller;
		for (let i = 0; i < binaries.length; i++) {
			controller = Parser.binToNumber(binaries[i]);
			if (controller != 0) {
				text += Parser.numberToChar(controller);
			}
		}

		return text;
	},
};

export default Binary;
