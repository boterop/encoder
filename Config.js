import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { Button, StyleSheet, TextInput, View, Text, AsyncStorage } from 'react-native';

export default class Config extends Component {

    constructor(props) {
        super(props);

        this.inputRefs = {};

        this.state = {
            color_background: '#2AB8FA',
            color_panel: '#2AB8FA',
            color_button_encrypt: '#2AB8FA',
            color_button_decrypt: '#2AB8FA',
        };
    }

    componentDidMount() {
        this._retrieveData('color_background').then((value) => {
            if (value === undefined) {
                value = '#2AB8FA';
                this._storeData('color_background', value);
            }

            this.setState({
                color_background: value,
                color_background2: value,
            });

        });

        this._retrieveData('color_panel').then((value) => {
            if (value === undefined) {
                value = '#1BD8E3';
                this._storeData('color_panel', value);
            }

            this.setState({
                color_panel: value,
                color_panel2: value,
            });

        });

        this._retrieveData('color_button_encrypt').then((value) => {
            if (value === undefined) {
                value = '#1E41FD';
                this._storeData('color_button_encrypt', value);
            }

            this.setState({
                color_button_encrypt: value,
                color_button_encrypt2: value,
            });

        });

        this._retrieveData('color_button_decrypt').then((value) => {
            if (value === undefined) {
                value = '#1B6FE3';
                this._storeData('color_button_decrypt', value);
            }

            this.setState({
                color_button_decrypt: value,
                color_button_decrypt2: value,
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

    save = () => {
        let errors = false;

        const b = this.state.color_background2;
        const p = this.state.color_panel2;
        const e = this.state.color_button_encrypt2;
        const d = this.state.color_button_decrypt2;

        if (b.length === 7 && b[0] === '#') {
            this._storeData('color_background', b);
            this.setState({ color_background: b })
        } else {
            errors = true;
            alert("Background color is wrong.");
        }

        if (p.length === 7 && p[0] === '#') {
            this._storeData('color_panel', p);
            this.setState({ color_panel: p })
        } else {
            errors = true;
            alert("Panel color is wrong.");
        }

        if (e.length === 7 && e[0] === '#') {
            this._storeData('color_button_encrypt', e);
            this.setState({ color_button_encrypt: e })
        } else {
            errors = true;
            alert("Encrypt Button color is wrong.");
        }

        if (d.length === 7 && d[0] === '#') {
            this._storeData('color_button_decrypt', d);
            this.setState({ color_button_decrypt: d })
        } else {
            errors = true;
            alert("Decrypt Button color is wrong.");
        }

        if (!errors) {
            alert("saved");
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
            return (
                <View style={[styles.container, { backgroundColor: this.state.color_background }]}>

                    <StatusBar style="auto" />

                    <Text style={{paddingBottom: 50}}>Browse your color on google in hex code</Text>

                    <View style={styles.box2}>
                        <Text style={styles.text}>Background: </Text>
                        <TextInput style={[styles.io, { backgroundColor: this.state.color_background }]}
                            returnKeyType="next"
                            enablesReturnKeyAutomatically
                            blurOnSubmit={false}
                            onChangeText={(e) => this.setState({ color_background2: e })}
                            value={this.state.color_background2}
                        />
                    </View>

                    <View style={styles.box2}>
                        <Text style={styles.text}>Panels: </Text>
                        <TextInput style={[styles.io, { backgroundColor: this.state.color_panel }]}
                            returnKeyType="next"
                            enablesReturnKeyAutomatically
                            blurOnSubmit={false}
                            onChangeText={(e) => this.setState({ color_panel2: e })}
                            value={this.state.color_panel2}
                        />
                    </View>

                    <View style={styles.box2}>
                        <Text style={styles.text}>Encrypt Button: </Text>
                        <TextInput style={[styles.io, { backgroundColor: this.state.color_button_encrypt }]}
                            returnKeyType="next"
                            enablesReturnKeyAutomatically
                            blurOnSubmit={false}
                            onChangeText={(e) => this.setState({ color_button_encrypt2: e })}
                            value={this.state.color_button_encrypt2}
                        />
                    </View>

                    <View style={styles.box2}>
                        <Text style={styles.text}>Decrypt Button: </Text>
                        <TextInput style={[styles.io, { backgroundColor: this.state.color_button_decrypt }]}
                            returnKeyType="next"
                            enablesReturnKeyAutomatically
                            blurOnSubmit={false}
                            onChangeText={(e) => this.setState({ color_button_decrypt2: e })}
                            value={this.state.color_button_decrypt2}
                        />
                    </View>

                    <View style={styles.box}>
                        <Button
                            onPress={this.save}
                            title="Save"
                            color={this.state.color_button_encrypt}
                            accessibilityLabel="Save"
                        />
                    </View>

                </View>
            );
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
        paddingVertical: 20,
        alignSelf: 'stretch',
        justifyContent: 'center',
        paddingHorizontal: 10,
    },
    box2: {
        paddingVertical: 5,
        paddingHorizontal: 5,
        alignSelf: 'stretch',
        justifyContent: 'center',
        borderColor: 'black',
        borderWidth: 1,
    },
    io: {
        height: 20,
        marginHorizontal: 10,
        marginVertical: 5,
        alignSelf: 'flex-end',
        paddingHorizontal: 10,
        borderColor: 'black',
        borderWidth: 1,
    },
    text: {
        alignSelf: 'baseline',
        paddingRight: 25,
        height: 20,
    },
});