const table = [128, 64, 32, 16, 8, 4, 2, 1];

const Parser = {
	numberToChar: number => String.fromCharCode(number),
	binToNumber: binary => {
		let number = 0;

		for (let i = 0; i < 8 - binary.length; i++) {
			binary = '0' + binary;
		}

		for (let i = 0; i < table.length; i++) {
			if ('' + binary[i] === '1') {
				number += table[i];
			}
		}

		return number;
	},
	asciiToBin: ascii => {
		let binary = '';
		for (let i = 0; i < table.length; i++) {
			if (ascii >= table[i]) {
				binary += '1';
				ascii -= table[i];
			} else {
				binary += '0';
			}
		}
		return binary;
	},
};

export default Parser;
