import { View, Button, StyleSheet, SafeAreaView, TouchableOpacity, Text } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

export default function Home(){
    const navigation = useNavigation();

    return(
        <SafeAreaView style={styles.container}>
        <View style={styles.container2} >
        <Text style={{fontSize:24, color:'#1E6738', textAlign:'center', fontWeight:"bold", marginBottom:20}}>Blockchain Covid-19{"\n"}Certificate Scanner</Text>
        <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Scanner')}
            underlayColor='#fff'>
        <Text style={styles.buttonText}>Open Scanner</Text>
        </TouchableOpacity>
        </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
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
        paddingLeft:40,
        paddingRight:40,
        borderRadius:30,
        alignItems:'center',
        justifyContent:'center',

        shadowColor: "#000",
        shadowOffset: {
	        width: 0,
	        height: 1,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,
        elevation: 9,
    },
    button:{
        marginRight:40,
        marginLeft:40,
        marginTop:10,
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
        elevation: 9,
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
