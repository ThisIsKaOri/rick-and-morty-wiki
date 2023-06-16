import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CharactersList from './components/CharactersList';
import CharacterDetails from './components/CharacterDetails';
import { View } from 'react-native';
import Home from './components/Home';
import HouseDoor from './node_modules/react-native-bootstrap-icons/icons/house-door'

export type RootTabParamList = {
  Home: undefined;
  CharactersStack: undefined;
};

export type CharactersStackParamList = {
  CharactersList: undefined;
  Details: { id: string };
};

const Tab = createBottomTabNavigator();
const CharactersStack = createStackNavigator();

const CharactersStackScreen = () => {
  return (
    <CharactersStack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: 'transparent' },
        headerTintColor: '#e762d7ff',
        headerBackground: () => (
          <View style={{ flex: 1, backgroundColor: 'rgba(147,229,45, 1)' }} />
        ),
      }}
    >
      <CharactersStack.Screen name="Characters" component={CharactersList} />
      <CharactersStack.Screen name="Details" component={CharacterDetails} />
    </CharactersStack.Navigator>
  );
};


const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerTitle: '',
          headerStyle: { backgroundColor: 'transparent', height:20},
          tabBarStyle: {backgroundColor: 'rgba(147,229,45, 1)'},
          headerTintColor: '#e762d7ff',
          headerBackground: () => (
            <View style={{ flex: 1, backgroundColor: 'rgba(147,229,45, 1)' }} />
          ),
        }}
      >
        <Tab.Screen name="Home" component={Home}/>
        <Tab.Screen name="Explore" component={CharactersStackScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
