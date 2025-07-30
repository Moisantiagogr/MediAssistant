import React, { useState } from 'react'
import { View, Text, StyleSheet, ScrollView, Image,TouchableOpacity } from 'react-native'
import { Input, Button } from '@rneui/base'
import logo from '../../../../assets/img/logo.jpeg'
import DateTimePicker from '@react-native-community/datetimepicker'

export default function RegisterMedicine({ navigation }) {
    const [formData, setFormData] = useState({
        name: '',
        dose: '',
        time: new Date(), // Initialize with current date
        duration: '',
        startDate: new Date().toISOString().split('T')[0],
        notes: '',
    })
    const [showTimePicker, setShowTimePicker] = useState(false)

    const onTimeChange = (event, selectedTime) => {
        setShowTimePicker(false)
        if (selectedTime) {
            setFormData(prev => ({
                ...prev,
                time: selectedTime
            }))
        }
    }
    const formatTime = (date) => {
        try {
            return date.toLocaleTimeString('es-ES', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: false
            });
        } catch (error) {
            return '';
        }
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
                    <Text style={styles.title}>Nuevo Medicamento</Text>

                    <View style={styles.formContainer}>
                        <Input
                            placeholder='Nombre del Medicamento'
                            containerStyle={styles.input}
                            inputStyle={styles.inputText}
                            placeholderTextColor="#7e7e7e"
                        />

                        <Input
                            placeholder='Dosis'
                            containerStyle={styles.input}
                            inputStyle={styles.inputText}
                            placeholderTextColor="#7e7e7e"
                        />

                        <TouchableOpacity
                            style={styles.timePickerButton}
                            onPress={() => setShowTimePicker(true)}
                        >
                            <Input
                                placeholder='Horario'
                                value={formData.time ? formatTime(formData.time) : ''}
                                containerStyle={styles.input}
                                inputStyle={styles.inputText}
                                placeholderTextColor="#7e7e7e"
                                editable={false}
                                rightIcon={{
                                    type: 'material-community',
                                    name: 'clock-outline',
                                    color: '#3a8570'
                                }}
                            />
                        </TouchableOpacity>

                        {showTimePicker && (
                            <DateTimePicker
                                testID="timePicker"
                                value={formData.time || new Date()}
                                mode="time"
                                is24Hour={true}
                                display="default"
                                onChange={onTimeChange}
                            />
                        )}
                        <Button
                            title='Guardar Medicamento'
                            containerStyle={styles.buttonContainer}
                            buttonStyle={styles.buttonStyle}
                            titleStyle={styles.buttonTitle}
                        />

                        <Button
                            title='Cancelar'
                            containerStyle={[styles.buttonContainer, { marginTop: 10 }]}
                            buttonStyle={[styles.buttonStyle, { backgroundColor: '#707372' }]}
                            titleStyle={styles.buttonTitle}
                            onPress={() => navigation.goBack()}
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
    }, timePickerButton: {
        width: '100%',
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