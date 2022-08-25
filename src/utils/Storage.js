import AsyncStorage from '@react-native-async-storage/async-storage';

const Storage = {
	storeData: async (key, value) => {
		try {
			await AsyncStorage.setItem('@SBEncoder:' + key, value);
		} catch (e) {
			alert('Error saving data ' + value);
		}
	},
	retrieveData: async key => {
		try {
			const value = await AsyncStorage.getItem('@SBEncoder:' + key);
			if (value !== null) {
				return '' + value;
			} else {
				return undefined;
			}
		} catch (e) {
			alert('Error loading data ' + key);
		}
	},
};

export default Storage;
