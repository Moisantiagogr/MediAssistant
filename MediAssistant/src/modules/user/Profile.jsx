import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    ScrollView
} from 'react-native'
import logo from '../../../assets/img/logo.jpeg'

export default function Profile({ navigation }) {
   
    const nombre = globalThis.nombreUser;

     const handleLogout = () => {

        if (typeof global.handleLogout === 'function') {
            global.handleLogout();
        }
       
        globalThis.idUser = null;
        globalThis.nombreUser = null;
    }

    return (
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <View style={styles.background}>
                <View style={styles.container}>
                    <Image 
                        source={logo} 
                        style={styles.logo} 
                        resizeMode="contain" 
                    />
                    <Text style={styles.title}>Perfil de Usuario</Text>
                    
                    <View style={styles.formContainer}>
                        <View style={styles.infoContainer}>
                        
                            <Text style={styles.label}>Nombre:</Text>
                            <Text style={styles.infoText}>{nombre}</Text>
                        </View>

                        <TouchableOpacity 
                            style={styles.logoutButton} 
                            onPress={handleLogout}
                        >
                            <Text style={styles.logoutButtonText}>Cerrar sesión</Text>
                        </TouchableOpacity>
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
    infoContainer: {
        width: '100%',
        marginBottom: 32,
    },
    label: {
        color: '#3a8570',
        fontSize: 16,
        fontWeight: '500',
        marginBottom: 8,
    },
    infoText: {
        color: '#2a5440',
        fontSize: 16,
        marginBottom: 16,
    },
    logoutButton: {
        width: '100%',
        backgroundColor: '#d32f2f',
        paddingVertical: 14,
        borderRadius: 8,
        alignItems: 'center',
    },
    logoutButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '500',
        letterSpacing: 0.3,
    }
})