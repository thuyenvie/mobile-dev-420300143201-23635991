import { SafeAreaView, View, Text, ScrollView, StyleSheet } from 'react-native';

export default function Bai02BookDetail() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageContainer}>
        <View style={styles.image}>
          <Text>Ảnh bìa</Text>
        </View>
      </View>

      <ScrollView
        style={styles.info}
        contentContainerStyle={styles.infoContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>
          Lập trình React Native cơ bản
        </Text>

        <Text style={styles.price}>
          150.000đ
        </Text>

        <Text style={styles.description}>
          Đây là phần mô tả sách. Nội dung mô tả có thể dài
          và người dùng có thể cuộn xuống để đọc toàn bộ
          thông tin của cuốn sách.
        </Text>

        <Text style={styles.detail}>
          Tác giả: Nguyễn Văn A
        </Text>

        <Text style={styles.detail}>
          Nhà xuất bản: Nhà xuất bản Giáo dục
        </Text>

        <Text style={styles.detail}>
          Năm xuất bản: 2026
        </Text>

        <Text style={styles.detail}>
          Số trang: 350
        </Text>

        <Text style={styles.detail}>
          Thể loại: Công nghệ thông tin
        </Text>

        <Text style={styles.detail}>
          Ngôn ngữ: Tiếng Việt
        </Text>
      </ScrollView>


      <View style={styles.bottomBar}>
        <Text style={styles.button}>
          Thêm vào giỏ
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  image: {
    width: 140,
    aspectRatio: 3 / 4,

    backgroundColor: '#ddd',

    justifyContent: 'center',
    alignItems: 'center',
  },
  info: {
    flex: 1,
  },
  infoContent: {
    padding: 16,
    gap: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  description: {
    lineHeight: 22,
  },
  detail: {
    padding: 12,
    backgroundColor: '#eee',
  },
  bottomBar: {
    height: 64,

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    paddingHorizontal: 16,

    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  button: {
    flex: 1,

    textAlign: 'center',
    paddingVertical: 14,

    backgroundColor: '#6685ed',
    fontWeight: 'bold',
  },
});