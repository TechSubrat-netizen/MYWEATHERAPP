import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, View, Button, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from "react";

function Dashboard() {
  const [data, setData] = useState(null);
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false); // Track loading state
  const navigation = useNavigation();

  // Function to get city from AsyncStorage
  async function getCity() {
    try {
      let storedCity = await AsyncStorage.getItem("city");
        setCity(storedCity);
    
    } catch (error) {
      console.error("Error fetching city from AsyncStorage:", error);
    }
  }


  async function fetchWeather(name) {
    try {
      setLoading(true);
      let API_KEY = "3eb1dca52d3838ef8fdac702ead19922";
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${API_KEY}&units=metric`;
      let res = await fetch(url);
      res = await res.json();

      if (res.weather) {
        setData({
          weather: res.weather,
          city: res.name,
          temperature: res.main.temp,
        });
      } else {
        setData(null);
      }
    } catch (error) {
      console.error("Error fetching weather:", error);
    } finally {
      setLoading(false); 
    }
  }


  useEffect(() => {
    getCity();
  }, []);


  useEffect(() => {
      fetchWeather(city);
   
  }, [city]);

  return (
    <View style={styles.main}>
      <View style={styles.container}>
        <Text style={styles.containerText}>Weather Data</Text>
        <Text style={styles.containerText}>{city || "No city selected"}</Text>

        <View>
          {loading ? ( 
            <ActivityIndicator size="large" color="#ffffff" /> 
          ) : data ? (
            <View>
              <Text style={{fontSize:10,color:"white"}}>City: {data.city}</Text>
              <Text style={{fontSize:10,color:"white"}}>Temperature: {data.temperature}°C</Text>
              {data.weather.map((e) => (
                <Text key={e.main} style={{fontSize:10,color:"white"}}>
                  {e.main} - {e.description}
                </Text>
              ))}
            </View>
          ) : (
            <Text>No data found</Text>
          )}
        </View>
      </View>

      <View style={{ marginBottom: 10 }}>
        <Button title="Add Details" onPress={() => navigation.navigate("Page1")} />
      </View>

      <View>
        <Button title="See Details" onPress={()=>navigation.navigate('SeeDetails')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  container: {
    height: 300,
    width: 300,
    borderWidth: 1,
    backgroundColor: "blue",
    margin: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  containerText: {
    fontSize: 20,
    color: "white",
    textAlign: "center",
  },
});

export default Dashboard;
