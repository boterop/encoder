import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import RNPickerSelect from 'react-native-picker-select';
import { Ascii, Base64, Binary, Cesar, NonSense } from '../crypto';
import { Clipboard, Colors } from '../utils';
import {
	Button,
	StyleSheet,
	TextInput,
	View,
	Image,
	TouchableOpacity,
} from 'react-native';

const Home = () => {
	const [method, setMethod] = useState('none');
	const [input, setInput] = useState('');
	const [output, setOutput] = useState('');
	const [config, setConfig] = useState(false);
	const [colors, setColors] = useState({
		color_background: '#2AB8FA',
		color_panel: '#1BD8E3',
		color_button_encrypt: '#1E41FD',
		color_button_decrypt: '#1B6FE3',
	});

	useEffect(() => {
		Colors().then(values => setColors(values));
	}, []);

	const styles = StyleSheet.create({
		container: {
			flex: 1,
			alignItems: 'center',
			justifyContent: 'center',
			backgroundColor: colors.color_background,
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
			backgroundColor: colors.color_panel
		},
	});

	const encrypt = () => {
		if (input != '') {
			let encrypted;

			switch (method) {
				case 'n':
					encrypted = NonSense.encode(input);
					break;
				case 'b':
					encrypted = Binary.encode(input);
					break;
				case 'b64':
					encrypted = Base64.encode(input);
					break;
				case 'c':
					encrypted = Cesar.encode(input);
					break;
				case 'a':
					encrypted = Ascii.encode(input);
					break;
				default:
					return;
			}

			setInput('');
			setOutput(encrypted);

			Clipboard(encrypted);
		}
	};

	const decrypt = () => {
		if (input != '') {
			let encrypted;

			switch (method) {
				case 'n':
					encrypted = NonSense.decode(input);
					break;
				case 'b':
					encrypted = Binary.decode(input);
					break;
				case 'b64':
					encrypted = Base64.decode(input);
					break;
				case 'c':
					encrypted = Cesar.decode(input);
					break;
				case 'a':
					encrypted = Ascii.decode(input);
					break;
				default:
					return;
			}

			setInput('');
			setOutput(encrypted);

			Clipboard(encrypted);
		}
	};

	return (
		<View style={styles.container}>
			<StatusBar style='auto' />

			<View
				style={{
					alignSelf: 'stretch',
					alignItems: 'flex-end',
					marginHorizontal: 15,
				}}>
				<TouchableOpacity onPress={() => setConfig(!config)}>
					<View style={{ paddingVertical: 15 }} />
					<Image
						source={require('../../assets/icon.png')}
						style={{
							width: 50,
							height: 50,
						}}
					/>
				</TouchableOpacity>
			</View>

			<RNPickerSelect
				style={styles.box}
				placeholder={{
					label: '',
					value: method,
				}}
				onValueChange={value => setMethod(value)}
				onUpArrow={() => {
					this.inputRefs.name.focus();
				}}
				onDownArrow={() => {
					this.inputRefs.picker2.togglePicker();
				}}
				items={[
					{ label: 'Select a method', value: 'none' },
					{ label: 'Nosense', value: 'n' },
					{ label: 'Binary', value: 'b' },
					{ label: 'Base 64', value: 'b64' },
					{ label: 'Cesar', value: 'c' },
					{ label: 'Ascii', value: 'a' },
				]}
				value={method}
			/>

			<TextInput
				style={styles.io}
				multiline={true}
				returnKeyType='next'
				enablesReturnKeyAutomatically
				onSubmitEditing={() => {
					this.inputRefs.picker.togglePicker();
				}}
				blurOnSubmit={false}
				onChangeText={e => setInput(e)}
				value={input}
			/>

			<View style={styles.box}>
				<Button
					onPress={() => encrypt()}
					title='Encrypt'
					color={colors.color_button_encrypt}
					accessibilityLabel='Encrypt'
				/>

				<Button
					onPress={() => decrypt()}
					title='Decrypt'
					color={colors.color_button_decrypt}
					accessibilityLabel='Decrypt'
				/>
			</View>

			<TextInput
				style={styles.io}
				multiline={true}
				returnKeyType='next'
				enablesReturnKeyAutomatically
				onSubmitEditing={() => {
					this.inputRefs.picker.togglePicker();
				}}
				blurOnSubmit={false}
				value={output}
			/>
		</View>
	);
};

export default Home;
