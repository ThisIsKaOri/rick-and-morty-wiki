import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { CharacterType } from '../models/Character';

type CharacterItemProps = {

  character: CharacterType;
  onPress: (id: string) => void;
}

const CharacterItem: React.FC<CharacterItemProps> = ({ character, onPress }) => (

  <TouchableOpacity onPress={() => onPress(character.id)}>
    <View style={styles.card}>
      <View style={styles.image}>
        <Image source={{ uri: character.image }} 
          style={{ width: '100%', aspectRatio: '1/1', 
          borderRadius: 50 }}/>
      </View>
      <View>
        <Text style={{fontSize: 20, fontWeight: 'bold', flexWrap: 'wrap', maxWidth: '100%'}}>{character.name}</Text>
        <Text>{character.status}</Text>
        <Text style={{fontSize: 15}}>{character.species}</Text>
      </View>
    </View>
  </TouchableOpacity >
);

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
  image: {
    width: '25%',
    marginRight: '4%',
  },
});

export default CharacterItem;
