import { View, StyleSheet, Text } from "react-native";
import React from "react";

const TodayPost = () => {
  return (
    <View style={styles.todayPostContainer}>
      <Text>今日のPost</Text>
    </View>
  );
};

export default TodayPost;

const styles = StyleSheet.create({
  todayPostContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

