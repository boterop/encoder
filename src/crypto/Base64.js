import { decode, encode } from 'base-64';

const Base64 = {
	encode: text => encode(text),
	decode: text => decode(text),
};

export default Base64;
