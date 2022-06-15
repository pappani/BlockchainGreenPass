import React, { useState,useEffect } from 'react'
import { ActivityIndicator, Text, View, StyleSheet, Button, SafeAreaView, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'

function Certificate({ route, navigation }) {
    const { data } = route.params;
    const [isLoading, setLoading] = useState(true);
    const [result, setResult] = useState("")
    
    const callAPI = async () => {
        try {
            const response = await fetch('https://green-pass-api.herokuapp.com/api',{
            // const response = await fetch('http://192.168.1.9:3000/api',{
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              },
              body: data,
            })
            .then(function(res){ return res.json(); })
            setResult(JSON.stringify(response.res))
            console.log(result)
          } catch (error) {
            console.error(error);
          } finally {
            setLoading(false);
          }
    }
    
    useEffect(() => {
        callAPI();
    }, []);

    return (
      <SafeAreaView style={styles.container}>
        {isLoading ? <ActivityIndicator/> : (
        <View>
        <Text style={{...styles.normalText, fontSize:25, fontWeight:"bold"}}>Green Pass Certificate</Text>
        <Text style={{...styles.normalText, marginTop:30, fontSize:100}}>{(result == '"YES"') ? "✅" : "❌"}</Text>
        <Text style={{...styles.normalText}}>{(result == '"YES"') ? JSON.parse(data).id.split(",", 2)[0] + " " + JSON.parse(data).id.split(",", 2)[1] : ""}</Text>
        
        <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.reset({
              index: 0,
              routes: [{name: "Scanner"}]
            })}
            underlayColor='#fff'>
        <Text style={styles.buttonText}>Go Back</Text>
        </TouchableOpacity>
        </View>)}
      </SafeAreaView>
    );
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
        paddingLeft:190,
        paddingRight:190,
        paddingTop:400,
        marginTop:100,
        paddingBottom:0,
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
    },
    button:{
        marginRight:40,
        marginLeft:40,
        marginTop:40,
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
          color:'white',
          textAlign:'center',
          fontSize:20,
          paddingLeft : 10,
          paddingRight : 10,
          fontWeight:"500"
      },
      normalText:{
        textAlign:'center',
        fontSize:20,
        paddingLeft : 10,
        paddingRight : 10,
        fontWeight:"500",
        color:'black'
    }
})

export default Certificate