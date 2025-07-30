import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native'
import logo from '../../../../assets/img/logo.jpeg'

export default function MedicineHistoryScreen() {
    // Sample data array
    const [medicines, setMedicines] = useState([
        {
            id: '1',
            name: 'Paracetamol',
            dose: '500mg',
            time: 'Cada 8 horas',
            duration: '5 días',
            startDate: '2024-01-25',
            notes: 'Tomar después de las comidas'
        },
        {
            id: '2',
            name: 'Ibuprofeno',
            dose: '400mg',
            time: 'Cada 12 horas',
            duration: '3 días',
            startDate: '2024-01-24',
            notes: 'No tomar con el estómago vacío'
        },
        {
            id: '3',
            name: 'Omeprazol',
            dose: '20mg',
            time: 'Una vez al día',
            duration: '14 días',
            startDate: '2024-01-20',
            notes: 'Tomar en ayunas'
        }
    ])

    return (
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <View style={styles.background}>
                <View style={styles.container}>
                    <Image
                        source={logo}
                        style={styles.logo}
                        resizeMode='contain'
                    />
                    <Text style={styles.title}>Historial de Medicamentos</Text>

                    <View style={styles.formContainer}>
                        {medicines.length === 0 ? (
                            <Text style={styles.emptyText}>No hay medicamentos registrados.</Text>
                        ) : (
                            medicines.map(med => (
                                <View key={med.id} style={styles.medicineItem}>
                                    <Text style={styles.medName}>{med.name}</Text>
                                    <Text style={styles.medField}>
                                        <Text style={styles.medLabel}>Dosis:</Text> {med.dose}
                                    </Text>
                                    <Text style={styles.medField}>
                                        <Text style={styles.medLabel}>Horario:</Text> {med.time}
                                    </Text>
                                    
                                   
                                </View>
                            ))
                        )}
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
    medicineItem: {
        width: '100%',
        backgroundColor: '#f8f9fa',
        borderRadius: 10,
        padding: 16,
        marginBottom: 16,
        borderLeftWidth: 4,
        borderLeftColor: '#3a8570',
    },
    medName: {
        fontSize: 18,
        color: '#3a8570',
        fontWeight: '700',
        marginBottom: 8,
    },
    medField: {
        fontSize: 15,
        color: '#2a5440',
        marginBottom: 4,
    },
    medLabel: {
        fontWeight: 'bold',
        color: '#3a8570',
    },
    medNotes: {
        fontSize: 14,
        color: '#666',
        marginTop: 8,
        fontStyle: 'italic',
    },
    emptyText: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        marginTop: 20,
    }
})