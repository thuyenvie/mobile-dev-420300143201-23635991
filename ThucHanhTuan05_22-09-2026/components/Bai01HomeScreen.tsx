import { SafeAreaView, View, ScrollView, StyleSheet } from 'react-native';

import Bai01Header from './Bai01Header';
import Bai01CategoryChips from './Bai01CategoryChips';
import Bai02BookGrid from './Bai02BookGrid';

export default function Bai01HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Bai01Header />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Bai01CategoryChips />

        <Bai02BookGrid />
      </ScrollView>

      <View style={styles.cartButton}>
        <View style={styles.cartBadge}>
          <View />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingBottom: 120,
  },
  cartButton: {
    position: 'absolute',
    bottom: 24,
    right: 20,

    width: 64,
    height: 64,
    borderRadius: 32,

    backgroundColor: '#6685ed',

    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBadge: {
    position: 'absolute',
    top: 0,
    right: 0,

    width: 22,
    height: 22,
    borderRadius: 11,

    backgroundColor: 'red',
  },
});