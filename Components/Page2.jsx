import { View,Text, TextInput,Button, Alert } from "react-native"
import { Picker } from "@react-native-picker/picker"
import { useState } from "react"
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
function Page2() {
    let [city,setCity]=useState('')
    let  [name,setName]=useState('')
     const navigation=useNavigation()
      function subMit(){
        if(city && name){
            AsyncStorage.setItem('city',city)
            AsyncStorage.setItem('name',name)
            navigation.navigate('Dashboard')
            setName('')
        }
        else{
            Alert.alert("Please fill all the field")
        }
      }
  return (
   <View>
  <View>
    <Picker selectedValue={city} onValueChange={(text)=>setCity(text)}>
    <Picker.Item label="Select a city" value=""enabled={false}/>
    <Picker.Item label="Bhubaneswar" value="Bhubaneswar"/>
    <Picker.Item label="Mumbai" value="Mumbai"/>
    <Picker.Item label="Bangalore" value="Bangalore"/>
    <Picker.Item label="Hyderabad" value="Hyderbad" />
    </Picker>
  </View>
  <View>
    <TextInput placeholder="Enter your name" value={name} onChangeText={(text)=>setName(text)}/>
  </View>
    <Text style={{fontSize:20}}>{city}</Text>
    <Text style={{fontSize:20}}>{name}</Text>

    <View>
        <Button title='Submit' onPress={subMit}></Button>
    </View>
  
   </View>
  )
}

export default Page2