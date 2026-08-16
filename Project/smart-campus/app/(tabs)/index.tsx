import { StyleSheet, View } from 'react-native';
import CampusDashboard from '../../components/CampusDashboard/CampusDashboard';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <CampusDashboard />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});