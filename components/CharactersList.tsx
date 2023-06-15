import axios from 'axios';

import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { CharacterType, CharactersListType } from '../models/Character';
import { RootStackParamList } from '../App';
import CharacterItem from './CharacterItem';

type PageInfoType = {

  count: number;
  pages: number;
  next: string;
  prev: string;
};

const CharactersList: React.FC = () => {
  const [characters, setCharacters] = useState<CharactersListType>([]);
  const [pageInfo, setPageInfo] = useState<PageInfoType | null>(null);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    axios
      .get('https://rickandmortyapi.com/api/character')
      .then(response => {
        setCharacters(response.data.results);
        setPageInfo(response.data.info);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const handleLoadNextPage = () => {
    if (pageInfo?.next) {
      axios
        .get(pageInfo.next)
        .then(response => {
          setCharacters(response.data.results);
          setPageInfo(response.data.info);
        })
        .catch(error => {
          console.error(error);
        });
    }
  };

  const handleLoadPreviousPage = () => {
    if (pageInfo?.prev) {
      axios
        .get(pageInfo.prev)
        .then(response => {
          setCharacters(response.data.results);
          setPageInfo(response.data.info);
        })
        .catch(error => {
          console.error(error);
        });
    }
  };

  const handleCharacterPress = (id: string) => {
    navigation.navigate('Details', { id: id });
  };

  const renderCharacterItem = ({ item }: { item: CharacterType }) => (
    <CharacterItem character={item} onPress={handleCharacterPress} />
  );

  return (
    <ImageBackground source={{ uri: 'https://wallpapercave.com/wp/wp11151412.png' }}>
      <View style={{
          display: 'flex', 
          flexDirection: 'row', 
          justifyContent:'space-evenly',
          padding: '4%'}}>
        <TouchableOpacity onPress={handleLoadPreviousPage}
          style={styles.card}>
          <Text>Previous Page</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLoadNextPage}
        style={styles.card}>
          <Text>Next Page</Text>
        </TouchableOpacity>
      </View>
      <View>
        <FlatList
          data={characters}
          renderItem={renderCharacterItem}
          keyExtractor={item => item.id.toString()}
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: '4%',
    marginVertical: '1%',
    marginHorizontal: '2%',
    maxWidth: '100%',
    display: 'flex',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    textAlign: 'left',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    shadowColor: 'rgba(31, 38, 135, 0.37)',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 1,
    shadowRadius: 32,
    elevation: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.18)',
  },

})


export default CharactersList;
