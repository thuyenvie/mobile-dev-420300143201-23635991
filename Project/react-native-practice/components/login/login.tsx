import { createNativeStackNavigator, type NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Button, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

type LoginStackParamList = {
  Login: undefined;
  Welcome: { username: string };
};

const Stack = createNativeStackNavigator<LoginStackParamList>();
const ACCOUNT = { username: 'admin', password: '123456' };

function LoginScreen({ navigation }: NativeStackScreenProps<LoginStackParamList, 'Login'>) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  function handleLogin() {
    if (username.trim() !== ACCOUNT.username || password !== ACCOUNT.password) {
      setError('Tên đăng nhập hoặc mật khẩu không đúng.');
      return;
    }

    setError('');
    navigation.replace('Welcome', { username: ACCOUNT.username });
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>Đăng nhập</Text>
        <Text style={styles.label}>Username</Text>
        <TextInput
          style={styles.input}
          accessibilityLabel="Username"
          placeholder="Nhập tên đăng nhập"
          placeholderTextColor="#6b7280"
          autoCapitalize="none"
          autoCorrect={false}
          value={username}
          onChangeText={setUsername}
        />
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          accessibilityLabel="Password"
          placeholder="Nhập mật khẩu"
          placeholderTextColor="#6b7280"
          secureTextEntry
          autoCapitalize="none"
          autoCorrect={false}
          value={password}
          onChangeText={setPassword}
          returnKeyType="go"
          onSubmitEditing={handleLogin}
        />
        {error ? <Text style={styles.error} accessibilityRole="alert">{error}</Text> : null}
        <Button title="Đăng nhập" onPress={handleLogin} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

function WelcomeScreen({ route }: NativeStackScreenProps<LoginStackParamList, 'Welcome'>) {
  return (
    <View style={[styles.container, styles.content]}>
      <Text style={styles.title}>Chào mừng, {route.params.username}!</Text>
      <Text style={styles.label}>Bạn đã đăng nhập thành công.</Text>
    </View>
  );
}

export default function Login() {
  // Expo Router đã cung cấp NavigationContainer ở cấp ứng dụng.
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Đăng nhập' }} />
      <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ title: 'Chào mừng' }} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  content: { flexGrow: 1, justifyContent: 'center', padding: 24 },
  title: { fontSize: 26, fontWeight: 'bold', marginBottom: 24, color: '#111827' },
  label: { fontSize: 16, marginBottom: 8, color: '#111827' },
  input: {
    borderWidth: 1,
    borderColor: '#9ca3af',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 16,
    color: '#111827',
  },
  error: { color: '#b91c1c', marginBottom: 16 },
});
