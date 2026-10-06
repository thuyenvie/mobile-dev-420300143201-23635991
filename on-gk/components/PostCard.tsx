import { memo } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export type Post = { userId: number; id: number; title: string; body: string };
type PostCardProps = {
  post: Post;
  layout?: 'row' | 'tile';
  onSelect: (id: number) => void;
};

function PostCard({ post, layout = 'row', onSelect }: PostCardProps) {
  const isTile = layout === 'tile';
  return (
    <TouchableOpacity
      style={[styles.card, isTile && styles.tile]}
      onPress={() => onSelect(post.id)}
      accessibilityRole="button"
      accessibilityLabel={`Bài viết ${post.id}: ${post.title}`}
      accessibilityHint="Xem toàn bộ nội dung bài viết"
    >
      <View style={styles.badge}><Text style={styles.id}>#{post.id}</Text></View>
      <View style={styles.info}>
        <Text style={styles.author}>Tác giả {post.userId}</Text>
        <Text style={styles.title} numberOfLines={isTile ? 2 : 3}>{post.title}</Text>
        <Text style={styles.body} numberOfLines={isTile ? 3 : 2}>{post.body}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default memo(PostCard);

const styles = StyleSheet.create({
  card: { flexDirection: 'row', gap: 12, padding: 14, marginBottom: 12, backgroundColor: '#fff', borderWidth: 1, borderColor: '#e2e8f0', borderRadius: 12 },
  tile: { flexDirection: 'column', width: '48%' },
  badge: { alignSelf: 'flex-start', minWidth: 44, padding: 8, borderRadius: 8, backgroundColor: '#e0e7ff' },
  id: { color: '#4338ca', fontWeight: '700', textAlign: 'center' },
  info: { flex: 1, gap: 6 },
  author: { color: '#64748b', fontSize: 12 },
  title: { color: '#0f172a', fontSize: 16, fontWeight: '600', lineHeight: 22 },
  body: { color: '#475569', fontSize: 14, lineHeight: 20 },
});
