import React from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Provider} from 'react-redux';
import FactComponent from './FactComponent';
import store from './redux';

const Facts = [{id: 1}, {id: 2}, {id: 3}];

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
