import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import Bar from './src/Bar';
import Places from './src/Places';
import Map from './src/Map';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DatabaseProvider } from './src/db';

const Stack = createNativeStackNavigator();


export default function App() {


  return (
    <PaperProvider>
       <DatabaseProvider>
      <NavigationContainer>
        <SafeAreaView style={styles.container}>
          <StatusBar style="light" />
            <Stack.Navigator screenOptions={({ navigation, route }) => ({
              header: (props) => <Bar {...props} navigation={navigation} previous={route.name !=="Places"} />,
            })}
            >
              <Stack.Screen name="Places" component={Places} options={{title: "Places "}} />
              <Stack.Screen name="Map" component={Map} options={{title: "Map "}} />
            </Stack.Navigator>
            <StatusBar style="auto" />
        </SafeAreaView>
      </NavigationContainer>
      </DatabaseProvider>
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
