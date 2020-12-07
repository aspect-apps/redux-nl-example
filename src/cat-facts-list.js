import React from "react";
import { View, Text, ScrollView } from "react-native";
import { useSelector } from "react-redux";

export const CatFactsList = () => {
    const catFacts = useSelector(state => state.catFacts.data);

    return (
        <ScrollView contentContainerStyle={{ padding: 20, backgroundColor: "gray" }}>
            {catFacts.map(({ _id, text }) => (
            <View key={_id} style={{ margin: 12, backgroundColor: "white" }}>
                <Text key={_id}>{text}</Text>
            </View>
            ))}
        </ScrollView>
    )
}