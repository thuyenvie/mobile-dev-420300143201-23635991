import { View, Text, StyleSheet } from 'react-native';

export default function Bai01CategoryChips() {
  const categories = [
    'Văn học',
    'Kinh tế',
    'Thiếu nhi',
    'Truyện tranh',
    'Truyện tranh trinh thám khoa học viễn tưởng',
  ];

  return (
    <View style={styles.container}>
      {categories.map((category) => (
        <View key={category} style={styles.chip}>
          <Text>{category}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    width: 'auto',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'indigo',
  },
});