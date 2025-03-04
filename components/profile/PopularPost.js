import { View, StyleSheet, Text } from "react-native";
import React from "react";

const PopularPost = () => {
  return (
    <View style={styles.popularPostContainer}>
      <Text>人気のPost</Text>
    </View>
  );
};

export default PopularPost;

const styles = StyleSheet.create({
  popularPostContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

