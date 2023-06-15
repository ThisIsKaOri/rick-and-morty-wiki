import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CharactersList from './components/CharactersList';
import CharacterDetails from './components/CharacterDetails';
import { View } from 'react-native';

export type RootStackParamList = {
  CharactersList: undefined;
  Details: { id: string };
};

const Stack = createStackNavigator();

const App: React.FC = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerStyle: { backgroundColor: 'transparent' },
        headerTintColor: '#e762d7ff',
        headerBackground: () => (
          <View style={{ flex: 1, backgroundColor: 'rgba(151,206,76, 1)' }} />
        ),
      }}>
        <Stack.Screen name="Characters" component={CharactersList} />
        <Stack.Screen name="Details" component={CharacterDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};


export default App;
