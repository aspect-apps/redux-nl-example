import React from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';

const styles = StyleSheet.create({
  rootContainer: {
    padding: 20,
    backgroundColor: 'gray',
  },

  catFactContainer: {
    margin: 12,
    backgroundColor: 'white',
  },
});

export const CatFactsList = () => {
  const catFacts = useSelector((state) => state.catFacts.data);

  return (
    <ScrollView contentContainerStyle={styles.rootContainer}>
      {catFacts.map(({_id, text}) => (
        <View key={_id} style={styles.catFactContainer}>
          <Text key={_id}>{text}</Text>
        </View>
      ))}
    </ScrollView>
  );
};
