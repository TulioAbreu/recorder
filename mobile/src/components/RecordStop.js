import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import {Socket} from 'socket.io-client';

function RecordStop(props) {
    const { onPress } = props;
    return (
        <>
            <TouchableOpacity
                style={styles.buttonStop}
                onPress={onPress}
            >
                <Text
                    style={styles.textButtonStart}
                >
                    Parar
                </Text>
            </TouchableOpacity>
        </>
    );
}

const styles = StyleSheet.create({
    textInputLabel: {
        fontSize: 14,
        marginBottom: 5,
    },

    textInput: {
        borderRadius: 3,
        borderWidth: 1,
        borderColor: "#8E8E8E",
        paddingLeft: 10,
        paddingRight: 10,
        height: 40,
    },

    buttonStop: {
        alignSelf: "flex-end",
        borderRadius: 3,
        width: 120,
        height: 60,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 25,
        right: 0,
        backgroundColor: "#D65656",
    },
    
    textButtonStart: {
        color: "#FFF",
        fontSize: 16,
        lineHeight: 19,
    },
});

export default RecordStop;