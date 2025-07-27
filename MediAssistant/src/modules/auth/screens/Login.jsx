import { StyleSheet, Text, View, Image, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { Input, Button, Icon } from '@rneui/base'
import logo from '../../../../assets/img/logo.jpeg'

export default function Login({ navigation }) {  
    const [hidePassword, setHidePassword] = useState(true)
    const [user, setUser] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = () => {
        if (user === '' && password === '') {
            global.isSessionActive = true;
            navigation.reset({
                index: 0,
                routes: [{ name: 'Opcion' }],
            });
        }
    }

    return (<ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.background}>
            <View style={styles.container}>
                <Image
                    source={logo}
                    style={styles.logo}
                    resizeMode='contain'
                />
                <Text style={styles.title}>Bienvenido</Text>
                
                <View style={styles.formContainer}>
                    <Input
                        keyboardType='email-address'
                        placeholder='Usuario'
                        containerStyle={styles.input}
                        leftIcon={
                            <Icon
                                name="account-outline"
                                type="material-community"
                                color='#3a8570'
                                size={24}
                            />
                        }
                        inputStyle={styles.inputText}
                        placeholderTextColor="#7e7e7e"
                        onChange={(e) => setUser(e.nativeEvent.text)}
                    />
                    <Input
                        placeholder='Contraseña'
                        secureTextEntry={hidePassword}
                        containerStyle={styles.input}
                        leftIcon={
                            <Icon
                                name="lock-outline"
                                type="material-community"
                                color='#3a8570'
                                size={24}
                            />
                        }
                        rightIcon={
                            <Icon
                                type='material-community'
                                name={hidePassword ? 'eye-off-outline' : 'eye-outline'}
                                color='#3a8570'
                                onPress={() => setHidePassword(!hidePassword)}
                                size={24}
                            />
                        }
                        inputStyle={styles.inputText}
                        placeholderTextColor="#7e7e7e"
                        onChange={(e) => setPassword(e.nativeEvent.text)}
                    />

                    <Button
                        title='Iniciar sesión'
                        containerStyle={styles.buttonContainer}
                        buttonStyle={styles.buttonStyle}
                        titleStyle={styles.buttonTitle}
                        onPress={handleLogin}
                    />

                </View>
            </View>
        </View></ScrollView>
    )
}

const styles = StyleSheet.create({
    scrollViewContent: {
        flexGrow: 1,
        backgroundColor: '#f5f5f5',
    },
    background: {
        flex: 1,
        backgroundColor: '#fff',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingVertical: 40,
        marginVertical: 20,
    },
    logo: {
        width: 140,
        height: 90,
        marginBottom: 35,
    },
    title: {
        fontSize: 28,
        fontWeight: '600',
        color: '#2a5440',
        marginBottom: 40,
        letterSpacing: 0.2
    },
    formContainer: {
        width: '100%',
        maxWidth: 400,
        alignItems: 'center',
        paddingHorizontal: 10
    },
    input: {
        marginBottom: 24,
    },
    inputText: {
        fontSize: 16,
        color: '#2a5440',
        paddingVertical: 4
    },
    buttonContainer: {
        width: '100%',
        marginTop: 16,
        borderRadius: 8,
        overflow: 'hidden'
    },
    buttonStyle: {
        backgroundColor: '#3a8570',
        paddingVertical: 14,
        borderRadius: 8
    },
    buttonTitle: {
        fontSize: 18,
        fontWeight: '500',
    },
 
})