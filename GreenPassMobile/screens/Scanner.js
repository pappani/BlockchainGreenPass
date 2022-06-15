import React, { useState, useEffect } from 'react'
import { Text, View, StyleSheet, Button, SafeAreaView, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Camera } from 'expo-camera'
import { Platform } from 'expo-modules-core'

export default function Scanner({route}){
    const [hasPermission, setHasPermission] = useState(null)
    const [scanned, setScanned] = useState(false)
    const navigation = useNavigation();

    requestPermissions = () => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync()
            setHasPermission(status === 'granted')
        })()
    }

    useEffect(() => {
        requestPermissions()
    }, [])

    const handleCertification = ({ type, data }) => {
        if ((type == "org.iso.QRCode") || (type == "256")) {
            setScanned(true)
            navigation.navigate('Certificate', {
                data: data,
            })
        }
    }

    if (hasPermission === null){
        return <SafeAreaView style={styles.container}><Text>Requesting Camera Permission</Text></SafeAreaView>
    }

    if (hasPermission === false){
        return <SafeAreaView style={styles.container}><Text>No Access to Camera</Text></SafeAreaView>
    }

    return (
        <SafeAreaView style={styles.container}>
        <View style={styles.container2} >
        {!scanned && <Camera
                onBarCodeScanned={scanned ? undefined : handleCertification}
                style = {styles.scanner}
            />}
        </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    scanner: {
        ...StyleSheet.absoluteFillObject,
        marginTop: 20,
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 20,
    },
    container: {
        flex: 1,
        backgroundColor: '#BACDB0',
        alignItems:'center',
        justifyContent:'center'
    },
    container2: {
        flex: 1,
        backgroundColor:'white',
        marginTop:190,
        marginBottom:190,
        paddingLeft:"45%",
        paddingRight:190,
        paddingTop:400,
        marginTop:100,
        paddingBottom:0,
        borderRadius:30,
        alignItems:'center',
        justifyContent:'center',
        ...Platform.select({
            android: {
                paddingRight: 150,
                paddingLeft: 135
            }
        }),
        shadowColor: "#000",
        shadowOffset: {
	        width: 0,
	        height: 1,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,
    },
    button:{
        marginRight:40,
        marginLeft:40,
        
        borderColor:'#1E6738',
        paddingTop:15,
        paddingBottom:15,
        paddingLeft:15,
        paddingRight:15,
        backgroundColor:'#1E6738',
        borderRadius:10,
        
        shadowColor: "#000",
        shadowOffset: {
	        width: 0,
	        height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,
      },
      buttonText:{
          color:'#fff',
          textAlign:'center',
          fontSize:20,
          paddingLeft : 10,
          paddingRight : 10,
          fontWeight:"500"
      }
})