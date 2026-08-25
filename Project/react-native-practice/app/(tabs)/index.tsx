import { Image } from 'expo-image';
import { Platform, StyleSheet } from 'react-native';

import { HelloWave } from '@/components/hello-wave';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Link } from 'expo-router';
import AppTuan01 from '@/components/ThucHanhTuan01_18-08-2026';
import HomeScreen from '@/components/ThucHanhTuan02_25-08-2026';

export default function IndexForAll() {
  return (

    // Bài tập tuần 01 ngày 18-08-2026
    //<AppTuan01 />

    //Bai tập tuần 02 ngày 25-08-2026
    <HomeScreen />
  );
}
