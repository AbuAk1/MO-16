import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import Bar from './src/Bar';
import Places from './src/Places';
import Map from './src/Map';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const Stack = createNativeStackNavigator();


export default function App() {


  return (
    <PaperProvider>
      <NavigationContainer>
        <SafeAreaView style={styles.container}>
          <StatusBar style="light" />
            <Stack.Navigator screenOptions={({ navigation, route }) => ({
              header: (props) => <Bar {...props} navigation={navigation} />,
            })}
            >
              <Stack.Screen name="Places" component={Places} options={{title: "palces "}} />
              <Stack.Screen name="Map" component={Map} options={{title: "map "}} />
            </Stack.Navigator>
            <StatusBar style="auto" />
        </SafeAreaView>
      </NavigationContainer>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
