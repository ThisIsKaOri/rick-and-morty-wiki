import axios from 'axios';

import React, { useEffect, useRef, useState, LegacyRef } from 'react';
import { View, FlatList, Text, TouchableOpacity, StyleSheet, ImageBackground, TextInput, ScrollView } from 'react-native';

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

const baseUrl = 'https://rickandmortyapi.com/api/character';

const CharactersList: React.FC = () => {

  const [characters, setCharacters] = useState<CharactersListType>([]);
  const top = useRef<ScrollView> (null);
  const [pageInfo, setPageInfo] = useState({
    count: 0,
    pages: 0,
    next: '',
    prev: ''
  });
  const [name, setName] = useState('');
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const scrollToTop = () => {
    top.current?.scrollTo({
      y: 0,
      animated: true,
    });
  };

  useEffect(() => {
    let url = name ? `${baseUrl}/?name=${name}` : baseUrl;
    axios
      .get(url)
      .then(response => {
        setCharacters(response.data.results);
        setPageInfo(response.data.info);
      })
      .catch(error => {
        setCharacters([])
        console.error(error);
      });
  }, [name]);

  const handleLoadNextPage = () => {
    if (pageInfo?.next) {
      axios
        .get(pageInfo.next)
        .then(response => {
          setCharacters(response.data.results);
          setPageInfo(response.data.info);
          scrollToTop();
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
          scrollToTop();
        })
        .catch(error => {

        });
    }
  };

  const handleSearch = (text: string) => {
    setName(text);
  };

  const handleCharacterPress = (id: string) => {
    navigation.navigate('Details', { id: id });
  };

  const renderCharacterItem = ({ item }: { item: CharacterType }) => (
    <CharacterItem character={item} onPress={handleCharacterPress} />
  );

  return (
    <ImageBackground source={{ uri: 'https://wallpapercave.com/wp/wp11151412.png' }}>
      <ScrollView ref={top} style={{ minHeight: '100%' }}>
        <TextInput value={name} onChangeText={handleSearch} placeholder='Search by name'
          style={styles.searchBar} />
        <View>
          <FlatList
            data={characters}
            renderItem={renderCharacterItem}
            keyExtractor={item => item.id.toString()}
          />
          {characters.length === 0 &&
            <View style={{ display: 'flex', justifyContent: 'center', paddingVertical: '8%' }}>
              <Text style={{ textAlign: 'center' }}>No Characters found..</Text>
            </View>
          }
        </View>
        {pageInfo.pages > 1 &&
          <View style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            padding: '4%'
          }}>
            {pageInfo.prev &&
              <TouchableOpacity onPress={handleLoadPreviousPage}
                style={styles.card}>
                <Text>Previous Page</Text>
              </TouchableOpacity>
            }
            {pageInfo.next &&
              <TouchableOpacity onPress={handleLoadNextPage}
                style={styles.card}>
                <Text>Next Page</Text>
              </TouchableOpacity>
            }
          </View>
        }
      </ScrollView>
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
  searchBar: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    minHeight: '7%',
    padding: '5%',
    margin: '2%',
    borderRadius: 50,
  }
})


export default CharactersList;
