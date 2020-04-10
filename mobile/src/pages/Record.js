import React, { useState, useEffect } from 'react';
import { Alert, StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

function Record({ navigation }) {
    let conn = navigation.getParam('conn');

    function onConnectionLost() {
        Alert.alert(
            'Erro',
            'Conexão perdida.',
            [
                {text: 'OK', style: styles.buttonText}
            ]
        );
        navigation.navigate('Main');
    }

    function buttonConnect() {

    }

    return (
        <>
            <View
                style={styles.view}
            >
                <Text
                    style={styles.pageTitle}
                >
                    Conexão
                </Text>
            </View>
        </>
    )
}
const styles = StyleSheet.create({
    view: {
        paddingLeft: "10%",
        paddingRight: "10%",
        justifyContent: "center",
        flex: 1,
    },

    pageTitle: {
        fontSize: 36,
        textAlign: "center",
        marginBottom: 24,
    },

    label: {
        fontSize: 14,
        marginBottom: 5
    },

    textInput: {
        borderRadius: 3,
        borderWidth: 1,
        borderColor: "#8E8E8E",
        paddingLeft: 10,
        paddingRight: 10,
        height: 40,
    },
    
    button: {
        alignSelf: "flex-end",
        borderRadius: 3,
        backgroundColor: "#AD56D6",
        width: 120,
        height: 60,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 25,
        right: 0
    },
    
    buttonText: {
        color: "#FFF",
        fontSize: 16,
        lineHeight: 19,
    }
});

export default Record;