import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "./screens/HomeScreen";
import CommunityScreen from "./screens/CommunityScreen";
import PostScreen from "./screens/PostScreen";
import PopularScreen from "./screens/PopularScreen";
import ProfileScreen from "./screens/ProfileScreen";
import SettingsNavigator from "./navigation/profile/SettingsNavigator";
import EditProfileNavigator from "./navigation/profile/EditProfileNavigator";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function App() {
  const user = {
    username: "mikuni",
    location: "東京, 日本",
    bio: "趣味: 写真撮影, 旅行",
    likes: 200,
    comments: 150,
    recentPosts: [{ id: "1", image: "https://example.com/image1.jpg" }],
  };

  // プロフィールのメニュー
  const [menuVisible, setMenuVisible] = useState(false);
  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Main" options={{ headerShown: false }}>
          {() => (
            <Tab.Navigator
              screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                  let iconName;

                  switch (route.name) {
                    case "ホーム":
                      iconName = focused ? "home" : "home-outline";
                      break;
                    case "人気":
                      iconName = focused ? "people" : "people-outline";
                      break;
                    case "投稿":
                      iconName = focused ? "create" : "create-outline";
                      break;
                    case "コミュニティ":
                      iconName = focused
                        ? "chatbubbles"
                        : "chatbubbles-outline";
                      break;
                    case "プロフィール":
                      iconName = focused ? "person" : "person-outline";
                      break;
                  }

                  return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: "tomato",
                tabBarInactiveTintColor: "gray",
              })}
            >
              <Tab.Screen
                name="ホーム"
                component={HomeScreen}
                options={{ headerShown: false }}
              />
              <Tab.Screen name="人気" component={PopularScreen} />
              <Tab.Screen name="投稿" component={PostScreen} />
              <Tab.Screen name="コミュニティ" component={CommunityScreen} />
              <Tab.Screen
                name="プロフィール"
                initialParams={{ user: user }}
                options={{
                  headerTitle: user.username,
                  headerRight: () => (
                    <TouchableOpacity
                      style={styles.profileMenu}
                      onPress={toggleMenu}
                    >
                      <Ionicons name="menu" size={30} color="black" />
                    </TouchableOpacity>
                  ),
                }}
              >
                {() => (
                  <ProfileScreen
                    user={user}
                    menuVisible={menuVisible}
                    setMenuVisible={setMenuVisible}
                  />
                )}
              </Tab.Screen>
            </Tab.Navigator>
          )}
        </Stack.Screen>
        <Stack.Screen
          name="Settings"
          component={SettingsNavigator}
          options={{
            headerShown: true, // 設定画面のヘッダーを表示
            headerBackTitle: "プロフィール", // 戻るボタンのタイトルを「プロフィール」に変更
            title: '設定',
          }}
        />
        <Stack.Screen
          name="EditProfile"
          component={EditProfileNavigator}
          options={{
            headerShown: true, // 設定画面のヘッダーを表示
            headerBackTitle: "プロフィール", // 戻るボタンのタイトルを「プロフィール」に変更
            title: 'プロフィール編集',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  profileMenu: {
    marginRight: 15,
  },
});
