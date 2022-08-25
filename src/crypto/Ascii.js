import { Parser } from '../utils';

const Ascii = {
	encode: text => {
		let encrypted = '';

		for (let i = 0; i < text.length; i++) {
			encrypted += text.charCodeAt(i) + ' ';
		}

		return encrypted;
	},
	decode: text => {
		let encrypted = '';

		let asciis = text.split(' ');

		for (let i = 0; i < asciis.length; i++) {
			encrypted += Parser.numberToChar(asciis[i]);
		}

		return encrypted;
	},
};

export default Ascii;
