import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Switch,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";

export default function SettingsScreen({ navigation }){
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [pushNotifications, setPushNotifications] = useState(true);
  
  return (
    <View style={styles.container}>
      {/* アカウント設定 */}
      <Text style={styles.sectionTitle}>アカウント設定</Text>
      <TouchableOpacity style={styles.item} onPress={() => {}}>
        <Ionicons name="lock-closed-outline" size={24} color="black" />
        <Text style={styles.itemText}>パスワード変更</Text>
      </TouchableOpacity>

      {/* 通知設定 */}
      <Text style={styles.sectionTitle}>通知設定</Text>
      <View style={styles.item}>
        <Ionicons name="notifications-outline" size={24} color="black" />
        <Text style={styles.itemText}>プッシュ通知</Text>
        <Switch value={pushNotifications} onValueChange={setPushNotifications} />
      </View>

      {/* アプリ設定 */}
      <Text style={styles.sectionTitle}>アプリ設定</Text>
      <View style={styles.item}>
        <Ionicons name="moon-outline" size={24} color="black" />
        <Text style={styles.itemText}>ダークモード</Text>
        <Switch value={isDarkMode} onValueChange={setIsDarkMode} />
      </View>

      {/* その他 */}
      <Text style={styles.sectionTitle}>その他</Text>
      <TouchableOpacity style={styles.item} onPress={() => {}}>
        <Ionicons name="document-text-outline" size={24} color="black" />
        <Text style={styles.itemText}>利用規約</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.item} onPress={() => {}}>
        <Ionicons name="log-out-outline" size={24} color="red" />
        <Text style={[styles.itemText, { color: "red" }]}>ログアウト</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  itemText: {
    fontSize: 18,
    marginLeft: 15,
    flex: 1,
  },
});
