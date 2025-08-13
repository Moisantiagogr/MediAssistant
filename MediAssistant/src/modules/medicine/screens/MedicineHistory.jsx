import React, { useState, useCallback, useEffect } from 'react'
import { View, Text, StyleSheet, ScrollView, Image, Alert, RefreshControl } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
import * as Notifications from 'expo-notifications'
import AsyncStorage from '@react-native-async-storage/async-storage'
import logo from '../../../../assets/img/logo.jpeg'
import api from '../../../config/api' 
Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowBanner: true,
        shouldShowList: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
        priority: Notifications.AndroidNotificationPriority.HIGH
    }),
});

export default function MedicineHistory() {
    const [medicines, setMedicines] = useState([])
    const [refreshing, setRefreshing] = useState(false)
    const [notificationHistory, setNotificationHistory] = useState({})
    const [medicineUpdateHistory, setMedicineUpdateHistory] = useState({})
    const usuarioId = globalThis.idUser

    useEffect(() => {
        const loadStoredData = async () => {
            try {
                const [notifHistory, updateHistory] = await Promise.all([
                    AsyncStorage.getItem('notificationHistory'),
                    AsyncStorage.getItem('medicineUpdateHistory')
                ])

                if (notifHistory) {
                    setNotificationHistory(JSON.parse(notifHistory))
                }

                if (updateHistory) {
                    setMedicineUpdateHistory(JSON.parse(updateHistory))
                }
            } catch (error) {
                console.log(`Error cargando datos: ${error.message}`)
            }
        }
        loadStoredData()
    }, [])

    useEffect(() => {
        const saveNotificationHistory = async () => {
            try {
                await AsyncStorage.setItem('notificationHistory', JSON.stringify(notificationHistory))
            } catch (error) {
                console.log(`Error guardando historial notificaciones: ${error.message}`)
            }
        }
        if (Object.keys(notificationHistory).length > 0) {
            saveNotificationHistory()
        }
    }, [notificationHistory])

    
    useEffect(() => {
        const saveMedicineUpdateHistory = async () => {
            try {
                await AsyncStorage.setItem('medicineUpdateHistory', JSON.stringify(medicineUpdateHistory))
            } catch (error) {
                console.log(`Error guardando historial actualizaciones: ${error.message}`)
            }
        }
        if (Object.keys(medicineUpdateHistory).length > 0) {
            saveMedicineUpdateHistory()
        }
    }, [medicineUpdateHistory])

    const canSendNotification = (medicineId) => {
        const history = notificationHistory[medicineId] || []
        const now = new Date().getTime()

        if (!history.length) {
            return true
        }

        const today = new Date().setHours(0, 0, 0, 0)
        const notificationsToday = history.filter(time => time > today).length
        if (notificationsToday >= 3) {
            return false
        }

   
        const lastNotification = Math.max(...history)
        const minutesSinceLastNotification = (now - lastNotification) / (1000 * 60)
        const minMinutesBetween = 1

        return minutesSinceLastNotification >= minMinutesBetween
    }

    
    const canUpdateMedicine = (medicineId) => {
        const today = new Date().toDateString()
        const lastUpdateDate = medicineUpdateHistory[medicineId]
        return !lastUpdateDate || lastUpdateDate !== today
    }

    const sendNotification = async (medicine) => {
        if (!canSendNotification(medicine.id)) {
            return false
        }

        try {
            await Notifications.scheduleNotificationAsync({
                content: {
                    title: '¡Hora de tu medicina!',
                    body: `Es momento de tomar ${medicine.nombre} - ${medicine.dosis}`,
                    data: { medicineId: medicine.id },
                    sound: true,
                    priority: 'high',
                    color: '#3a8570',
                },
                trigger: null
            })

            const now = new Date().getTime()
            setNotificationHistory(prev => ({
                ...prev,
                [medicine.id]: [...(prev[medicine.id] || []), now]
            }))

            return true
        } catch (error) {
            console.log(`Error enviando notificación: ${error.message}`)
            return false
        }
    }

    const fetchMedicines = async () => {
        if (!usuarioId) {
            Alert.alert('Error', 'No hay ID de usuario disponible')
            return
        }

        try {
            const response = await api.get(`/medicamentos/historial/${usuarioId}`)

            if (response.data && Array.isArray(response.data.medicamentos)) {
                setMedicines(response.data.medicamentos)
            } else {
                setMedicines([])
            }
        } catch (error) {
            Alert.alert('Error', `Error cargando medicamentos: ${error.message}`)
            setMedicines([])
        }
    }


    const updateMedicine = async (medicine) => {
        if (!canUpdateMedicine(medicine.id)) {
            return { success: true, alreadyUpdated: true }
        }

        try {
            const nuevaDuracion = Math.max(medicine.duracion - 1, 0)

            const response = await api.put(`/medicamentos/actualizar/${usuarioId}/${medicine.id}`, {
                nuevaDuracion
            })

            if (response.data && response.data.success) {
                const today = new Date().toDateString()
                setMedicineUpdateHistory(prev => ({
                    ...prev,
                    [medicine.id]: today
                }))

                await fetchMedicines()
                return { success: true, alreadyUpdated: false }
            } else {
                return { success: false, error: 'Servidor no confirmó actualización' }
            }
        } catch (error) {
            return { success: false, error: error.message }
        }
    }

    const checkMedicineSchedules = useCallback(async () => {
        if (!medicines.length) {
            return
        }

        const now = new Date()
        const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`


        const processedMedicines = new Map()

        for (const medicine of medicines) {
          
            const medicineKey = `${medicine.id}_${medicine.hora}`
            if (processedMedicines.has(medicineKey)) {
                continue
            }

            const conditionsMet = medicine.status && medicine.hora === currentTime && medicine.duracion > 0

            if (conditionsMet) {
                processedMedicines.set(medicineKey, true)

                
                await sendNotification(medicine)

                
                if (canUpdateMedicine(medicine.id)) {
                    await updateMedicine(medicine)
                }
            }
        }
    }, [medicines, notificationHistory, medicineUpdateHistory])

   
    useEffect(() => {
        const interval = setInterval(checkMedicineSchedules,500) 
        return () => clearInterval(interval)
    }, [checkMedicineSchedules])

    
    useEffect(() => {
        const requestPermissions = async () => {
            try {
                const { status } = await Notifications.requestPermissionsAsync()

                if (status !== 'granted') {
                    Alert.alert(
                        'Permisos necesarios',
                        'Las notificaciones son necesarias para recordarte tomar tus medicamentos.'
                    )
                }
            } catch (error) {
                console.log(`Error solicitando permisos: ${error.message}`)
            }
        }
        requestPermissions()
    }, [])

    const onRefresh = useCallback(async () => {
        setRefreshing(true)
        await fetchMedicines()
        setRefreshing(false)
    }, [])

    useFocusEffect(
        useCallback(() => {
            fetchMedicines()
        }, [])
    )

    return (
        <ScrollView
            contentContainerStyle={styles.scrollViewContent}
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                    colors={['#3a8570']}
                />
            }
        >
            <View style={styles.background}>
                <View style={styles.container}>
                    <Image
                        source={logo}
                        style={styles.logo}
                        resizeMode="contain"
                    />
                    <Text style={styles.title}>Historial de Medicamentos</Text>

                    <View style={styles.formContainer}>
                        {medicines.length === 0 ? (
                            <Text style={styles.emptyText}>No hay medicamentos registrados.</Text>
                        ) : (
                            medicines.map(med => (
                                <View
                                    key={med.id}
                                    style={[
                                        styles.medicineItem,
                                        (!med.status || med.duracion <= 0) && styles.medicineItemDisabled
                                    ]}
                                >
                                    <Text style={styles.medName}>{med.nombre}</Text>
                                    <Text style={styles.medField}>
                                        <Text style={styles.medLabel}>Dosis: </Text>
                                        {med.dosis}
                                    </Text>
                                    <Text style={styles.medField}>
                                        <Text style={styles.medLabel}>Horario: </Text>
                                        {med.hora}
                                    </Text>
                                    <Text style={styles.medField}>
                                        <Text style={styles.medLabel}>Días restantes: </Text>
                                        {med.duracion}
                                    </Text>
                                    <Text style={styles.medField}>
                                        <Text style={styles.medLabel}>Status: </Text>
                                        {med.status ? 'Activo' : 'Inactivo'}
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
        paddingBottom: 20,
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
        letterSpacing: 0.2,
    },
    formContainer: {
        width: '100%',
        maxWidth: 400,
        alignItems: 'center',
        paddingHorizontal: 10,
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
    medicineItemDisabled: {
        backgroundColor: '#e0e0e0',
        opacity: 0.6,
        borderLeftColor: '#999999',
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
    emptyText: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        marginTop: 20,
    },
})