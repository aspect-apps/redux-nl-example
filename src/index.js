import React, {useEffect} from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Provider, useDispatch} from 'react-redux';
import FactComponent from './FactComponent';
import store, {LOAD_FAVORITES} from './redux';

const Facts = [
  {
    id: 1,
    text:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat eum qui nisi dolorem id itaque quasi dolorum est omnis adipisci!',
  },
  {
    id: 2,
    text:
      'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptate omnis, fugiat veniam a magnam eaque?',
  },
  {
    id: 3,
    text:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Assumenda et unde sit, necessitatibus mollitia, aut dolore sapiente a ducimus sint illo doloribus possimus non tempora quaerat omnis dolorum officiis quia?',
  },
];

const styles = StyleSheet.create({
  header: {
    marginHorizontal: 20,
    marginVertical: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

const App = () => {
  const handleShowFavorites = () => {};

  return (
    <Provider store={store}>
      <SafeAreaView>
        <View style={styles.header}>
          <View />
          <Text style={styles.headerTitle}>Cat Facts</Text>
          <TouchableOpacity onPress={handleShowFavorites}>
            <Image source={require('./img/heart.png')} />
          </TouchableOpacity>
        </View>

        {Facts.map(({id, text}) => {
          return <FactComponent key={id} id={id} text={text} />;
        })}
      </SafeAreaView>
    </Provider>
  );
};

export default App;
