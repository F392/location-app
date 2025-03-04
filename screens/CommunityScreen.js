import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const CommunityScreen = () => {
  return (
    <View style={styles.CommunityContainer}>
    <Text>コミュニティ</Text>
  </View>
  )
}

export default CommunityScreen

const styles = StyleSheet.create({
    CommunityContainer: {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center'
    }
});