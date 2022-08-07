import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Flights from './src/screens/Flights';
import MyFlights from './src/screens/MyFlights';

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconName: string =
              route.name === 'Flights' ? 'flight' : 'person-pin';

            if (route.name === 'QR Scan') {
              iconName = 'qr-code-scanner';
            }
            return <MaterialIcons name={iconName} size={25} color={color} />;
          },
          tabBarActiveTintColor: 'steelblue',
          tabBarInactiveTintColor: 'gray',
        })}>
        <Tab.Screen name="Flights" component={Flights} />
        <Tab.Screen name="My Flights" component={MyFlights} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
export default App;
