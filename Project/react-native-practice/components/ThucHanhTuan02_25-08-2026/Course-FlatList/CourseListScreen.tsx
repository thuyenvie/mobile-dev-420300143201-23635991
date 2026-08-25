import { Course, courses } from "@/scr/data/courses";
import { useState } from "react";
import {
    ActivityIndicator,
    Alert,
    FlatList,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";
import CourseRow from "./CourseRow";

const PAGE_SIZE = 4;

// Câu 7: Tạo danh sách khóa học dạng lưới bằng numColumns={2}.
function CourseListScreen() {
    const [query, setQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("Tất cả");
    const [sortAscending, setSortAscending] = useState(false);
    const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
    const [refreshing, setRefreshing] = useState(false);
    const [loadingMore, setLoadingMore] = useState(false);

    const openCourse = (course: Course) => {
        console.log(course);
        Alert.alert(
            course.title,
            `Giảng viên: ${course.instructor}`
        );
    };

    // Câu 1: Xóa toàn bộ nội dung tìm kiếm.
    const clearSearch = () => setQuery("");

    // Câu 2: Chọn danh mục để lọc danh sách khóa học.
    const selectCategory = (category: string) => {
        setSelectedCategory(category);
        setVisibleCount(PAGE_SIZE);
    };

    // Câu 3: Sắp xếp khóa học theo số sinh viên tăng hoặc giảm dần.
    const toggleSort = () => {
        setSortAscending((currentValue) => !currentValue);
        setVisibleCount(PAGE_SIZE);
    };

    // Câu 4: Kéo xuống để làm mới dữ liệu bằng refreshing và onRefresh.
    const onRefresh = () => {
        setRefreshing(true);
        setTimeout(() => {
            setVisibleCount(PAGE_SIZE);
            setRefreshing(false);
        }, 700);
    };

    // Câu 5: Tải thêm một trang dữ liệu khi kéo đến cuối danh sách.
    const onEndReached = () => {
        if (loadingMore || visibleCount >= filteredCourses.length) {
            return;
        }

        setLoadingMore(true);
        setTimeout(() => {
            setVisibleCount((currentCount) => currentCount + PAGE_SIZE);
            setLoadingMore(false);
        }, 700);
    };

    const normalizedQuery = query.trim().toLocaleLowerCase("vi");
    const categories = ["Tất cả", ...new Set(courses.map((course) => course.category))];

    const filteredCourses = courses
        .filter((course) => {
            const matchesQuery = `${course.title} ${course.instructor} ${course.category}`
                .toLocaleLowerCase("vi")
                .includes(normalizedQuery);
            const matchesCategory = selectedCategory === "Tất cả" || course.category === selectedCategory;

            return matchesQuery && matchesCategory;
        })
        .sort((firstCourse, secondCourse) =>
            sortAscending
                ? firstCourse.students - secondCourse.students
                : secondCourse.students - firstCourse.students
        );

    const visibleCourses = filteredCourses.slice(0, visibleCount);

    // Câu 6: Hiển thị trạng thái tải ở cuối danh sách bằng ListFooterComponent.
    const renderFooter = () => (
        <View style={styles.footer}>
            {loadingMore ? (
                <>
                    <ActivityIndicator color="#3157A4" />
                    <Text style={styles.footerText}>Đang tải thêm khóa học...</Text>
                </>
            ) : visibleCount < filteredCourses.length ? (
                <Text style={styles.footerText}>Kéo tiếp để tải thêm</Text>
            ) : (
                <Text style={styles.footerText}>Đã hiển thị hết khóa học</Text>
            )}
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={visibleCourses}
                keyExtractor={(item) => item.id}
                numColumns={2}
                columnWrapperStyle={styles.columnWrapper}
                renderItem={({ item }) => (
                    <CourseRow
                        course={item}
                        onPress={openCourse}
                    />
                )}
                ListHeaderComponent={
                    <View style={styles.header}>
                        <Text style={styles.screenTitle}>
                            Course Catalog
                        </Text>

                        <Text style={styles.subtitle}>
                            Khám phá các khóa học đang mở
                        </Text>

                        <TextInput
                            value={query}
                            onChangeText={setQuery}
                            placeholder="Tìm theo tên, giảng viên hoặc danh mục"
                            placeholderTextColor="#8A8F98"
                            returnKeyType="search"
                            style={styles.searchInput}
                        />
                        {query.length > 0 && (
                            <Pressable
                                onPress={clearSearch}
                                style={styles.clearButton}
                                hitSlop={10}
                            >
                                <Text style={styles.clearButtonText}>
                                    ×
                                </Text>
                            </Pressable>
                        )}

                        <View style={styles.filterRow}>
                            {categories.map((category) => (
                                <Pressable
                                    key={category}
                                    onPress={() => selectCategory(category)}
                                    style={[
                                        styles.filterButton,
                                        selectedCategory === category && styles.filterButtonActive,
                                    ]}
                                >
                                    <Text
                                        style={[
                                            styles.filterButtonText,
                                            selectedCategory === category && styles.filterButtonTextActive,
                                        ]}
                                    >
                                        {category}
                                    </Text>
                                </Pressable>
                            ))}
                        </View>

                        <Pressable onPress={toggleSort} style={styles.sortButton}>
                            <Text style={styles.sortButtonText}>
                                Số sinh viên: {sortAscending ? "tăng dần" : "giảm dần"}
                            </Text>
                        </Pressable>

                        <Text style={styles.resultText}>
                            Tìm thấy {visibleCourses.length}/{filteredCourses.length} khóa học
                        </Text>
                    </View>
                }
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyTitle}>
                            Không tìm thấy khóa học
                        </Text>

                        <Text style={styles.emptyText}>
                            Hãy thử tìm kiếm bằng một từ khóa khác.
                        </Text>
                    </View>
                }
                ItemSeparatorComponent={() => (
                    <View style={styles.separator} />
                )}
                refreshing={refreshing}
                onRefresh={onRefresh}
                onEndReached={onEndReached}
                onEndReachedThreshold={0.4}
                ListFooterComponent={renderFooter}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "#F7F8FA",
    },

    searchInput: {
        minHeight: 52,
        color: "#182035",
        fontSize: 16,
        backgroundColor: "#FFFFFF",
        borderWidth: 1,
        borderColor: "#DDE1E8",
        borderRadius: 14,
        paddingHorizontal: 16,
    },

    header: {
        marginBottom: 20,
    },

    screenTitle: {
        color: "#182035",
        fontSize: 32,
        fontWeight: "800",
    },

    subtitle: {
        color: "#697080",
        fontSize: 15,
        marginTop: 6,
        marginBottom: 20,
    },

    resultText: {
        color: "#4E5665",
        fontSize: 14,
        fontWeight: "600",
        marginTop: 16,
    },

    emptyContainer: {
        alignItems: "center",
        justifyContent: "center",
        minHeight: 250,
        paddingHorizontal: 24,
    },

    emptyTitle: {
        color: "#182035",
        fontSize: 19,
        fontWeight: "700",
    },

    emptyText: {
        color: "#747B88",
        fontSize: 14,
        textAlign: "center",
        marginTop: 8,
    },

    separator: {
        height: 12,
    },
    columnWrapper: {
        gap: 12,
    },
    filterRow: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 8,
        marginTop: 14,
    },
    filterButton: {
        borderWidth: 1,
        borderColor: "#DDE1E8",
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 7,
        backgroundColor: "#FFFFFF",
    },
    filterButtonActive: {
        borderColor: "#3157A4",
        backgroundColor: "#E8F0FF",
    },
    filterButtonText: {
        color: "#596171",
        fontSize: 12,
        fontWeight: "600",
    },
    filterButtonTextActive: {
        color: "#3157A4",
    },
    sortButton: {
        alignSelf: "flex-start",
        marginTop: 12,
        borderRadius: 10,
        paddingHorizontal: 12,
        paddingVertical: 8,
        backgroundColor: "#182035",
    },
    sortButtonText: {
        color: "#FFFFFF",
        fontSize: 13,
        fontWeight: "600",
    },
    footer: {
        alignItems: "center",
        minHeight: 52,
        justifyContent: "center",
        paddingVertical: 12,
        gap: 6,
    },
    footerText: {
        color: "#697080",
        fontSize: 13,
    },
    clearButton: {
        position: "absolute",
        right: 12,
        width: 28,
        height: 28,
        borderRadius: 14,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "red",
        top: 101
    },

    clearButtonText: {
        fontSize: 22,
        lineHeight: 24,
        color: "white",
        fontWeight: "500",
        bottom: 2
    },
});

export default CourseListScreen;
