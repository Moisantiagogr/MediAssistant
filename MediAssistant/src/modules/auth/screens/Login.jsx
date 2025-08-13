import { StyleSheet, Text, View, Image, ScrollView, KeyboardAvoidingView, Platform, Alert } from 'react-native'  // Importa Alert
import React, { useState } from 'react'
import { Input, Button, Icon } from '@rneui/base'
import logo from '../../../../assets/img/logo.jpeg'
import api from '../../../config/api' // tu instancia configurada de axios

export default function Login({ navigation }) {
    const [hidePassword, setHidePassword] = useState(true)
    const [user, setUser] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    const handleLogin = async () => {
        if (user.trim() !== '' && password.trim() !== '') {
            try {
                setLoading(true)
                const response = await api.post('/usuarios/login', { usuario: user, contrasena: password })

                if (response.data && response.data.id) {
                    global.idUser = response.data.id
                    global.nombreUser = response.data.nombre

                    if (typeof global.handleLogin === 'function') {
                        global.handleLogin()
                    }

                    Alert.alert(
                        '¡Inicio de sesión exitoso!',
                        `Bienvenido/a, usuario ${user}`,
                        [{ text: 'OK' }]
                    )
                } else {
                    Alert.alert(
                        'Error',
                        'Respuesta inesperada del servidor. Intenta nuevamente.',
                        [{ text: 'OK' }]
                    )
                }
            } catch (error) {
                console.error('Error en login:', error)
                Alert.alert(
                    'Error de Inicio de Sesión',
                    'Usuario o contraseña incorrectos, o error de conexión.',
                    [{ text: 'OK' }]
                )
            } finally {
                setLoading(false)
            }
        } else {
            Alert.alert(
                'Campos incompletos',
                'Por favor ingresa usuario y contraseña para continuar.',
                [{ text: 'OK' }]
            )
        }
    }

    return (
        <KeyboardAvoidingView
            style={{ flex: 1, backgroundColor: '#f5f5f5' }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ScrollView contentContainerStyle={styles.scrollViewContent} keyboardShouldPersistTaps="handled">
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
                                title={loading ? 'Cargando...' : 'Iniciar sesión'}
                                containerStyle={styles.buttonContainer}
                                buttonStyle={styles.buttonStyle}
                                titleStyle={styles.buttonTitle}
                                onPress={handleLogin}
                                disabled={loading}
                            />
                        </View>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
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
        justifyContent: 'center',
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
        letterSpacing: 0.2,
    },
    formContainer: {
        width: '100%',
        maxWidth: 400,
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    input: {
        marginBottom: 24,
    },
    inputText: {
        fontSize: 16,
        color: '#2a5440',
        paddingVertical: 4,
    },
    buttonContainer: {
        width: '100%',
        marginTop: 16,
        borderRadius: 8,
        overflow: 'hidden',
    },
    buttonStyle: {
        backgroundColor: '#3a8570',
        paddingVertical: 14,
        borderRadius: 8,
    },
    buttonTitle: {
        fontSize: 18,
        fontWeight: '500',
    },
})
