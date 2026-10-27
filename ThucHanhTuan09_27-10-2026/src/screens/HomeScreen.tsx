import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Button, Text, View } from 'react-native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { fetchBooks } from '../api/books';
import BookGrid from '../components/BookGrid';
import type { Book } from '../types';
import type { RootStackParamList } from '../navigation/types';
export default function HomeScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const load = useCallback(async () => {
    try {
      setError(null);
      setBooks(await fetchBooks());
    } catch (e) {
      setError((e as Error).message);
    }
  }, []);
  useEffect(() => {
    load().finally(() => setLoading(false));
  }, [load]);
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await load();
    setRefreshing(false);
  }, [load]);
  if (loading)
    return (
      <ActivityIndicator
        size="large"
        style={{ flex: 1 }}
      />
    );
  if (error)
    return (
      <View style={{ padding: 20 }}>
        <Text>Không tải được sách: {error}</Text>
        <Button
          title="Thử lại"
          onPress={onRefresh}
        />
      </View>
    );
  return (
    <BookGrid
      books={books}
      onPressBook={(id) => navigation.navigate('BookDetail', { bookId: id })}
      refreshing={refreshing}
      onRefresh={onRefresh}
    />
  );
}
