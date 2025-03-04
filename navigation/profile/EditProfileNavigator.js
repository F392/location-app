import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import RNPickerSelect from "react-native-picker-select";

// 都道府県のデータ
const prefectures = [
  { label: "北海道", value: "北海道" },
  { label: "青森県", value: "青森県" },
  { label: "岩手県", value: "岩手県" },
  { label: "宮城県", value: "宮城県" },
  { label: "秋田県", value: "秋田県" },
  { label: "山形県", value: "山形県" },
  { label: "福島県", value: "福島県" },
  { label: "茨城県", value: "茨城県" },
  { label: "栃木県", value: "栃木県" },
  { label: "群馬県", value: "群馬県" },
  { label: "埼玉県", value: "埼玉県" },
  { label: "千葉県", value: "千葉県" },
  { label: "東京都", value: "東京都" },
  { label: "神奈川県", value: "神奈川県" },
  { label: "新潟県", value: "新潟県" },
  { label: "富山県", value: "富山県" },
  { label: "石川県", value: "石川県" },
  { label: "福井県", value: "福井県" },
  { label: "山梨県", value: "山梨県" },
  { label: "長野県", value: "長野県" },
  { label: "岐阜県", value: "岐阜県" },
  { label: "静岡県", value: "静岡県" },
  { label: "愛知県", value: "愛知県" },
  { label: "三重県", value: "三重県" },
  { label: "滋賀県", value: "滋賀県" },
  { label: "京都府", value: "京都府" },
  { label: "大阪府", value: "大阪府" },
  { label: "兵庫県", value: "兵庫県" },
  { label: "奈良県", value: "奈良県" },
  { label: "和歌山県", value: "和歌山県" },
  { label: "鳥取県", value: "鳥取県" },
  { label: "島根県", value: "島根県" },
  { label: "岡山県", value: "岡山県" },
  { label: "広島県", value: "広島県" },
  { label: "山口県", value: "山口県" },
  { label: "徳島県", value: "徳島県" },
  { label: "香川県", value: "香川県" },
  { label: "愛媛県", value: "愛媛県" },
  { label: "高知県", value: "高知県" },
  { label: "福岡県", value: "福岡県" },
  { label: "佐賀県", value: "佐賀県" },
  { label: "長崎県", value: "長崎県" },
  { label: "熊本県", value: "熊本県" },
  { label: "大分県", value: "大分県" },
  { label: "宮崎県", value: "宮崎県" },
  { label: "鹿児島県", value: "鹿児島県" },
  { label: "沖縄県", value: "沖縄県" },
];

export default function EditProfileNavigator({ navigation }) {
  const [icon, setIcon] = useState(null); // アイコン画像
  const [name, setName] = useState(""); // 名前
  const [username, setUsername] = useState("@"); // ユーザー名
  const [location, setLocation] = useState(""); // 住まい
  const [bio, setBio] = useState(""); // 自己紹介
  const [url, setUrl] = useState(""); // URL

  // アイコン画像を変更する関数
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaType: "photo",
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
    
      if (!result.canceled) {
        setIcon(result.assets[0].uri);
    }
  };

  // ユーザー名の入力時に「@」を付ける
  const handleUsernameChange = (text) => {
    if (text.startsWith("@")) {
      setUsername(text); // ユーザー名がすでに「@」で始まっている場合、そのまま設定
    } else {
      setUsername("@" + text); // ユーザー名に「@」を追加
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* アイコン画像 */}
      <TouchableOpacity onPress={pickImage} style={styles.iconContainer}>
        <View style={styles.iconWrapper}>
          {icon ? (
            <Image source={{ uri: icon }} style={styles.icon} />
          ) : (
            <Ionicons name="camera" size={50} color="gray" />
          )}
          {/* 円形ガイドをオーバーレイとして表示 */}
          <View style={styles.circleGuide} />
        </View>
      </TouchableOpacity>

      {/* 名前 */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>名前</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="名前を入力"
        />
      </View>

      {/* ユーザー名 */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>ユーザー名</Text>
        <TextInput
          style={styles.input}
          value={username}
          onChangeText={handleUsernameChange} // ユーザー名の変更処理を追加
          placeholder="ユーザー名を入力"
        />
      </View>

      {/* 住まい (都道府県選択) */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>住まい</Text>
        <RNPickerSelect
          onValueChange={(value) =>{ 
            console.log("選択された都道府県:", value);
            setLocation(value); }}
          items={prefectures}
          placeholder={{ label: "都道府県を選択", value: undefined }}
          style={pickerSelectStyles}
          value={location || undefined} 
        />
      </View>

      {/* 自己紹介 */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>自己紹介</Text>
        <TextInput
          style={[styles.input, { height: 100 }]}
          value={bio}
          onChangeText={setBio}
          placeholder="自己紹介を入力"
          multiline
        />
      </View>

      {/* URL */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>リンク</Text>
        <TextInput
          style={styles.input}
          value={url}
          onChangeText={setUrl}
          placeholder="ウェブサイトやSNSのURLを入力"
        />
      </View>

      {/* 保存ボタン */}
      <TouchableOpacity
        style={styles.saveButton}
        onPress={() => console.log("保存された")}
      >
        <Text style={styles.saveButtonText}>保存</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const pickerSelectStyles = StyleSheet.create({
  inputAndroid: {
    fontSize: 16,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  inputIOS: {
    fontSize: 16,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingRight: 30,
  },
  inputIOSContainer: {
    pointerEvents: 'none',
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 10,
  },
  iconContainer: {
    alignSelf: "center",
    marginBottom: 20,
  },
  icon: {
    width: "100%",
    height: "100%",
    borderRadius: 50,
    resizeMode: "cover", 
  },
  iconWrapper: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#eee",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    position: "relative",
  },
  circleGuide: {
    position: "absolute",
    width: 100,
    height: 100, 
    borderRadius: 50,
    borderWidth: 1, 
    borderColor: "rgba(0, 0, 0, 0.3)", 
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
  },
  saveButton: {
    backgroundColor: "tomato",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  saveButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
