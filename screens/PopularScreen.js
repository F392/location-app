import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const PopularScreen = () => {
  return (
    <View style={styles.friendContainer}>
        <Text>友達</Text>
    </View>
  )
}

export default PopularScreen

const styles = StyleSheet.create({
    friendContainer: {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center'
    }
});