import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  Dimensions,
  Modal,
} from "react-native";
import React, { useState, } from "react";
import { useRoute, useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

import TodayPost from "../components/profile/TodayPost";
import PopularPost from "../components/profile/PopularPost";

//画面の高さ取得
const { height } = Dimensions.get("window");

export default function({menuVisible, setMenuVisible}){
  //ナビゲーション取得
  const navigation = useNavigation();
  //ユーザー情報取得
  const route = useRoute();
  const { user } = route.params; // initialParams で渡した user を取得

  //タブの選択を確認
  const [selectedTab, setSelectedTab] = useState("TodayPost");

  return (
    <View style={styles.profilecontainer}>
      <View style={styles.header}>
        <Image
          source={{
            uri: "https://images.pexels.com/photos/30833852/pexels-photo-30833852.jpeg?auto=compress&cs=tinysrgb&w=1200&lazy=load",
          }}
          style={styles.profileImage}
        />
        <Text style={styles.location}>{user.location}</Text>
        <Text style={styles.bio}>{user.bio}</Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.userHandle}>総いいね数</Text>
          <Text style={styles.userCount}>{user.likes}</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.userHandle}>総コメント数</Text>
          <Text style={styles.userCount}>{user.comments}</Text>
        </View>
      </View>

      <View style={styles.postContainer}>
        <View style={styles.postItem}>
          <Pressable
            style={[
              styles.tab,
              selectedTab === "TodayPost" && styles.activeTab,
            ]}
            onPress={() => setSelectedTab("TodayPost")}
          >
            <Text style={styles.recentPostsTitle}>今日の投稿</Text>
          </Pressable>
          {/*         <FlatList
        data={user.recentPosts}
        horizontal
        renderItem={({ item }) => (
          <TouchableOpacity>
            <Image source={{ uri: item.image }} style={styles.postImage} />
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id}
      /> */}
        </View>
        <View style={styles.postItem}>
          <Pressable
            style={[
              styles.tab,
              selectedTab === "PopularPost" && styles.activeTab,
            ]}
            onPress={() => setSelectedTab("PopularPost")}
          >
            <Text style={styles.recentPostsTitle}>人気の投稿</Text>
          </Pressable>
        </View>
      </View>

      {/* 選択されたコンポーネントを表示 */}
      <View style={styles.postDetail}>
        {selectedTab === "TodayPost" ? <TodayPost /> : <PopularPost />}
      </View>

      {/* メニューのモーダル */}
      <Modal visible={menuVisible} transparent animationType="slide">
      <Pressable
          style={styles.modalOverlay}
          onPress={() => {
            setMenuVisible(false);
          }}
        >
          <View style={styles.modalContainer}>
            <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => {
              setMenuVisible(false);
              navigation.navigate("Settings"); 
            }}
            >
              <Ionicons name="settings-outline" size={24} color="black" />
              <Text style={styles.menuText}>設定</Text>
            </TouchableOpacity>

            <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => {
              setMenuVisible(false);
              navigation.navigate("EditProfile"); 
            }}
            >
              <Ionicons name="person-outline" size={24} color="black" />
              <Text style={styles.menuText}>プロフィール編集</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem}>
              <Ionicons name="archive-outline" size={24} color="black" />
              <Text style={styles.menuText}>アーカイブ</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem}>
              <Ionicons name="log-out-outline" size={24} color="red" />
              <Text style={[styles.menuText, { color: "red" }]}>ログアウト</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  profilecontainer: {
    flex: 1,
    padding: 20,
  },
  header: {
    alignItems: "center",
    marginBottom: 10,
  },
  userCount: {
    fontSize: 25,
    fontWeight: "bold",
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginVertical: 10,
  },
  location: {
    fontSize: 16,
    color: "gray",
  },
  bio: {
    fontSize: 16,
    textAlign: "center",
    marginVertical: 10,
  },
  followInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  recentPostsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
  },
  postImage: {
    width: 100,
    height: 100,
    marginRight: 10,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  button: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginHorizontal: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  followButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#3b82f6",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    marginTop: 16,
  },
  followButtonText: {
    color: "white",
    marginLeft: 8,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 16,
  },
  statItem: {
    alignItems: "center",
  },
  postContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingBottom: 10,
    borderBottomWidth: 2,
    borderBottomColor: "#e5e7eb",
  },
  postItem: {
    alignItems: "center",
  },
  activeTab: {
    borderBottomWidth: 1,
    borderBottomColor: "#808080",
  },
  postDetail: {
    height: 100,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: "100%",
    backgroundColor: "white",
    paddingVertical: 20,
    paddingHorizontal: 25,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 10,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  menuText: {
    fontSize: 18,
    marginLeft: 15,
  },
});
