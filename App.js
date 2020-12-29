import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { Button, StyleSheet, TextInput, View } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

export default class App extends Component {

  base64 = require('base-64');
  table = [128, 64, 32, 16, 8, 4, 2, 1];
  abc = "abcdefghijklmnopqrstuvwxyz";

  constructor(props) {
    super(props);

    this.inputRefs = {};

    this.state = {
      method: "none",
      input: "",
      output: ""
    };
  }

  encrypt = () => {
    if (this.state.input != "") {
      let encrypted;

      switch (this.state.method) {
        case "b":
          encrypted = this.bEncode(this.state.input);
          break;
        case "b64":
          encrypted = this.b64Encode(this.state.input);
          break;
        case "c":
          encrypted = this.cEncode(this.state.input);
          break;
        case "a":
          encrypted = this.aEncode(this.state.input);
          break;
        default:
          return;
      }

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
        case "b":
          encrypted = this.bDecode(this.state.input);
          break;
        case "b64":
          encrypted = this.b64Decode(this.state.input);
          break;
        case "c":
          encrypted = this.cDecode(this.state.input);
          break;
        case "a":
          encrypted = this.aDecode(this.state.input);
          break;
        default:
          return;
      }

      this.setState({
        output: encrypted,
        input: "",
      });
    }
  }

  toBinary = (ascii) => {
    let binary = "";
    for (let i = 0; i < this.table.length; i++) {
      if (ascii >= this.table[i]) {
        binary += "1";
        ascii -= this.table[i];
      } else {
        binary += "0";
      }
    }
    return binary;
  }

  toDecimal = (binary) => {
    let decimal = 0;

    for (let i = 0; i <= 8 - binary.length; i++) //to complete the byte
    {
      binary = "0" + binary;
    }

    for (let i = 0; i < this.table.length; i++) {
      if (binary[i] === "1") {
        decimal += this.table[i];
      }
    }

    return decimal;
  }

  toChar = (decimal) => {

  }

  bEncode = (text) => {
    let encrypted = "";

    for (let i = 0; i < text.length; i++) {
      encrypted += this.toBinary(text.charCodeAt(i)) + " ";
    }

    return encrypted;
  }

  b64Encode = (text) => {
    return this.base64.encode(text);
  }

  b64Decode = (text) => {
    return this.base64.decode(text);
  }

  cEncode = (text) => {
    let encrypted = "";

    let num = 0;
    for (let i = 0; i < text.length; i++) {
      if (text[i] === " ") {
        encrypted += "- ";
      } else {
        num = ("" + text).toLocaleLowerCase().charCodeAt(i) - 94;
        if (num < 0) {
          num = this.abc.length + num;
        }
        encrypted += this.abc[num % this.abc.length];
      }
    }

    return encrypted;
  }

  cDecode = (text) => {
    let encrypted = "";

    let num = 0;
    for (let i = 0; i < text.length; i++) {
      if (text[i] != " ") {
        if (text[i] === "-") {
          encrypted += " ";
        } else {
          num = ("" + text).toLocaleLowerCase().charCodeAt(i) - 100;
          if (num < 0) {
            num = this.abc.length + num;
          }

          encrypted += this.abc[num % this.abc.length];
        }
      }
    }

    return encrypted;
  }

  aEncode = (text) => {
    let encrypted = "";

    for (let i = 0; i < text.length; i++) {
      encrypted += text.charCodeAt(i) + " ";
    }

    return encrypted;
  }

  render() {
    return (
      <View style={styles.container}>

        <StatusBar style="auto" />

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
            { label: 'Binary', value: 'b' },
            { label: 'Base 64', value: 'b64' },
            { label: 'Cesar', value: 'c' },
            { label: 'Ascii', value: 'a' },
          ]}
          value={this.state.method}
        />

        <TextInput style={styles.io}
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
            color="#841584"
            accessibilityLabel="Encrypt"
          />

          <Button
            onPress={this.decrypt}
            title="Decrypt"
            color="#143800"
            accessibilityLabel="Decrypt"
          />
        </View>

        <TextInput style={styles.io}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#99897A',
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
    backgroundColor: '#006D8A',
  },
});