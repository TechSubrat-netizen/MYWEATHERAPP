import { View,Text } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"
function SeeDetails() {
    let city=AsyncStorage.getItem('city')
    let name=AsyncStorage.getItem('name')
  return (
   <View>
    <Text style={{fontSize:20}}>See Details Page</Text>
    <Text style={{fontSize:20}}>{city}</Text>
    <Text style={{fontSize:20}}>{name}</Text>
   </View>
  )
}

export default SeeDetails