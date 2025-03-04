import { View, StyleSheet } from 'react-native'
import React from 'react'
import { Video } from 'expo-av'

const Post = ({ item }) => {
  return (
    <View style={styles.PostContainer}>
      <Video
        source={{ uri: item.video_url }} // URLの形式を修正
        style={styles.Video}
        useNativeControls={true} // ユーザーがビデオコントロールを使用できるようにする
        resizeMode="cover"
        isLooping={true} // ループ再生
        shouldPlay={true} // 自動再生を有効にする
        onError={(e) => console.log('Video Error:', e)} // エラーハンドリング
      />
    </View>
  )
}

const styles = StyleSheet.create({
  PostContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  Video: {
    width: '100%',
    height: '100%', // 高さを調整
  }
})

export default Post
