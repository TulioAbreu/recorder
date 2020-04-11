import React, { useState, useEffect } from 'react';
import { Alert, StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

function Record({ navigation }) {
    let conn = navigation.getParam('conn');
    const [activityName, setActivityName] = useState('')
    const [startRecMode, setStartRecMode] = useState(true)

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

   
    function onPressStart() {
        setStartRecMode(false);
        conn.send('!start');
    }

    function onPressStop() {
        setStartRecMode(true);
        conn.send('!finish');
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

                { startRecMode?
                    <>
                        <Text
                            style={styles.label}
                        >
                            Atividade
                        </Text>
                        <TextInput
                            style={styles.textInput}
                            placeholder=""
                            placeholderTextColor="#999"
                            autoCorrect={false}
                            value={activityName}
                            onChangeText={setActivityName}
                        />
                        <TouchableOpacity
                            style={styles.button}
                            onPress={onPressStart}
                        >
                            <Text
                                style={styles.buttonText}
                            >
                                Iniciar
                            </Text>
                        </TouchableOpacity>
                    </>
                    :
                    <>
                        <TouchableOpacity
                            style={styles.buttonStop}
                            onPress={onPressStop}
                        >
                            <Text
                                style={styles.buttonText}
                            >
                                Parar
                            </Text>
                        </TouchableOpacity>
                    </>
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