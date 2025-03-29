import React, { useRef, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ForgotPasswordVerificationNavigator = ({ route, navigation }) => {
  const { email } = route.params;
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);
  const [message, setMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // 入力変更時の処理
  const handleChange = (text, index) => {
    if (text.length > 1) {
      text = text.charAt(text.length - 1); // 最後の文字だけ取得
    }

    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    // 6桁揃ったらAPIに送信
    if (newCode.join("").length === 6) {
      handleVerificationComplete(newCode.join(""));
    }

    // 次の入力欄へ移動
    if (text && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  // バックスペースで前の入力欄へ戻る
  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === "Backspace" && index > 0 && !code[index]) {
      inputRefs.current[index - 1].focus();
    }
  };

  // 認証コード送信処理
  const handleVerificationComplete = async (otp) => {
    setMessage('');
    setSuccessMessage('');
    try {
      const response = await axios.post(
        "http://localhost/api/forgot_password_verify_otp",
        {
          email,
          otp,
        }
      );
      if (response.data.success) {
        navigation.navigate("ResetPasswordNavigator", { email })
      } else {
        setMessage(response.data.message || "エラーが発生しました。");
      }
    } catch (err) {
      setCode(["", "", "", "", "", ""]);
      inputRefs.current[0].focus();
      setMessage(err.response.data.message);
    }
  };

  const handleSendEmailAgain = async () => {
    setCode(["", "", "", "", "", ""]);
    setMessage('');
    setSuccessMessage('');
    setIsLoading(true); //ローディング開始
    try {
      const response = await axios.post(
        "http://localhost/api/forgot_password_send_mail_again",
        {
          email,
        }
      );
      if (response.data.success) {
        setSuccessMessage(response.data.message);
      } else {
        setMessage(response.data.message || "エラーが発生しました。");
      }
    } catch (err) {
      setMessage(err.response.data.message);
    } finally {
      setIsLoading(false); // ローディング終了
    }
  }

  const handleCancel = async () => {
    try {
      const response = await axios.post(
        "http://localhost/api/delete_cachedOtp",
        {
          email,
        }
      );
      if (response.data.success) {
        navigation.navigate("LoginScreen");
      } else {
        setMessage(response.data.message || "エラーが発生しました。");
      }
    } catch (err) {
      setMessage(err.response.data.message);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>認証コードを入力してください</Text>
      <Text style={styles.subtitle}>{email} に送信された6桁のコード{"\n"}認証コードの有効期限は10分です</Text>

      <View style={styles.inputContainer}>
        {code.map((digit, index) => (
          <TextInput
            key={index}
            ref={(ref) => (inputRefs.current[index] = ref)}
            style={styles.input}
            value={digit}
            onChangeText={(text) => handleChange(text, index)}
            onKeyPress={(e) => handleKeyPress(e, index)}
            keyboardType="number-pad"
            maxLength={1}
            textAlign="center"
          />
        ))}
      </View>

      {message ? <Text style={styles.errorMessage}>{message}</Text> : null}
      {successMessage ? <Text style={styles.successMessage}>{successMessage}</Text> : null}

      <TouchableOpacity style={styles.button} onPress={handleSendEmailAgain}>
        <Text style={styles.buttonText}>コードを再送信</Text>
      </TouchableOpacity>

          {isLoading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      )}

      <View style={styles.registerContainer}>
        <TouchableOpacity onPress={handleCancel}>
          <Text style={styles.registerLink}>キャンセル</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  input: {
    width: 40,
    height: 50,
    marginHorizontal: 5,
    borderBottomWidth: 2,
    borderBottomColor: "#0072ff",
    fontSize: 24,
  },
  button: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#0072ff",
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  errorMessage:{
    marginTop: 25,
    fontSize: 12,
    color:'red',
  },
  successMessage: {
    marginTop: 25,
    fontSize: 12,
    color:'green',
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
  registerContainer: {
    marginTop: 20,
  },
  registerLink: {
    color: "#0072ff",
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default ForgotPasswordVerificationNavigator;
