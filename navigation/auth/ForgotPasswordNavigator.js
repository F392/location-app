import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import axios from "axios";

const ForgotPasswordNavigator = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSendEmail = async () => {
    setMessage('');
    setIsLoading(true);
    try {
      const response = await axios.post("http://localhost/api/create_cachedOtp", { email });
      if (response.data.success) {
        navigation.navigate("ForgotPasswordVerificationNavigator", { email });
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
      <Text style={styles.title}>パスワードをリセット</Text>
      <Text style={styles.subtitle}>登録したメールアドレスを入力してください</Text>
      
      <TextInput
        style={styles.input}
        placeholder="メールアドレス"
        placeholderTextColor="#aaa"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />

      {message ? <Text style={styles.errorMessage}>{message}</Text> : null}

      <TouchableOpacity style={styles.button} onPress={handleSendEmail} disabled={isLoading}>
      <Text style={styles.buttonText}>送信</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>ログイン画面に戻る</Text>
      </TouchableOpacity>

          {isLoading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      )}
    </View>
  );
};

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
    color: "#333",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
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

export default ForgotPasswordNavigator;
