import axios from "axios";
import { useEffect, useState } from "react";
import {
    Button,
    FlatList,
    Platform,
    StyleSheet,
    Text,
    TouchableHighlight,
    View,
} from "react-native";

type Post = {
    userId: number;
    id: number;
    title: string;
    body: string;
};

export default function AxiosApi() {
    useEffect(() => {
        axios
            .get("https://jsonplaceholder.typicode.com/posts")
            .then((response) => {
                console.log(response.data);
                setDate(response.data);
            })
            .catch((error) => {
                console.error(error);
            })
            .finally(() => {
                console.log("Request completed");
            });
    }, []);
    const handlePress = async (item: Post) => {
        const updatedPost = {
            ...item,
            title: "Updated Title",
        };

        try {
            const response = await axios.patch<Post>(
                `https://jsonplaceholder.typicode.com/posts/${item.id}`,
                updatedPost,
            );

            setDate((currentData) =>
                currentData.map((post) =>
                    post.id === item.id ? response.data : post,
                ),
            );
            console.log("Post updated:", response.data);
        } catch (error) {
            console.error("Could not update post:", error);
        }
    };

    const [data, setDate] = useState<Post[]>([]);
    return (
        <View style={styles.container}>
            <FlatList
                ItemSeparatorComponent={
                    Platform.OS !== "android"
                        ? ({ highlighted }) => (
                            <View
                                style={[
                                    styles.separator,
                                    highlighted && {
                                        marginLeft: 0,
                                        backgroundColor: "#007AFF",
                                    },
                                ]}
                            />
                        )
                        : undefined
                }
                data={data}
                keyExtractor={(item) => String(item.id)}
                renderItem={({ item, index, separators }) => (
                    <TouchableHighlight
                        onPress={() => handlePress(item)}
                        onShowUnderlay={separators.highlight}
                        onHideUnderlay={separators.unhighlight}
                    >
                        <View style={styles.itemContainer}>
                            <Text style={styles.text}>
                                {item.title} (Index: {index})
                            </Text>
                            <Button
                                title="Update"
                                onPress={() => handlePress(item)}
                            />
                        </View>
                    </TouchableHighlight>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 50,
    },
    itemContainer: {
        backgroundColor: "white",
        padding: 16,
    },
    text: {
        fontSize: 16,
        color: "#333",
    },
    separator: {
        height: 1,
        backgroundColor: "#e0e0e0",
        marginLeft: 16,
    },
});