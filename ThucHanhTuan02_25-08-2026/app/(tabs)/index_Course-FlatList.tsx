import CourseListScreen from '../../components/Course-FlatList/CourseListScreen';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';



export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <CourseListScreen />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F8FA",
  },
  listContent: {
    flexGrow: 1,
    padding: 20,
  },
  separator: {
    height: 12,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 250,
    paddingHorizontal: 24,
  },
  emptyTitle: {
    color: '#182035',
    fontSize: 19,
    fontWeight: '700',
  },
  emptyText: {
    color: '#747B88',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 8,
  },
});

