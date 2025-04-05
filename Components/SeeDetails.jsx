import {View, Text, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect, useState} from 'react';
function SeeDetails() {
  const [city, setCity] = useState('');
  const [name, setName] = useState('');
  const [qrValue, setQRvalue] = useState('');
  const fetchAllDetails = async () => {
    setCity(await AsyncStorage.getItem('city'));
    setName(await AsyncStorage.getItem('name'));
    setQRvalue(await AsyncStorage.getItem('qrvalue'));
  };

  useEffect(() => {
    fetchAllDetails();
  }, []);

  return (
    <View style={styles.textView}>
      <Text style={styles.text}>
        QR Code Value: <Text style={styles.innerText}>{qrValue}</Text>
      </Text>
      <Text style={styles.text}>
        City: <Text style={styles.innerText}>{city}</Text>
      </Text>
      <Text style={styles.text}>
        Name:<Text style={styles.innerText}>{name}</Text>
      </Text>
    </View>
  );
}
const styles = StyleSheet.create({
  textView: {width: '95%', alignSelf: 'center', gap: 5},
  text: {
    color: 'black',
    fontSize: 13,
    fontWeight: 'bold',
  },
  innerText: {
    color: 'gray',
    fontSize: 13,
  },
});
export default SeeDetails;
