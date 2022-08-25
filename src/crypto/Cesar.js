const alphabet = 'abcdefghijklmnopqrstuvwxyz';

const Cesar = {
	encode: text => {
		let encrypted = '';

		let num = 0;
		for (let i = 0; i < text.length; i++) {
			if (text[i] === ' ') {
				encrypted += '- ';
			} else {
				num = ('' + text).toLocaleLowerCase().charCodeAt(i) - 94;
				if (num < 0) {
					num = alphabet.length + num;
				}
				encrypted += alphabet[num % alphabet.length];
			}
		}

		return encrypted;
	},
	decode: text => {
		let encrypted = '';

		let num = 0;
		for (let i = 0; i < text.length; i++) {
			if (text[i] != ' ') {
				if (text[i] === '-') {
					encrypted += ' ';
				} else {
					num = ('' + text).toLocaleLowerCase().charCodeAt(i) - 100;
					if (num < 0) {
						num = alphabet.length + num;
					}

					encrypted += alphabet[num % alphabet.length];
				}
			}
		}

		return encrypted;
	},
};

export default Cesar;
