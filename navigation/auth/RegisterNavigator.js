import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
import { ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import RNPickerSelect from "react-native-picker-select";
import axios from "axios";
import Icon from "react-native-vector-icons/FontAwesome";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { format } from "date-fns";

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

const RegisterNavigator = ({ navigation }) => {
  const [birthDate, setDate] = useState(null);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accountName, setAccountName] = useState("");
  const [tel, setTel] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [state, setState] = useState("");
  let pickerRef = null;
  const [isLoading, setIsLoading] = useState(false);


  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (selectedDate) => {
    const formattedDate = format(selectedDate, "yyyy-MM-dd"); // YYYY-MM-DD 形式に変換
    setDate(formattedDate);
    hideDatePicker();
  };

  const handleRegister = async () => {
    if (password !== passwordConfirmation) {
      setMessage("パスワードが確認用パスワードと一致してません。");
      return;
    }

    setIsLoading(true); //ローディング開始

    try {
      const response = await axios.post(
        "http://localhost/api/user/create_temp_user",
        {
          name,
          accountName,
          email,
          tel,
          password,
          state,
          birthDate,
        }
      );
      setErrors({});
      if (response.data.success) {
        navigation.navigate("VerificationNavigator", { email }); // 認証画面へ
      } else {
        setMessage(response.data.message || "エラーが発生しました。");
      }
    } catch (err) {
      if (err.response) {
        setErrors(err.response.data.errors);
      } else {
        setErrors({});
        setMessage("データベースで予期せぬエラーが起きました。");
      }
    }　finally {
      setIsLoading(false); // ローディング終了
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Icon name="user" size={20} color="#888" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="名前"
          value={name}
          onChangeText={setName}
        />
      </View>
      {errors.name?.[0] && <View style={styles.errorContainer}><Text style={styles.errorMessage}>{errors.name[0]}</Text></View>}


      <View style={styles.inputContainer}>
        <Icon name="at" size={20} color="#888" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="ユーザー名"
          value={accountName}
          onChangeText={setAccountName}
        />
      </View>
      {errors.accountName && errors.accountName[0] && <View style={styles.errorContainer}><Text style={styles.errorMessage}>{errors.accountName[0]}</Text></View>}

      <View style={styles.inputContainer}>
        <Icon name="envelope" size={20} color="#888" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="メールアドレス"
          value={email}
          onChangeText={setEmail}
        />
      </View>
      {errors.email && errors.email[0] && <View style={styles.errorContainer}><Text style={styles.errorMessage}>{errors.email[0]}</Text></View>}

      <View style={styles.inputContainer}>
        <Icon name="phone" size={20} color="#888" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="電話番号(ハイフンなし)"
          value={tel}
          onChangeText={setTel}
        />
      </View>
      {errors.tel && errors.tel[0] && <View style={styles.errorContainer}><Text style={styles.errorMessage}>{errors.tel[0]}</Text></View>}

      <View style={styles.inputContainer}>
        <Icon name="lock" size={20} color="#888" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="パスワード"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>

      <View style={styles.inputContainer}>
        <Icon name="lock" size={20} color="#888" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="確認用パスワード"
          secureTextEntry
          value={passwordConfirmation}
          onChangeText={setPasswordConfirmation}
        />
      </View>
      {errors.password && errors.password[0] && <View style={styles.errorContainer}><Text style={styles.errorMessage}>{errors.password[0]}</Text></View>}

      <TouchableOpacity
      style={styles.inputContainer}
      onPress={() => pickerRef?.togglePicker()}
      activeOpacity={0.7}
    >
      <Icon name="home" size={20} color="#888" style={styles.icon} />
      <RNPickerSelect
        onValueChange={(value) => setState(value)}
        items={prefectures}
        placeholder={{ label: "居住地を選択", value: undefined }}
        style={pickerSelectStyles}
        value={state || undefined}
        ref={(ref) => (pickerRef = ref)}
      />
    </TouchableOpacity>
    {errors.state && errors.state[0] && <View style={styles.errorContainer}><Text style={styles.errorMessage}>{errors.state[0]}</Text></View>}

      <TouchableWithoutFeedback onPress={showDatePicker}>
        <View style={styles.inputContainer}>
          <Icon name="calendar" size={20} color="#888" style={styles.icon} />
          {birthDate ? (
            <Text style={styles.dateText}>
              {birthDate}
            </Text>
          ) : (
            <Text style={styles.nonDateText}>生年月日を選択</Text>
          )}

          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
            locale="ja"
            confirmTextIOS="決定"
            cancelTextIOS="キャンセル"
            modalProps={{ presentationStyle: "overFullScreen" }}
            pickerStyleIOS={{ alignSelf: "center" }}
          />
        </View>
      </TouchableWithoutFeedback>
      {errors.birthDate && errors.birthDate[0] && <View style={styles.errorContainer}><Text style={styles.errorMessage}>{errors.birthDate[0]}</Text></View>}

      {message ? <Text style={styles.errorMessage}>{message}</Text> : null}

      <TouchableOpacity style={styles.button} 
      onPress={handleRegister}
      disabled={isLoading}>
        <Text style={styles.buttonText}>新規登録</Text>
      </TouchableOpacity>

      <View style={styles.signInContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
          <Text style={styles.signInLink}>登録済みの場合</Text>
        </TouchableOpacity>
      </View>
    </View>

    {isLoading && (
  <View style={styles.loadingOverlay}>
    <ActivityIndicator size="large" color="#fff" />
  </View>
)}
    </ScrollView>
  );
};

const pickerSelectStyles = StyleSheet.create({
  inputAndroid: {
    fontSize: 16,
    paddingVertical: 16,
  },
  inputIOS: {
    fontSize: 16,
    paddingVertical: 16,
    paddingRight: 30,
  },
  inputIOSContainer: {
    pointerEvents: "none",
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 50,
    paddingHorizontal: 20,
    backgroundColor: "linear-gradient(180deg, #00c6ff, #0072ff)",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "black",
    marginBottom: 30,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 25,
    marginBottom: 15,
    paddingHorizontal: 15,
    width: "100%",
    height: 50,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: "#333",
  },
  error: {
    color: "red",
    marginBottom: 10,
    textAlign: "center",
  },
  success: {
    color: "green",
    marginBottom: 10,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#4CAF50",
    width: "100%",
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: "center",
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  signInContainer: {
    marginTop: 20,
  },
  signInLink: {
    color: '#4a90e2',
    fontSize: 14,
    fontWeight: 'bold',
  },
  dateText: {
    fontSize: 16,
  },
  nonDateText: {
    fontSize: 16,
    opacity: 0.3,
  },
  errorContainer: {
    width: "100%", // 親の幅を全体にする
    alignItems: "flex-start", // 左寄せ
    paddingLeft: 10, // 左の余白を調整
    marginBottom: 15,
  },
  errorMessage:{
    fontSize: 12,
    color:'red',
  },
  loadingOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)", //背景を半透明に
    justifyContent: "center",
    alignItems: "center",
  },
});

export default RegisterNavigator;
