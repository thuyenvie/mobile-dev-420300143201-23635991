import {
    StyleSheet,
    Text,
    View,
    Image,
    ImageSourcePropType,
    ActivityIndicator,
} from 'react-native';

import { useState } from 'react';

interface CourseCardProps {
    title: string;
    teacher: string;
    description: string;
    imageSource: ImageSourcePropType;
    imageDescription?: string;
    decorative?: boolean;
}

export default function CourseCard({
    title,
    teacher,
    description,
    imageSource,
    imageDescription,
    decorative = false,
}: CourseCardProps) {

    const [loading, setLoading] = useState(true);
    const [imageError, setImageError] = useState(false);

    return (
        <View style={styles.card}>
            <View style={styles.imageContainer}>

                {loading && (
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size="large" />

                        <Text style={styles.loadingText}>
                            Đang tải hình ảnh...
                        </Text>
                    </View>
                )}

                {imageError ? (
                    <View style={styles.errorContainer}>
                        <Text style={styles.errorText}>
                            Không thể tải hình ảnh
                        </Text>
                    </View>
                ) : (
                    <Image
                        source={imageSource}
                        style={styles.image}
                        accessible={!decorative}
                        accessibilityLabel={
                            decorative ? undefined : imageDescription
                        }
                        onLoadStart={() => {
                            setLoading(true);
                            setImageError(false);
                        }}
                        onLoad={() => {
                            setLoading(false);
                        }}
                        onError={() => {
                            setLoading(false);
                            setImageError(true);
                        }}
                    />
                )}

            </View>

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
        height: '100%',
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

    imageContainer: {
        width: '100%',
        height: 180,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },

    loadingContainer: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
    },

    loadingText: {
        marginTop: 8,
        fontSize: 16,
    },

    errorContainer: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },

    errorText: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'red',
    },
});