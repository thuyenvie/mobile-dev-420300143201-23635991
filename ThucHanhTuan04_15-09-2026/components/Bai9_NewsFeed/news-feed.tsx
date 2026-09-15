import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

type Post = {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
}

export default function NewsFeed() {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState<Post[]>([]);

    const getPost = async () => {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/todos');
            const json = (await response.json()) as Post[];
            setData(json);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getPost();
    }, [])

    return(
        <View style = {styles.container}>
            {isLoading ?(
                <Text>Loading....</Text>
            ) : (
                <FlatList
                    data={data}
                    keyExtractor={({id}) => id.toString()}
                    renderItem={({item}) =>(
                        <Text>
                            {item.userId} {item.id} {item.title} {item.completed}
                        </Text>
                    )}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 24,
    flex: 1
  }
});