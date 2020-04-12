import React, { useState, useEffect } from 'react';
import { Alert, StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import RecordStart from '../components/RecordStart';
import RecordStop from '../components/RecordStop';

function Record({ navigation }) {
    let conn = navigation.getParam('conn');
    let [isRecording, setIsRecording] = useState(false);

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

    function onStart(activityStr) {
        setIsRecording(true);

        const msg = JSON.stringify({
            opcode: "start",
            activity: activityStr
        });
        console.log(msg);

        conn.send(msg);
    }

    function onStop() {
        setIsRecording(false);

        const msg = JSON.stringify({
            opcode: "finish"
        });
        console.log(msg);

        conn.send(msg);
    }

    return (
        <>
            <View
                style={styles.view}
            >
                <Text
                    style={styles.pageTitle}
                >
                    Gravar Atividade
                </Text>

                {(!isRecording)?
                    <RecordStart onPress={onStart}/>
                    :
                    <RecordStop onPress={onStop}/>
                }
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