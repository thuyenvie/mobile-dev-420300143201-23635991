import { useEffect } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
} from "react-native";
import {
  Provider,
  useDispatch,
  useSelector,
} from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";

import {
  store,
  type AppDispatch,
  type RootState,
} from "./src/store";
import { restoreSession } from "./src/store/authSlice";
import { setAuthToken } from "./src/api/client";
import type { RootStackParamList } from "./src/navigation/types";

import AuthScreen from "./src/screens/AuthScreen";
import HomeScreen from "./src/screens/HomeScreen";
import CheckoutScreen from "./src/screens/CheckoutScreen";
import BookDetailScreen from "./src/screens/BookDetailScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

function AppNavigator() {
  const dispatch = useDispatch<AppDispatch>();

  const { initialized, token } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    dispatch(restoreSession());
  }, [dispatch]);

  useEffect(() => {
    setAuthToken(token);
  }, [token]);

  if (!initialized) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#4338ca" />
        <Text style={styles.message}>
          Đang kiểm tra phiên đăng nhập...
        </Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Trang chủ" }}
        />

        <Stack.Screen
          name="Auth"
          component={AuthScreen}
          options={{ title: "Đăng nhập / Đăng ký" }}
        />

        <Stack.Screen
          name="BookDetail"
          component={BookDetailScreen}
          options={{ title: "Chi tiết sách" }}
        />

        <Stack.Screen
          name="Checkout"
          component={CheckoutScreen}
          options={{ title: "Thanh toán" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <AppNavigator />
      </SafeAreaProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: "#fff",
  },
  message: {
    marginVertical: 16,
    textAlign: "center",
  },
});
