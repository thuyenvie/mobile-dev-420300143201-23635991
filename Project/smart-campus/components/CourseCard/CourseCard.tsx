import {
    StyleSheet,
    Text,
    View,
    Image,
    ImageSourcePropType,
} from 'react-native';

interface CourseCardProps {
    title: string;
    teacher: string;
    description: string;
    imageSource: ImageSourcePropType;
}

export default function CourseCard({
    title,
    teacher,
    description,
    imageSource,
}: CourseCardProps) {
    return (
        <View style={styles.card}>

            <Image
                source={imageSource}
                style={styles.image}
            />

            <View style={styles.content}>
                <Text style={styles.title}>
                    {title}
                </Text>

                <Text style={styles.teacher}>
                    Giảng viên: {teacher}
                </Text>

                <Text style={styles.description}>
                    {description}
                </Text>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        width: '100%',
        borderWidth: 1,
        borderRadius: 12,
        overflow: 'hidden',
        marginBottom: 16,
    },

    image: {
        width: '100%',
        height: 180,
    },

    content: {
        padding: 16,
    },

    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 8,
    },

    teacher: {
        fontSize: 18,
        marginBottom: 8,
    },

    description: {
        fontSize: 18,
    },
});