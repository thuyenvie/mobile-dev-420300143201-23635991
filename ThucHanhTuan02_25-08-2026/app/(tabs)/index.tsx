import CourseList from './index_Course-FlatList';
import StudentDirectory from './index_Student_Directory';
import { ScrollView, useWindowDimensions, View } from 'react-native';

export default function Index() {
  const { width } = useWindowDimensions();

  return (
    <ScrollView horizontal pagingEnabled style={{ flex: 1 }}>
      <View style={{ width, flex: 1 }}>
        <CourseList />
      </View>
      <View style={{ width, flex: 1 }}>
        <StudentDirectory />
      </View>
    </ScrollView>
  );
}
