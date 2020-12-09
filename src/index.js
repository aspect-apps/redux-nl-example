import React, {useEffect} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {Provider} from 'react-redux';
import {ReduxNL} from 'redux-nl';
import {CatFactsList} from './components/cat-facts-list';
import NoteComponent from './components/note-component';
import {store} from './store';

const Notes = [{id: 1}, {id: 2}, {id: 3}];

const styles = StyleSheet.create({
  header: {
    marginHorizontal: 20,
    marginVertical: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

const App = () => {
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
          <Text style={styles.headerTitle}>Cat Facts</Text>
        </View>

        {Notes.map(({id, text}) => {
          return <NoteComponent key={id} id={id} text={text} />;
        })}

        <CatFactsList />
      </SafeAreaView>
    </Provider>
  );
};

export default App;
