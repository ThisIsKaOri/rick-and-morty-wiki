import React from 'react';
import { CharacterType } from '../models/Character';
import { Text, View, Image } from 'react-native';

type CharacterItemProps = {

    character: CharacterType;
}
export const CharacterItem = ({ character }: CharacterItemProps) => {

    return (

        <View>
            <View>

            <Image source={{ uri: character.image }} style={{width: '25%', aspectRatio: '1/1'}}/>
            </View>
            <Text>{`${character.name[0].toUpperCase()}
                    ${character.name.slice(1)}`}
            </Text>
            <Text>{character.species}</Text>
            <Text>{character.location.name}</Text>
        </View>
    )
}

export default CharacterItem;
