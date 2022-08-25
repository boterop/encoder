import * as cb from 'expo-clipboard';

const Clipboard = text => cb.setStringAsync(text);

export default Clipboard;
