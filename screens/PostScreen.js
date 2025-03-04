import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const PostScreen = () => {
  return (
    <View style={styles.postContainer}>
        <Text>投稿</Text>
    </View>
  )
}

export default PostScreen

const styles = StyleSheet.create({
    postContainer: {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center'
    }
});