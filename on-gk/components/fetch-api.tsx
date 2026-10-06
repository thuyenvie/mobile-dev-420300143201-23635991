import { useCallback, useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Alert, Button, FlatList, RefreshControl, StyleSheet, Switch, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PostCard, { type Post } from './PostCard';

const API_URL = 'https://jsonplaceholder.typicode.com/posts';

export default function FetchApi() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('');
  const [isTile, setIsTile] = useState(false);
  const activeRequest = useRef<AbortController | null>(null);

  // Dùng chung cho lần tải đầu, nút thử lại và kéo làm mới.
  const loadPosts = useCallback(async () => {
    activeRequest.current?.abort();
    const controller = new AbortController();
    activeRequest.current = controller;
    const timeout = setTimeout(() => controller.abort(), 15000);
    try {
      const response = await fetch(API_URL, { signal: controller.signal });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data: Post[] = await response.json();
      if (activeRequest.current === controller) setPosts(data);
    } catch {
      if (activeRequest.current === controller) {
        setError('Không tải được bài viết. Kiểm tra kết nối mạng và thử lại.');
      }
    } finally {
      clearTimeout(timeout);
      if (activeRequest.current === controller) {
        setLoading(false);
        setRefreshing(false);
        activeRequest.current = null;
      }
    }
  }, []);

  const reloadPosts = (refresh = false) => {
    setError('');
    setLoading(!refresh);
    setRefreshing(refresh);
    void loadPosts();
  };

  useEffect(() => {
    // State chỉ cập nhật sau request bất đồng bộ (try/catch/finally).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void loadPosts();
    return () => {
      const request = activeRequest.current;
      activeRequest.current = null;
      request?.abort();
    };
  }, [loadPosts]);

  const handleSelect = useCallback((id: number) => {
    const post = posts.find((item) => item.id === id);
    if (post) Alert.alert(post.title, post.body);
  }, [posts]);

  const numColumns = isTile ? 2 : 1;
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>Post App</Text>
        <Text style={styles.subtitle}>Danh sách bài viết</Text>
        <View style={styles.toolbar}>
          <Text style={styles.count}>{posts.length} bài viết</Text>
          <View style={styles.toggle}>
            <Text>Dạng lưới</Text>
            <Switch value={isTile} onValueChange={setIsTile} accessibilityLabel="Dạng lưới" trackColor={{ true: '#4f46e5', false: '#cbd5e1' }} />
          </View>
        </View>
      </View>
      {error ? (
        <View style={styles.error} accessibilityLiveRegion="polite">
          <Text style={styles.errorText}>{error}</Text>
          <Button title="Thử lại" onPress={() => reloadPosts()} />
        </View>
      ) : null}
      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#4f46e5" />
          <Text style={styles.subtitle}>Đang tải bài viết...</Text>
        </View>
      ) : (
        <FlatList
          // Đổi key để FlatList dựng lại bố cục khi đổi số cột.
          key={numColumns}
          data={posts}
          keyExtractor={(item) => String(item.id)}
          numColumns={numColumns}
          columnWrapperStyle={isTile ? styles.columns : undefined}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => <PostCard post={item} layout={isTile ? 'tile' : 'row'} onSelect={handleSelect} />}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => reloadPosts(true)} />}
          ListEmptyComponent={<Text style={styles.empty}>{error ? 'Kéo xuống để tải lại.' : 'Chưa có bài viết.'}</Text>}
          ListFooterComponent={posts.length > 0 ? <Text style={styles.empty}>Kéo xuống để làm mới</Text> : null}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  header: { padding: 20, paddingBottom: 8 },
  heading: { fontSize: 28, fontWeight: '700', color: '#0f172a' },
  subtitle: { fontSize: 14, color: '#64748b', marginTop: 6 },
  toolbar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 16 },
  toggle: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  count: { fontSize: 14, color: '#475569' },
  list: { paddingHorizontal: 16, paddingBottom: 20, flexGrow: 1 },
  columns: { justifyContent: 'space-between' },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 8 },
  error: { margin: 16, padding: 12, backgroundColor: '#fee2e2', borderRadius: 8 },
  errorText: { color: '#991b1b', marginBottom: 8 },
  empty: { textAlign: 'center', color: '#64748b', padding: 20 },
});
