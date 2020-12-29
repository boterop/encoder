import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

export default class App extends Component {

  constructor(props) {
    super(props);

    this.inputRefs = {};

    this.state = {
      method: "none"
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <View style={styles.box}>
          <RNPickerSelect
            placeholder={{
              label: 'Select a method',
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
              { label: 'Base 64', value: 'b64' },
              { label: 'Cesar', value: 'c' }
            ]}
            value={this.state.method}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    paddingTop: 30,
    alignSelf: 'stretch',
    backgroundColor: '#fff',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
});