import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { SafeAreaView, Text, View, StyleSheet, Alert, Button, Dimensions, TextComponent, TextInput } from 'react-native';
import { Camera, useCameraDevice, useCameraDevices, useCodeScanner } from 'react-native-vision-camera';


function Page1() {
  const [hasPermission, setHasPermission] = useState(false);
 
  const [isActive, setIsActive] = useState(true);

  const device = useCameraDevice('back');
  // Use the code scanner hook to configure barcode scanning
  const codeScanner = useCodeScanner({
    codeTypes: ['qr'],
    onCodeScanned: codes => {
     console.log(codes[0]?.value)
      // getProductDetailsByBarcode(codes[0]?.value);
      // setScannerModalVisible(false);
      setIsActive(false);
      // setEnableOnCodeScanned(false);
    },
  });

  

  
  if (!device) return <Text>Loading camera...</Text>;

   const navigation=useNavigation()

  return (
  
    <View>
       <SafeAreaView style={styles.container}>
        <View style={{height:800,width:'100%'}}>

       <Camera
          codeScanner={codeScanner}
          style={StyleSheet.absoluteFill}
          device={device}
          isActive={isActive}
        />
        </View>
      <View style={styles.infoContainer}>
       <TextInput/>
      </View>
    </SafeAreaView>



         

      <Button title="Next" onPress={() => navigation.navigate("Page2")} />
      <TextInput/>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoContainer: {
    position: 'absolute',
    bottom: 50,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 10,
    borderRadius: 5,
  },
  infoText: {
    color: 'white',
    fontSize: 16,
  },
});
export default Page1;
