import React, {useEffect} from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Provider} from 'react-redux';
import {ReduxNL} from 'redux-nl';
import {CatFactsList} from './cat-facts-list';
import FactComponent from './FactComponent';
import {store} from './store';

const Notes = [{id: 1}, {id: 2}, {id: 3}];

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

  useEffect(() => {
    ReduxNL.get('/facts', {
      meta: {
        headers: {
          'x-rapidapi-key':
            'rAHO82BrgJmshpIHJ8mpTVz2vvPyp1c0X1gjsn6UYDxEe7on7T',
          'x-rapidapi-host': 'brianiswu-cat-facts-v1.p.rapidapi.com',
        },
      },
      onFinal: (action) => {
        console.log(action);
      },
    });
  }, []);

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

        {Notes.map(({id, text}) => {
          return <FactComponent key={id} id={id} text={text} />;
        })}

        <CatFactsList />
      </SafeAreaView>
    </Provider>
  );
};

export default App;
