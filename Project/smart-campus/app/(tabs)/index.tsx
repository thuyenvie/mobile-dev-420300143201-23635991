import { StyleSheet, View } from 'react-native';
// import CampusDashboard from '../../components/CampusDashboard/CampusDashboard';
// import CampusDashboard from '../../components/CampusDashboard/CampusDashboard-SectionList';
// import CampusDashboard from '../../components/CampusDashboard/CampusDashboard-ResponsiveCard';
// import CampusDashboard from '../../components/CampusDashboard/CampusDashboard-Keyboard';
import CampusDashboard from '../../components/CampusDashboard/CampusDashboard-Validation';

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