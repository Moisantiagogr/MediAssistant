import { StyleSheet, Text, View, Image, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { Input, Button, Icon} from '@rneui/base'
import logo from '../../../../assets/img/logo.jpeg'

export default function CreateAccount({ navigation }) {
    const [hidePassword, setHidePassword] = useState(true)
    const [hideConfirmPassword, setHideConfirmPassword] = useState(true)
    const [nombre, setNombre] = useState('')
    const [usuario, setUsuario] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const handleCreateAccount = () => {
        // Your create account logic here
    }

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.background}>
            <View style={styles.container}>
                <Image
                    source={logo}
                    style={styles.logo}
                    resizeMode='contain'
                />
                <Text style={styles.title}>Crear cuenta</Text>

                <View style={styles.formContainer}>
                    <Input
                        placeholder='Nombre'
                        containerStyle={styles.input}
                        leftIcon={
                            <Icon
                                name="account"
                                type="material-community"
                                color='#3a8570'
                                size={24}
                            />
                        }
                        inputStyle={styles.inputText}
                        placeholderTextColor="#7e7e7e"
                        onChange={(e) => setNombre(e.nativeEvent.text)}
                    />

                    <Input
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
                        onChange={(e) => setUsuario(e.nativeEvent.text)}
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

                    <Input
                        placeholder='Confirmar contraseña'
                        secureTextEntry={hideConfirmPassword}
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
                                name={hideConfirmPassword ? 'eye-off-outline' : 'eye-outline'}
                                color='#3a8570'
                                onPress={() => setHideConfirmPassword(!hideConfirmPassword)}
                                size={24}
                            />
                        }
                        inputStyle={styles.inputText}
                        placeholderTextColor="#7e7e7e"
                        onChange={(e) => setConfirmPassword(e.nativeEvent.text)}
                    />

                    <Button
                        title='Crear cuenta'
                        containerStyle={styles.buttonContainer}
                        buttonStyle={styles.buttonStyle}
                        titleStyle={styles.buttonTitle}
                        onPress={handleCreateAccount}
                    />

                   
                </View>
            </View>
        </View>
        </ScrollView>
  
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
    }
  })