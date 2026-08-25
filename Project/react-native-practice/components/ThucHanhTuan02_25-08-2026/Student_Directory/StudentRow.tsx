import { Pressable, StyleSheet, Text, View } from "react-native";
import { Student } from '@/scr/data/students';

interface StudentRowProps {
    student: Student;
    onPress: (student: Student) => void;
}

export function StudentRow({ student, onPress }: StudentRowProps) {

    function getInitials(fullName: string) {
        const words = fullName.trim().split(/\s+/);

        if (words.length === 1) {
            return words[0].slice(0, 2).toUpperCase();
        }

        return `${words[0][0]}${words[words.length - 1][0]}`
            .toUpperCase();
    }

    const isActive = student.status === 'Đang học';

    return (
        <Pressable
            onPress={() => onPress(student)}
            style={({ pressed }) => [
                styles.studentCard,
                pressed && styles.studentCardPressed,
            ]}
        >
            <View style={styles.avatar}>
                <Text style={styles.avatarText}>
                    {getInitials(student.fullName)}
                </Text>
            </View>

            <View style={styles.studentContent}>
                <Text style={styles.studentName}>
                    {student.fullName}
                </Text>

                <Text style={styles.studentMeta}>
                    {student.studentId} · {student.className}
                </Text>
            </View>

            <View
                style={[
                    styles.statusBadge,
                    isActive
                        ? styles.activeBadge
                        : styles.pausedBadge,
                ]}
            >
                <Text
                    style={[
                        styles.statusText,
                        isActive
                            ? styles.activeText
                            : styles.pausedText,
                    ]}
                >
                    {student.status}
                </Text>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    studentCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        padding: 14,
        borderWidth: 1,
        borderColor: '#E1E1E1',
    },
    studentCardPressed: {
        opacity: 0.7,
    },
    avatar: {
        width: 42,
        height: 42,
        borderRadius: 21,
        backgroundColor: '#E5E7EB',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    avatarText: {
        color: '#555555',
        fontSize: 14,
        fontWeight: '700',
    },
    studentContent: {
        flex: 1,
    },
    studentName: {
        color: '#222222',
        fontSize: 16,
        fontWeight: '600',
    },
    studentMeta: {
        color: '#777777',
        fontSize: 13,
        marginTop: 4,
    },
    statusBadge: {
        paddingHorizontal: 8,
        paddingVertical: 5,
        borderRadius: 6,
    },
    activeBadge: {
        backgroundColor: '#E8F5E9',
    },
    pausedBadge: {
        backgroundColor: '#F1F1F1',
    },
    statusText: {
        fontSize: 11,
        fontWeight: '600',
    },
    activeText: {
        color: '#4A7C59',
    },
    pausedText: {
        color: '#777777',
    },
    separator: {
        height: 8,
    },
    sectionSeparator: {
        height: 12,
    },
    emptyContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 220,
        paddingHorizontal: 24,
    },
    emptyTitle: {
        color: '#333333',
        fontSize: 18,
        fontWeight: '600',
    },
    emptyText: {
        color: '#777777',
        fontSize: 14,
        textAlign: 'center',
        marginTop: 8,
    },
});