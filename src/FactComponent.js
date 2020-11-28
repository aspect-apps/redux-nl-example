import React from 'react';
import {
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import { Types } from './config/types';

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

const FactComponent = ({id}) => {
  const dispatch = useDispatch();
  const {favorites, texts} = useSelector((state) => state);

  const isFavorite =
    favorites.favorites.filter((favorite) => favorite === id).length > 0;
  const textValue = texts.texts.filter((text) => text.id === id)[0]?.text;

  const onChangeText = (text) => {
    if (!textValue) {
      dispatch({
        type: Types.ADD_TEXT_BUBBLE,
        payload: {text, id},
      });
    } else {
      if (!text) {
        dispatch({
          type: Types.REMOVE_TEXT_BUBBLE,
          payload: {id},
        });
      } else {
        dispatch({
          type: Types.UPDATE_TEXT_BUBBLE,
          payload: {text, id},
        });
      }
    }
  };

  const handleSetFavorite = () => {
    if (isFavorite) {
      dispatch({
        type: Types.REMOVE_COMPANY_FROM_FAVORITES,
        payload: id,
      });
    } else {
      dispatch({
        type: Types.ADD_COMPANY_TO_FAVORITES,
        payload: id,
      });
    }
  };

  const favoriteImage = isFavorite
    ? require('./img/heart.png')
    : require('./img/heart-outline.png');

  return (
    <View style={styles.rootContainer}>
      <TextInput
        multiline
        style={styles.factContainer}
        onChangeText={onChangeText}
        value={textValue}
      />

      <TouchableOpacity style={styles.iconButton} onPress={handleSetFavorite}>
        <Image source={favoriteImage} />
      </TouchableOpacity>
    </View>
  );
};

export default FactComponent;
