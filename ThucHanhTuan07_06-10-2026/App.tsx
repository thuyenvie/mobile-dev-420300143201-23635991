import { useCallback, useEffect, useRef, useState } from "react";
import {ActivityIndicator, Alert, FlatList, RefreshControl, StyleSheet, Switch, Text, View} from "react-native";
import {SafeAreaProvider, SafeAreaView} from "react-native-safe-area-context";

import MovieCard from "./compoents/MovieCard";

type Movie = {
  id: string;
  title: string;
  genre: string;
  year: number;
  rating: number;
  poster: string;
  isWatched: boolean;
};

const LIMIT = 10;

export default function App() {
  return (
    <SafeAreaProvider>
      <MainScreen />
    </SafeAreaProvider>
  );
}

function MainScreen() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [isTile, setIsTile] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [failedPage, setFailedPage] = useState<number | null>(null);
  const currentPageRef = useRef(1);
  const loadingRef = useRef(false);

  const removeDuplicateMovies = (
    oldMovies: Movie[],
    newMovies: Movie[]
  ): Movie[] => {
    const map = new Map<string, Movie>();

    [...oldMovies, ...newMovies].forEach((movie) => {
      map.set(movie.id, movie);
    });

    return Array.from(map.values());
  };

  const fetchMovies = useCallback(
    async (pageNumber: number, replace: boolean = false) => {
      if (loadingRef.current) {
        return;
      }
      loadingRef.current = true;
      try {
        const res = await fetch(`https://6ac4b46254a61668c5f60dbc.mockapi.io/movies?page=${pageNumber}&limit=${LIMIT}`);
        if (!res.ok) {
          throw new Error("Failed to fetch movies");
        }
        const data: Movie[] = await res.json();
        setMovies((prevMovies) => {
          if (replace) {
            return removeDuplicateMovies([], data);
          }
          return removeDuplicateMovies(prevMovies, data);
        });
        currentPageRef.current = pageNumber;
        setHasMore(data.length === LIMIT);
        setFailedPage(null);
      } catch (error) {
        console.error(error);
        setFailedPage(pageNumber);
      } finally {
        loadingRef.current = false;
        setLoading(false);
        setRefreshing(false);
        setLoadingMore(false);
      }
    }, []);

  useEffect(() => {
    fetchMovies(1, true);
  }, [fetchMovies]);
  
  const handleRefresh = useCallback(() => {
    if (loadingRef.current) {
      return;
    }
    setRefreshing(true);
    setHasMore(true);
    setFailedPage(null);

    fetchMovies(1, true);
  }, [fetchMovies]);

  const handleLoadMore = useCallback(() => {
    if (loadingRef.current || !hasMore || loading || refreshing) {
      return;
    }

    const nextPage = currentPageRef.current + 1;
    setLoadingMore(true);
    fetchMovies(nextPage, false);
  }, [fetchMovies, hasMore, loading, refreshing]);

  const handleSelect = useCallback(
    (id: string) => {
      const movie = movies.find((item) => item.id === id);
      if (movie) {
        Alert.alert(
          `${movie.title} (${movie.year})`
        );
      }
    },
    [movies]
  );
  const numColumns = isTile ? 2 : 1;

  const renderFooter = () => {
    if (loadingMore) {
      return (
        <View style={styles.footer}>
          <ActivityIndicator size="small" />
          <Text style={styles.footerText}>Đang tải thêm...</Text>
        </View>
      );
    }

    if (!hasMore && movies.length > 0) {
      return (
        <View style={styles.footer}>
          <Text style={styles.footerText}>Đã hết danh sách</Text>
        </View>
      );
    }

    return null;
  };

  if (loading && movies.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" />
          <Text style={styles.loadingText}>Đang tải danh sách phim...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        key={String(numColumns)}
        data={movies}
        numColumns={numColumns}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <MovieCard
            movie={item}
            layout={isTile ? "tile" : "row"}
            onSelect={handleSelect}
          />
        )}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.title}>Movie App</Text>

            <View style={styles.switchContainer}>
              <Text>Dạng lưới</Text>
              <Switch
                value={isTile}
                onValueChange={setIsTile}
              />
            </View>
          </View>
        }
        columnWrapperStyle={isTile ? styles.columnWrapper : undefined}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}

        ListFooterComponent={renderFooter}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 15,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
  },
  columnWrapper: {
    justifyContent: "space-between",
    paddingHorizontal: 12,
    gap: 10,
  },
  listContent: {
    paddingBottom: 20,
  },
  footer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
  },
  footerText: {
    marginTop: 5,
    fontSize: 14,
    color: "#666",
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginBottom: 8,
  },
  retryButton: {
    color: "blue",
    fontSize: 15,
    fontWeight: "bold",
    padding: 8,
  },
});