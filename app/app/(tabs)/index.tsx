import { FlatList, ScrollView, StyleSheet } from "react-native";
import React from "react";
import tweets from "@/assets/data/tweets";
import Tweet from "@/components/Tweet";
import { View } from "@/components/Themed";

const index = () => {
  return (
    <View style={styles.page}>
      <FlatList
        data={tweets}
        renderItem={({ item }) => {
          return <Tweet tweet={item} />;
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "white",
  },
});

export default index;
