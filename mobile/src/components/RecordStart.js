import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import {} from 'socket.io-client';

function RecordStart(props) {
    const { onPress } = props;
    const [ activity, setActivity ] = useState('');

    return (
        <>
            <Text
                style={styles.textInputLabel}
            >
                Atividade
            </Text>
            <TextInput
                style={styles.textInput}
                onChangeText={setActivity}
                value={activity}
            />
            <TouchableOpacity
                style={styles.buttonStart}
                onPress={onPress}
            >
                <Text
                    style={styles.textButtonStart}
                >
                    Iniciar
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

    buttonStart: {
        alignSelf: "flex-end",
        borderRadius: 3,
        width: 120,
        height: 60,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 25,
        right: 0,
        backgroundColor: "#AD56D6",
    },
    
    textButtonStart: {
        color: "#FFF",
        fontSize: 16,
        lineHeight: 19,
    },
});

export default RecordStart;