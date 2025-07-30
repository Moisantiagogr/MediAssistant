import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Login from "../../modules/auth/screens/Login";
import CreateAccount from "../../modules/auth/screens/CreateAccount";
import History from "../../modules/medicine/screens/MedicineHistory";
import { Icon } from "@rneui/base";

import RegisterMedicine from "../../modules/medicine/screens/RegisterMedicine";
const Tab = createBottomTabNavigator();
globalThis.isSessionActive = false; 
function getTabBarIcon(route, active) {
    let iconName = '';
    switch (route.name) {
        case 'Login':
            iconName = active ? 'login' : 'login';
            break;
        case 'CreateAccount':
            iconName = active ? 'account-plus' : 'account-plus-outline';
            break;
        case 'Perfil':
            iconName = active ? 'account' : 'account-outline';
            break;
        case 'Registrar':
            iconName = active ? 'medical-bag' : 'medical-bag';
            break;
        case 'Historial':
            iconName = active ? 'history' : 'history';
            break;   
        default:
            iconName = active ? 'help-circle' : 'help-circle-outline';
    }
    return {
        iconName,
        type: 'material-community'
    };
}

export default function Navigation() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    headerShown: false,
                    tabBarActiveTintColor: '#3a8570',
                    tabBarInactiveTintColor: '#888',
                    tabBarStyle: {
                        backgroundColor: '#fff',
                        borderTopWidth: 0,
                        elevation: 0,
                        height: 60,
                        paddingBottom: 10,
                        position: 'absolute',
                        bottom: 25,
                        left: 20,
                        right: 20,
                        borderRadius: 15,
                        shadowColor: '#000',
                        shadowOffset: {
                            width: 0,
                            height: 2,
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 3.5,
                    },
                    tabBarLabelStyle: {
                        fontSize: 12,
                        marginTop: -5,
                        marginBottom: 5,
                    },
                    tabBarIcon: ({ focused, color, size }) => {
                        const { iconName, type } = getTabBarIcon(route, focused);
                        return <Icon name={iconName} type={type} size={size} color={color} />;
                    }
                })}
            >
                {!global.isSessionActive ? (
                    <>
                        <Tab.Screen
                            name="Login"
                            component={Login}
                            options={{ title: 'Iniciar sesión' }}
                        />
                        <Tab.Screen
                            name="CreateAccount"
                            component={CreateAccount}
                            options={{ title: 'Crear cuenta' }}
                        />
                    </>
                ) : (<>
                    <Tab.Screen
                        name="Perfil"
                        component={Login}
                        options={{ title: 'Perfil' }}
                    />

                    <Tab.Screen
                        name="Registrar"
                        component={RegisterMedicine}
                        options={{ title: 'Registrar' }}
                        />
<Tab.Screen 
name="Historial"
component={History}
options={{title:'Historial'}}/>

                        </>
                )}

            </Tab.Navigator>
        </NavigationContainer>
    );
}