import {useNavigation} from '@react-navigation/native';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useState, useEffect} from 'react';

function Dashboard() {
  const [data, setData] = useState(null);
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(false); // Track loading state
  const navigation = useNavigation();

  // Function to get city from AsyncStorage
  async function getCity() {
    try {
      let storedCity = await AsyncStorage.getItem('city');
      setCity(storedCity);
    } catch (error) {
      console.error('Error fetching city from AsyncStorage:', error);
    }
  }

  async function fetchWeather(city) {
    try {
      setLoading(true);
      let API_KEY = '3eb1dca52d3838ef8fdac702ead19922';
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
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
      console.error('Error fetching weather:', error);
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
        <Text style={styles.containerText}>{city || 'No city selected'}</Text>

        <View>
          {loading ? (
            <ActivityIndicator size="large" color="#ffffff" />
          ) : data ? (
            <View>
              <Text style={styles.white10}>City: {data.city}</Text>
              <Text style={styles.white10}>
                Temperature: {data.temperature}°C
              </Text>
              {data.weather.map(e => (
                <Text key={e.main} style={styles.white10}>
                  {e.main} - {e.description}
                </Text>
              ))}
            </View>
          ) : (
            <Text>No data found</Text>
          )}
        </View>
      </View>

      <View style={styles.navigationContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Page1')}>
          <Text style={styles.white10}>Add Details</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('SeeDetails')}>
          <Text style={styles.white10}>See Details</Text>
        </TouchableOpacity>
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
    backgroundColor: 'blue',
    margin: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerText: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
  },
  white10: {fontSize: 15, color: 'white'},
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '95%',
    alignSelf: 'center',
  },
  button: {
    width: '48%',
    backgroundColor: 'blue',
    paddingVertical: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Dashboard;
