import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginScreen from './screens/LoginScreen';
import Main from './Main';
import RegisterNavigator from './navigation/auth/RegisterNavigator'
import VerificationNavigator from './navigation/auth/VerificationNavigator'
import ForgotPasswordNavigator from './navigation/auth/ForgotPasswordNavigator'
import ForgotPasswordVerificationNavigator from './navigation/auth/ForgotPasswordVerificationNavigator'
import ResetPasswordNavigator from './navigation/auth/ResetPasswordNavigator'

const Stack = createStackNavigator();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);

 useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        setIsLoggedIn(!!token); // tokenがあればtrue、なければfalse
      } catch (error) {
        console.error("Error checking login status", error);
        setIsLoggedIn(false); // エラー時は未ログイン扱い
      }
    };
    checkLoginStatus();
  }, []);

  if (isLoggedIn === null) {
    return null; // ローディング中の場合
  }
  

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={isLoggedIn ? 'Main' : 'LoginScreen'}>
        <Stack.Screen
          name="Main"
          component={Main}
          options={{ headerShown: false }} // Main画面はタブナビゲーション内なのでヘッダーは非表示にする
        />
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
        name="RegisterNavigator"
        component={RegisterNavigator}
        options={{ 
          headerTitle: 'アカウント登録',
          headerLeft: () => null,
         }}
        />
        <Stack.Screen
        name="VerificationNavigator"
        component={VerificationNavigator}
        options={{ 
          headerShown: false,
          headerLeft: () => null,
         }}
        />
        <Stack.Screen
        name="ForgotPasswordNavigator"
        component={ForgotPasswordNavigator}
        options={{ 
          headerShown: false,
          headerLeft: () => null,
         }}
        />
        <Stack.Screen
        name="ForgotPasswordVerificationNavigator"
        component={ForgotPasswordVerificationNavigator}
        options={{ 
          headerShown: false,
          headerLeft: () => null,
         }}
        />
        <Stack.Screen
        name="ResetPasswordNavigator"
        component={ResetPasswordNavigator}
        options={{ 
          headerShown: false,
          headerLeft: () => null,
         }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
