import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {ADD_COMPANY_TO_FAVORITES, REMOVE_COMPANY_FROM_FAVORITES} from './redux';

const styles = StyleSheet.create({
  rootContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginHorizontal: 20,
  },

  factContainer: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 30,
    marginVertical: 10,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 15,
    flex: 1,
  },

  textStyle: {
    fontSize: 16,
    fontFamily: 'Arial',
  },

  iconButton: {},
});

const FactComponent = ({id, text}) => {
  const dispatch = useDispatch();
  const {favorites} = useSelector((state) => state.favorites);

  const isFavorite = favorites.filter((favorite) => favorite === id).length > 0;

  const handleSetFavorite = () => {
    if (isFavorite) {
      dispatch({
        type: REMOVE_COMPANY_FROM_FAVORITES,
        payload: id,
      });
    } else {
      dispatch({
        type: ADD_COMPANY_TO_FAVORITES,
        payload: id,
      });
    }
  };

  const favoriteImage = isFavorite
    ? require('./img/heart.png')
    : require('./img/heart-outline.png');

  return (
    <View style={styles.rootContainer}>
      <View style={styles.factContainer}>
        <Text style={styles.textStyle}>{text}</Text>
      </View>

      <TouchableOpacity style={styles.iconButton} onPress={handleSetFavorite}>
        <Image source={favoriteImage} />
      </TouchableOpacity>
    </View>
  );
};

export default FactComponent;
