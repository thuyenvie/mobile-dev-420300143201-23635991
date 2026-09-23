import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Bai01Header from './components/Bai01Header';
import Bai02BookCard from './components/Bai02BookCard';
import Bai01CategoryChips from './components/Bai01CategoryChips';
import Bai02BookGrid from './components/Bai02BookGrid';
import Bai01Badge from './components/Bai01Badge';
import Bai02FloatingCart from './components/Bai02FloatingCart';
import Challenge03 from './components/Challenge03';
import Bai01HomeScreen from './components/Bai01HomeScreen';
import Bai02BookDetail from './components/Bai02BookDetail';
import Bai01BottomTab from './components/Bai01BottomTab';
import Bai02CartScreen from './components/Bai02CartScreen';

export default function App() {
  return (

    <View style={styles.container}>
      {/* <Bai01Header />
      <Bai02BookCard/>
      <Bai02BookCard/>
      <Bai02BookCard/>
      <Bai02BookCard/>
      <Bai02BookCard/> */}
      {/* <Bai01CategoryChips/> */}
      {/* <Bai02BookGrid/> */}
      {/* <Bai01Badge/> */}
      {/* <Bai02FloatingCart/> */}
      {/* <Challenge03/> */}
      {/* <Bai01HomeScreen/> */}
      {/* <Bai02BookDetail/> */}
      {/* <Bai01BottomTab/> */}
      <Bai02CartScreen/>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
