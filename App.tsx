import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CharacterList from './components/CharactersList';
import CharacterDetails from './components/CharacterDetails';

export type RootStackParamList = {
  CharactersList: undefined;
  Details: { id: string };
};

const Stack = createStackNavigator();

const App: React.FC = () => {
  
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Characters" component={CharacterList} />
        <Stack.Screen name="Details" component={CharacterDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};


export default App;
