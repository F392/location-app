import { View, Text, StyleSheet, Dimensions, FlatList, Platform, StatusBar } from 'react-native'
import React, {useState, useRef} from 'react'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import * as Device from 'expo-device'

import Post from '../components/home/Post'

const posts = [
    {
        channel_name: 'ChannelName1',
        video_url: 'https://videos.pexels.com/video-files/30115965/12915984_1080_1920_25fps.mp4',
        captiion: 'Caption1',
        music_name: 'MusicName1',

    },
    {
        channel_name: 'ChannelName2',
        video_url: 'https://videos.pexels.com/video-files/30583752/13097017_360_640_30fps.mp4',
        captiion: 'Caption2',
        music_name: 'MusicName2',

    },
    {
        channel_name: 'ChannelName3',
        video_url: 'https://videos.pexels.com/video-files/30416945/13034744_360_640_30fps.mp4',
        captiion: 'Caption3',
        music_name: 'MusicName3',

    },
]

const HomeScreen = () => {
    //現在表示されている動画情報
    const [currentVisibleIndex, setCurrentVisibleIndex] = useState(null)
    //動画の高さを指定(画面の高さ - ボトムバーの高さ - ステータスバーの高さ)
    const height = Dimensions.get('window').height - useBottomTabBarHeight() 
    //ポストコンポーネントに動画を渡す
    const renderItem = ({item, index}) => {
        return (
            <View style={{height:height}}>
                <Post
                item = {item}
                index = {index}
                currentVisibleIndex = {currentVisibleIndex}
                />
            </View>
        )
    }
    //スナップ時に呼び出して次の動画のindexを取得する
    const onViewableItemsChanged = useRef(({ viewableItems }) => {
        if (viewableItems && viewableItems.length > 0) {
          setCurrentVisibleIndex(viewableItems[0].index);
        }
      }).current;

  return (
    <View style={styles.homeContainer}>
        <FlatList
        //データ
        data={posts}
        //レンダー先
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
        windowSize={4}
        //レンダー数の初期値
        initialNumToRender={1}
        //レンダー数の上限
        maxToRenderPerBatch={2}
        //画面からはみ出た映像はクリップ
        removeClippedSubviews
        //映像を一つずつ止める
        pagingEnabled
        //スクロールバー削除
        showsVerticalScrollIndicator = {false}
        //画面の高さ
        snapToInterval={height}
        //スナップ時の位置
        snapToAlignment={'start'}
        //スナップ時の速さ
        decelerationRate={'fast'}
        //画面が切り替わった時のアイテムを取得
        onViewableItemsChanged={onViewableItemsChanged.current}
        //スナップ時、画面の50%が表示されたタイミングでonViewableItemsChangedが実行される
        viewabilityConfig={{itemVisiblePercentThreshold: 50}}
        />
  </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
    homeContainer: {
        flex: 1, 
    },
});