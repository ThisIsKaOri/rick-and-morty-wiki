import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { RouteProp } from '@react-navigation/native';
import { CharacterType } from '../models/Character';
import { RootStackParamList } from '../App';

type CharacterDetailsProps = {

    route: RouteProp<RootStackParamList, 'Details'>;
};

const CharacterDetails: React.FC<CharacterDetailsProps> = ({ route }) =>  {

    const [character, setCharacter] = useState<CharacterType | null>();
    const { id } = route!.params;

    useEffect(() => {
        axios
            .get(`https://rickandmortyapi.com/api/character/${id}`)
            .then(response => {
                setCharacter(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, [id]);

    if (!character) {
        return null;
    }


    return (
        <ImageBackground source={{ uri: 'https://wallpapercave.com/wp/wp11151412.png' }}>
            <View style={styles.card}>
                <Text
                    style={{
                        fontSize: 30,
                        fontWeight: 'bold',
                        flexWrap: 'wrap',
                        maxWidth: '100%'
                    }}>{character.name}</Text>
                <Text>Status: {character.status}</Text>
                <View style={styles.image}>
                    <Image source={{ uri: character.image }}
                        style={{ width: '80%', aspectRatio: '1/1', borderRadius: 15 }} />
                </View>
                <Text>Species: {character.species}</Text>
                <Text>Type: {character.type}</Text>
                <Text>Gender: {character.gender}</Text>
                <Text>Origin: {character.origin.name}</Text>
                <Text>Location: {character.location.name}</Text>
                {/* <View style={{marginVertical: '4%'}}>
                    <Text style={{fontSize: 20, fontWeight: 'bold'}}>Episodes:</Text>
                    {character.episode.map((episode, index) => 
                        <TouchableOpacity><Text>episode: {index}</Text></TouchableOpacity>
                        )}
                </View> */}
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    card: {
        padding: '6%',
        margin: '2%',
        maxWidth: '100%',
        minHeight: '97.5%',
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
    image: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginVertical: '4%',
    },
});
export default CharacterDetails;
