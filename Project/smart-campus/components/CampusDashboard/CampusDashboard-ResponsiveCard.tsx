import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    useWindowDimensions,
} from 'react-native';

import CourseCard from '../CourseCard/CourseCard';

interface Course {
    id: string;
    title: string;
    teacher: string;
    description: string;
}

const courses: Course[] = [
    {
        id: '1',
        title: 'Lập trình ứng dụng di động',
        teacher: 'Nguyễn Văn A',
        description:
            'Môn học cung cấp kiến thức về phát triển ứng dụng di động bằng React Native và Expo.',
    },
    {
        id: '2',
        title: 'Hệ quản trị cơ sở dữ liệu',
        teacher: 'Trần Văn B',
        description:
            'Môn học cung cấp kiến thức về quản lý, thiết kế và khai thác cơ sở dữ liệu.',
    },
    {
        id: '3',
        title: 'Phát triển giao diện ứng dụng',
        teacher: 'Lê Văn C',
        description:
            'Môn học tập trung vào thiết kế và phát triển giao diện ứng dụng hiện đại.',
    },
    {
        id: '4',
        title: 'Công nghệ phần mềm',
        teacher: 'Phạm Văn D',
        description:
            'Môn học cung cấp kiến thức về quy trình phát triển và quản lý dự án phần mềm.',
    },
];

export default function CampusDashboardResponsiveCard() {

    const { width: screenWidth } = useWindowDimensions();

    // Chiều rộng dùng cho phương pháp manual width arithmetic
    const horizontalPadding = 40;
    const gap = 12;

    const manualCardWidth =
        (screenWidth - horizontalPadding - gap) / 2;

    return (
        <ScrollView
            contentContainerStyle={styles.container}
        >

            <Text style={styles.title}>
                RESPONSIVE CARD LABORATORY
            </Text>

            <Text style={styles.description}>
                So sánh responsive Flexbox layout với cách tính
                chiều rộng card thủ công.
            </Text>

            {/* A. RESPONSIVE FLEXBOX */}

            <Text style={styles.sectionTitle}>
                A. RESPONSIVE FLEXBOX
            </Text>

            <Text style={styles.explanation}>
                Sử dụng flexBasis, minWidth, maxWidth,
                flexGrow và flexWrap.
            </Text>

            <View style={styles.flexGrid}>
                {courses.map((course) => (
                    <View
                        key={course.id}
                        style={styles.flexCard}
                    >
                        <CourseCard
                            title={course.title}
                            teacher={course.teacher}
                            description={course.description}
                            imageSource={{
                                uri: `https://picsum.photos/600/300?random=${course.id}`,
                            }}
                            imageDescription={`Hình ảnh minh họa cho ${course.title}`}
                            decorative={false}
                        />
                    </View>
                ))}
            </View>

            {/* B. MANUAL WIDTH ARITHMETIC */}

            <Text style={styles.sectionTitle}>
                B. MANUAL WIDTH ARITHMETIC
            </Text>

            <Text style={styles.explanation}>
                Chiều rộng card được tính trực tiếp dựa trên
                chiều rộng màn hình.
            </Text>

            <View style={styles.manualGrid}>
                {courses.map((course) => (
                    <View
                        key={course.id}
                        style={[
                            styles.manualCard,
                            {
                                width: manualCardWidth,
                            },
                        ]}
                    >
                        <CourseCard
                            title={course.title}
                            teacher={course.teacher}
                            description={course.description}
                            imageSource={{
                                uri: `https://picsum.photos/600/300?random=${course.id + 10}`,
                            }}
                            imageDescription={`Hình ảnh minh họa cho ${course.title}`}
                            decorative={false}
                        />
                    </View>
                ))}
            </View>

        </ScrollView>
    );
}

const styles = StyleSheet.create({

    container: {
        padding: 20,
        paddingTop: 50,
        paddingBottom: 120,
    },

    title: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 12,
    },

    description: {
        fontSize: 18,
        lineHeight: 26,
        textAlign: 'center',
        marginBottom: 24,
    },

    sectionTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 8,
    },

    explanation: {
        fontSize: 17,
        lineHeight: 24,
        marginBottom: 16,
    },

    flexGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
    },

    flexCard: {
        flexBasis: '48%',
        minWidth: 160,
        maxWidth: 420,
        flexGrow: 1,
    },


    manualGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
    },

    manualCard: {
        maxWidth: 420,
    },
});