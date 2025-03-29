import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from "react-native";
import axios from "axios";

export default function ResetPasswordVavigator({ route, navigation }) {
  const { email, token } = route.params;
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleResetPassword = async () => {
    setMessage("");
    if (password !== passwordConfirmation) {
        setMessage("パスワードが確認用パスワードと一致してません。");
        return;
      }
    
    setIsLoading(true);
      
    try {
      const response = await axios.post("http://localhost/api/user/reset_password", {
        email,
        password,
      });

      if (response.data.success) {
        Alert.alert("成功", "パスワードをリセットしました。", [
          { text: "OK", onPress: () => navigation.navigate("LoginScreen") },
        ]);
      } else {
        setMessage(response.data.message || "エラーが発生しました。");
      }
    } catch (err) {
      setMessage(err.response?.data?.message || "通信エラー");
    } finally {
        setIsLoading(false); 
      }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>パスワード再設定</Text>
      <Text style={styles.subtitle}>新しいパスワードを入力してください</Text>

      <TextInput
        style={styles.input}
        placeholder="新しいパスワード"
        placeholderTextColor="#aaa"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TextInput
        style={styles.input}
        placeholder="パスワード（確認）"
        placeholderTextColor="#aaa"
        secureTextEntry
        value={passwordConfirmation}
        onChangeText={setPasswordConfirmation}
      />

      {message ? <Text style={styles.errorMessage}>{message}</Text> : null}

      <TouchableOpacity style={styles.button} onPress={handleResetPassword} disabled={isLoading}>
        <Text style={styles.buttonText}>パスワードを変更</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
        <Text style={styles.backText}>ログイン画面に戻る</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "linear-gradient(180deg, #00c6ff, #0072ff)",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: "#eee",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 50,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    paddingHorizontal: 15,
    backgroundColor: "#f9f9f9",
    fontSize: 16,
    marginBottom: 10,
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: '#4a90e2',
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    shadowColor: "#0072ff",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  errorMessage: {
    color: "red",
    fontSize: 14,
    marginBottom: 10,
  },
  backText: {
    color: '#4a90e2',
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 15,
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

