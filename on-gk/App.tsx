import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import FetchApi from './components/fetch-api';

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      <FetchApi />
    </SafeAreaProvider>
  );
}
