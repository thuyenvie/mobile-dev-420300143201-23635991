import { Course } from "@/scr/data/courses";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface CourseRowProps {
    course: Course;
    onPress: (course: Course) => void;
}

function CourseRow({ course, onPress }: CourseRowProps) {
    return (
        <Pressable
            onPress={() => onPress(course)}
            style={({ pressed }) => [
                styles.courseCard,
                pressed && styles.courseCardPressed,
            ]}
        >
            <Text style={styles.courseTitle}>{course.title}</Text>
            <Text style={styles.instructor}>
                Giảng viên: {course.instructor}
            </Text>

            <View style={styles.courseFooter}>
                <Text style={styles.category}>{course.category}</Text>
                <Text style={styles.studentCount}>
                    {course.students} sinh viên
                </Text>
            </View>

        </Pressable>
    )
}

const styles = StyleSheet.create({
    courseCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 18,
        borderWidth: 1,
        borderColor: '#E1E5EC',
    },
    courseCardPressed: {
        opacity: 0.7,
        transform: [{ scale: 0.99 }],
    },
    courseTitle: {
        color: '#182035',
        fontSize: 18,
        fontWeight: '700',
    },
    instructor: {
        color: '#686F7D',
        fontSize: 14,
        marginTop: 7,
    },
    courseFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 16,
    },
    category: {
        overflow: 'hidden',
        color: '#3157A4',
        fontSize: 12,
        fontWeight: '700',
        backgroundColor: '#E8F0FF',
        borderRadius: 8,
        paddingHorizontal: 9,
        paddingVertical: 5,
    },
    studentCount: {
        color: '#596171',
        fontSize: 13,
    },
})

export default CourseRow;