import { useMemo, useState } from 'react';
import {
    Alert,

    SafeAreaView,
    SectionList,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';

import { Student, studentSections } from '@/scr/data/students';
import { StudentRow } from './Student_Directory/StudentRow';

export default function StudentDirectory() {
    return (
        <SafeAreaView style={styles.container}>
            <StudentDirectoryScreen />
        </SafeAreaView>
    );
}

function StudentDirectoryScreen() {
    const [query, setQuery] = useState('');

    const filteredSections = useMemo(() => {
        const normalizedQuery = query
            .trim()
            .toLocaleLowerCase('vi');

        if (!normalizedQuery) {
            return studentSections;
        }

        return studentSections
            .map((section) => ({
                ...section,
                data: section.data.filter((student) =>
                    `${student.fullName} ${student.studentId} ${student.className}`
                        .toLocaleLowerCase('vi')
                        .includes(normalizedQuery),
                ),
            }))
            .filter((section) => section.data.length > 0);
    }, [query]);

    const totalStudents = filteredSections.reduce(
        (total, section) => total + section.data.length,
        0,
    );

    const openStudent = (student: Student) => {
        Alert.alert(
            student.fullName,
            `Mã sinh viên: ${student.studentId}
Lớp: ${student.className}
Trạng thái: ${student.status}`,
        );
    };

    return (
        <SectionList
            sections={filteredSections}
            keyExtractor={(item) => item.id}

            renderItem={({ item }) => (
                <StudentRow
                    student={item}
                    onPress={openStudent}
                />
            )}

            renderSectionHeader={({ section }) => (
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>
                        {section.title}
                    </Text>
                </View>
            )}

            ListHeaderComponent={
                <View style={styles.header}>
                    <Text style={styles.screenTitle}>
                        Student Directory
                    </Text>

                    <Text style={styles.subtitle}>
                        Danh bạ sinh viên theo khoa
                    </Text>

                    <TextInput
                        value={query}
                        onChangeText={setQuery}
                        placeholder="Tìm tên, mã sinh viên hoặc lớp"
                        placeholderTextColor="#8A8F98"
                        returnKeyType="search"
                        autoCorrect={false}
                        style={styles.searchInput}
                    />

                    <Text style={styles.resultText}>
                        Tìm thấy {totalStudents} sinh viên
                    </Text>
                </View>
            }

            ListEmptyComponent={
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyTitle}>
                        Không tìm thấy sinh viên
                    </Text>

                    <Text style={styles.emptyText}>
                        Không có sinh viên phù hợp với “{query.trim()}”.
                    </Text>
                </View>
            }

            ItemSeparatorComponent={() => (
                <View style={styles.separator} />
            )}

            SectionSeparatorComponent={() => (
                <View style={styles.sectionSeparator} />
            )}
        />
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F6F8',
        paddingTop: 30
    },
    header: {
        marginBottom: 16,
    },
    screenTitle: {
        color: '#222222',
        fontSize: 28,
        fontWeight: '700',
    },
    subtitle: {
        color: '#777777',
        fontSize: 14,
        marginTop: 4,
        marginBottom: 16,
    },
    searchInput: {
        minHeight: 48,
        color: '#222222',
        fontSize: 15,
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#DDDDDD',
        borderRadius: 10,
        paddingHorizontal: 14,
    },
    resultText: {
        color: '#666666',
        fontSize: 13,
        fontWeight: '600',
        marginTop: 12,
    },
    sectionHeader: {
        backgroundColor: '#EDEFF2',
        paddingVertical: 9,
        paddingHorizontal: 12,
        borderRadius: 8,
        marginBottom: 8,
    },
    sectionTitle: {
        color: '#333333',
        fontSize: 16,
        fontWeight: '600',
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
