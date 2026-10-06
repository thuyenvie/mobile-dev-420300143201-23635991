import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export type Movie = {
  id: string;
  title: string;
  genre: string;
  year: number;
  rating: number;
  poster: string;
  isWatched: boolean;
};

export type MovieCardProps = {
  movie: Movie;
  layout?: "row" | "tile";
  onSelect: (id: string) => void;
};

function MovieCard({
  movie,
  layout = "row",
  onSelect,
}: MovieCardProps) {
  const isTile = layout === "tile";

  return (
    <TouchableOpacity
      style={[
        styles.card,
        isTile && styles.cardTile,
      ]}
      onPress={() => onSelect(movie.id)}
    >
      <View
        style={
          isTile
            ? styles.posterContainer
            : undefined
        }
      >
        <Image
          source={{ uri: movie.poster }}
          style={[
            styles.poster,
            isTile && styles.posterTile,
          ]}
        />

        {isTile && (
          <View style={styles.rating}>
            <Text style={styles.ratingText}> ⭐ {movie.rating.toFixed(1)}</Text>
          </View>
        )}
      </View>

      <View
        style={[
          styles.info,
          isTile && styles.infoTile,
        ]}
      >
        <Text
          style={[
            styles.title,
            isTile && styles.titleTile]}
          numberOfLines={isTile ? 1 : undefined}>
          {movie.title}
        </Text>
        {!isTile && (
          <>
            <Text>{movie.genre}</Text>
            <Text>{movie.year}</Text>
            <Text>⭐ {movie.rating.toFixed(1)}
            </Text>
            <Text>{movie.isWatched ? "✅ Đã xem" : "⏳ Chưa xem"}</Text>
          </>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    padding: 10,
    marginHorizontal: 12,
    marginTop: 8,
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  cardTile: {
    flexDirection: "column",
    width: "48%",
    marginHorizontal: 0,
    padding: 0,
    overflow: "hidden",
  },
  posterContainer: {
    width: "100%",
    position: "relative",
  },
  poster: {
    width: 70,
    height: 100,
    borderRadius: 6,
    marginRight: 12,
  },
  posterTile: {
    width: "100%",
    height: undefined,
    aspectRatio: 2 / 3,
    marginRight: 0,
    borderRadius: 0,
  },
  info: {
    flex: 1,
    justifyContent: "center",
  },
  infoTile: {
    padding: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  titleTile: {
    fontSize: 15,
  },
  rating: {
    position: "absolute",
    top: 6,
    right: 6,
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 6,
  },
  ratingText: {
    color: "black",
    fontSize: 12,
    fontWeight: "bold",
  },
  
});

export default React.memo(MovieCard);