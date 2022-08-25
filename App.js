import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { Button, StyleSheet, TextInput, View, Text, Image, TouchableOpacity, BackHandler } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Clipboard } from 'react-native-web';
import RNPickerSelect from 'react-native-picker-select';
import Config from './Config';
import { Ascii, Base64, Binary, Cesar, NonSense } from './src/crypto';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.inputRefs = {};

    this.state = {
      method: "none",
      input: "",
      output: "",
      config: false,
    };
  }

  componentDidMount() {
    this.loadColors();

    BackHandler.addEventListener('hardwareBackPress', () => {
      if (this.state.config === true) {
        this.setState({ config: false });
        this.loadColors();
        return true;
      }

      BackHandler.exitApp();

      return false;
    });
  }

  loadColors = () => {
    this._retrieveData('color_background').then((value) => {
      if (value === undefined) {
        value = '#2AB8FA';
        this._storeData('color_background', value);
      }

      this.setState({
        color_background: value,
      });

    });

    this._retrieveData('color_panel').then((value) => {
      if (value === undefined) {
        value = '#1BD8E3';
        this._storeData('color_panel', value);
      }

      this.setState({
        color_panel: value,
      });

    });

    this._retrieveData('color_button_encrypt').then((value) => {
      if (value === undefined) {
        value = '#1E41FD';
        this._storeData('color_button_encrypt', value);
      }

      this.setState({
        color_button_encrypt: value,
      });

    });

    this._retrieveData('color_button_decrypt').then((value) => {
      if (value === undefined) {
        value = '#1B6FE3';
        this._storeData('color_button_decrypt', value);
      }

      this.setState({
        color_button_decrypt: value,
      });

    });
  }

  _storeData = async (key, value) => {
    try {
      await AsyncStorage.setItem('@SBEncoder:' + key, value)
    } catch (e) {
      alert("Error savin data " + value);
    }
  };

  _retrieveData = async (key) => {
    try {
      const value = await AsyncStorage.getItem('@SBEncoder:' + key)
      if (value !== null) {
        return "" + value;
      } else {
        return undefined;
      }
    } catch (e) {
      alert("Error loading data " + key);
    }
  };

  config = () => {
    this.setState({
      config: !this.state.config,
    });
  }

  encrypt = () => {
    if (this.state.input != "") {
      let encrypted;

      switch (this.state.method) {
        case "n":
          encrypted = NonSense.encode(this.state.input);
          break;
        case "b":
          encrypted = Binary.encode(this.state.input);
          break;
        case "b64":
          encrypted = Base64.encode(this.state.input);
          break;
        case "c":
          encrypted = Cesar.encode(this.state.input);
          break;
        case "a":
          encrypted = Ascii.encode(this.state.input);
          break;
        default:
          return;
      }

      Clipboard.setString(encrypted);

      this.setState({
        output: encrypted,
        input: "",
      });
    }
  }

  decrypt = () => {
    if (this.state.input != "") {
      let encrypted;

      switch (this.state.method) {
        case "n":
          encrypted = NonSense.decode(this.state.input);
          break;
        case "b":
          encrypted = Binary.decode(this.state.input);
          break;
        case "b64":
          encrypted = Base64.decode(this.state.input);
          break;
        case "c":
          encrypted = Cesar.decode(this.state.input);
          break;
        case "a":
          encrypted = Ascii.decode(this.state.input);
          break;
        default:
          return;
      }

      Clipboard.setString(encrypted);

      this.setState({
        output: encrypted,
        input: "",
      });
    }
  }

  render() {
    if (this.state.color_background === undefined) {
      return (
        <View style={[styles.container, { backgroundColor: this.state.color_background }]}>

          <StatusBar style="auto" />
          <Text>Loading...</Text>

        </View>
      )
    } else {
      if (this.state.config === true) {
        return (
          <Config />
        )
      } else {
        return (
          <View style={[styles.container, { backgroundColor: this.state.color_background }]}>

            <StatusBar style="auto" />

            <View style={{
              alignSelf: 'stretch',
              alignItems: 'flex-end',
              marginHorizontal: 15,
            }}>
              <TouchableOpacity
                onPress={this.config}
              >
                <View style={{ paddingVertical: 15 }} />
                <Image
                  source={require('./assets/icon.png')}
                  style={{
                    width: 50,
                    height: 50,
                  }}
                />
              </TouchableOpacity>
            </View>

            <RNPickerSelect style={styles.box}
              placeholder={{
                label: "",
                value: this.state.method,
              }}
              onValueChange={(value) => {
                this.setState({
                  method: value,
                });
              }}
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
              value={this.state.method}
            />

            <TextInput style={[styles.io, { backgroundColor: this.state.color_panel }]}
              multiline={true}
              returnKeyType="next"
              enablesReturnKeyAutomatically
              onSubmitEditing={() => {
                this.inputRefs.picker.togglePicker();
              }}
              blurOnSubmit={false}
              onChangeText={(e) => this.setState({ input: e })}
              value={this.state.input}
            />

            <View style={styles.box}>
              <Button
                onPress={this.encrypt}
                title="Encrypt"
                color={this.state.color_button_encrypt}
                accessibilityLabel="Encrypt"
              />

              <Button
                onPress={this.decrypt}
                title="Decrypt"
                color={this.state.color_button_decrypt}
                accessibilityLabel="Decrypt"
              />
            </View>

            <TextInput style={[styles.io, { backgroundColor: this.state.color_panel }]}
              multiline={true}
              returnKeyType="next"
              enablesReturnKeyAutomatically
              onSubmitEditing={() => {
                this.inputRefs.picker.togglePicker();
              }}
              blurOnSubmit={false}
              value={this.state.output}
            />

          </View>
        );
      }
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
  },
});