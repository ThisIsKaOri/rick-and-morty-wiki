import React, { useEffect, useState } from 'react'
import { View, Text, ScrollView, FlatList, TextComponent, SafeAreaView } from 'react-native'
import { CharacterType, CharactersListType } from '../models/Character';
import CharacterItem from './CharacterItem';
import axios from 'axios';



const baseUrl = 'https://rickandmortyapi.com/api/character'



const CharactersList = () => {

    const [characters, setCharacters] = useState([]);

    useEffect(() => {
        axios.get(baseUrl)
            .then(response => {
                // Gestisci la risposta qui
                setCharacters(response.data.results);
            })
            .catch(error => {
                // Gestisci gli errori qui
                console.error(error);
            });
    }, []);

    return (
        <SafeAreaView>
            <View>
                <Text>Characters</Text>
                <FlatList
                    data={characters}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => {
                        return <CharacterItem character={item} />;
                    }}
                />
            </View>
        </SafeAreaView>
    );
};

export default CharactersList










