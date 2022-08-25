import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Colors } from '../utils';

const useStyles = colors => {
	const [color, setColor] = useState(colors);

	useEffect(() => {
		Colors().then(values => setColor(values));
	}, []);

	const styles = StyleSheet.create({
		container: {
			flex: 1,
			alignItems: 'center',
			justifyContent: 'center',
			backgroundColor: color.color_background,
		},
		box: {
			display: 'flex',
			paddingVertical: 2,
			alignSelf: 'stretch',
			justifyContent: 'center',
			paddingHorizontal: 10,
		},
		io: {
			height: 200,
			marginHorizontal: 10,
			marginVertical: 30,
			alignSelf: 'stretch',
			justifyContent: 'center',
			paddingHorizontal: 10,
			borderColor: 'black',
			borderWidth: 1,
			backgroundColor: color.color_panel,
		},
	});

	const updateStyles = () => {
		Colors().then(values => setColor(values));
	};

	return [styles, color, updateStyles];
};

export default useStyles;
