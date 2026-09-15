import React, {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useReducer,
    useState,
} from 'react';

import {
    FlatList,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

type ThemeContextType = { isDark: boolean; theme: typeof lightTheme };
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const lightTheme = {
    background: '#f5f5f5',
    card: '#ffffff',
    text: '#222222',
    input: '#ffffff',
    border: '#dddddd',
    primary: '#007bff',
    danger: '#dc3545',
    completed: '#28a745',
};

const darkTheme = {
    background: '#121212',
    card: '#1e1e1e',
    text: '#ffffff',
    input: '#2c2c2c',
    border: '#444444',
    primary: '#4dabf7',
    danger: '#ff6b6b',
    completed: '#51cf66',
};

type Todo = { id: string; title: string; completed: boolean };
type TodoAction = {
    type: 'ADD_TODO' | 'TOGGLE_TODO' | 'DELETE_TODO';
    payload: string;
};
type TodoItemProps = {
    todo: Todo;
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
};

const initialTodos: Todo[] = [];

function todoReducer(state: Todo[], action: TodoAction): Todo[] {
    switch (action.type) {
        case 'ADD_TODO':
            return [
                ...state,
                {
                    id: Date.now().toString(),
                    title: action.payload,
                    completed: false,
                },
            ];

        case 'TOGGLE_TODO':
            return state.map((todo) =>
                todo.id === action.payload
                    ? {
                        ...todo,
                        completed: !todo.completed,
                    }
                    : todo
            );

        case 'DELETE_TODO':
            return state.filter((todo) => todo.id !== action.payload);

        default:
            return state;
    }
}

function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('TodoItem must be used inside ThemeContext.Provider');
    }
    const { theme } = context;

    return (
        <View
            style={[
                styles.todoItem,
                {
                    backgroundColor: theme.card,
                    borderColor: theme.border,
                },
            ]}
        >
            <TouchableOpacity
                style={styles.todoContent}
                onPress={() => onToggle(todo.id)}
            >
                <View
                    style={[
                        styles.checkbox,
                        {
                            borderColor: todo.completed
                                ? theme.completed
                                : theme.border,
                            backgroundColor: todo.completed
                                ? theme.completed
                                : 'transparent',
                        },
                    ]}
                >
                    {todo.completed && <Text style={styles.checkMark}>✓</Text>}
                </View>

                <Text
                    style={[
                        styles.todoTitle,
                        {
                            color: theme.text,
                            textDecorationLine: todo.completed
                                ? 'line-through'
                                : 'none',
                            opacity: todo.completed ? 0.5 : 1,
                        },
                    ]}
                >
                    {todo.title}
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[
                    styles.deleteButton,
                    { backgroundColor: theme.danger },
                ]}
                onPress={() => onDelete(todo.id)}
            >
                <Text style={styles.deleteText}>Xóa</Text>
            </TouchableOpacity>
        </View>
    );
}


export default function BaiTongHop() {

    const [todoInput, setTodoInput] = useState('');
    const [searchKeyword, setSearchKeyword] = useState('');
    const [isDark, setIsDark] = useState(false);

    const [todos, dispatch] = useReducer(
        todoReducer,
        initialTodos
    );

    const theme = isDark ? darkTheme : lightTheme;

    const themeContextValue = {
        isDark,
        theme,
    };

    useEffect(() => {
        console.log(
            `Danh sách hiện có ${todos.length} công việc`
        );
    }, [todos.length]);

    const filteredTodos = useMemo(() => {
        return todos.filter((todo) =>
            todo.title
                .toLowerCase()
                .includes(searchKeyword.toLowerCase())
        );
    }, [todos, searchKeyword]);

    const remainingTodos = useMemo(() => {
        return todos.filter((todo) => !todo.completed).length;
    }, [todos]);

    const handleAddTodo = useCallback(() => {
        const title = todoInput.trim();

        if (title === '') {
            return;
        }

        dispatch({
            type: 'ADD_TODO',
            payload: title,
        });

        setTodoInput('');
    }, [todoInput]);

    const handleToggleTodo = useCallback((id: string) => {
        dispatch({
            type: 'TOGGLE_TODO',
            payload: id,
        });
    }, []);

    const handleDeleteTodo = useCallback((id: string) => {
        dispatch({
            type: 'DELETE_TODO',
            payload: id,
        });
    }, []);

    return (
        <ThemeContext.Provider value={themeContextValue}>
            <SafeAreaView
                style={[
                    styles.container,
                    { backgroundColor: theme.background },
                ]}
            >

                <View style={styles.header}>
                    <Text style={[styles.title, { color: theme.text }]}>
                        Quản lý công việc
                    </Text>

                    <TouchableOpacity
                        style={[
                            styles.themeButton,
                            { backgroundColor: theme.primary },
                        ]}
                        onPress={() => setIsDark((prev) => !prev)}
                    >
                        <Text style={styles.themeButtonText}>
                            {isDark ? 'Sáng' : 'Tối'}
                        </Text>
                    </TouchableOpacity>
                </View>

                <View
                    style={[
                        styles.statBox,
                        {
                            backgroundColor: theme.card,
                            borderColor: theme.border,
                        },
                    ]}
                >
                    <Text style={[styles.statText, { color: theme.text }]}>
                        Còn lại: {remainingTodos} công việc chưa hoàn thành
                    </Text>
                </View>

                <View style={styles.inputRow}>
                    <TextInput
                        style={[
                            styles.input,
                            {
                                backgroundColor: theme.input,
                                color: theme.text,
                                borderColor: theme.border,
                            },
                        ]}
                        placeholder="Nhập công việc..."
                        placeholderTextColor={isDark ? '#999' : '#888'}
                        value={todoInput}
                        onChangeText={setTodoInput}
                        onSubmitEditing={handleAddTodo}
                    />

                    <TouchableOpacity
                        style={[
                            styles.addButton,
                            { backgroundColor: theme.primary },
                        ]}
                        onPress={handleAddTodo}
                    >
                        <Text style={styles.addButtonText}>Thêm</Text>
                    </TouchableOpacity>
                </View>

                <TextInput
                    style={[
                        styles.searchInput,
                        {
                            backgroundColor: theme.input,
                            color: theme.text,
                            borderColor: theme.border,
                        },
                    ]}
                    placeholder="Tìm kiếm công việc..."
                    placeholderTextColor={isDark ? '#999' : '#888'}
                    value={searchKeyword}
                    onChangeText={setSearchKeyword}
                />

                <FlatList
                    data={filteredTodos}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <TodoItem
                            todo={item}
                            onToggle={handleToggleTodo}
                            onDelete={handleDeleteTodo}
                        />
                    )}
                    ListEmptyComponent={
                        <View style={styles.emptyContainer}>
                            <Text
                                style={[
                                    styles.emptyText,
                                    { color: theme.text },
                                ]}
                            >
                                {searchKeyword
                                    ? 'Không tìm thấy công việc phù hợp.'
                                    : 'Chưa có công việc nào.'}
                            </Text>
                        </View>
                    }
                    contentContainerStyle={
                        filteredTodos.length === 0
                            ? styles.emptyList
                            : styles.list
                    }
                />
            </SafeAreaView>
        </ThemeContext.Provider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        paddingTop: 40,
    },

    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },

    title: {
        fontSize: 25,
        fontWeight: 'bold',
    },

    themeButton: {
        paddingVertical: 9,
        paddingHorizontal: 12,
        borderRadius: 8,
    },

    themeButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },

    statBox: {
        padding: 15,
        borderRadius: 10,
        borderWidth: 1,
        marginBottom: 15,
    },

    statText: {
        fontSize: 16,
        fontWeight: '600',
    },

    inputRow: {
        flexDirection: 'row',
        marginBottom: 12,
    },

    input: {
        flex: 1,
        height: 50,
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 12,
        fontSize: 16,
        marginRight: 8,
    },

    addButton: {
        height: 50,
        paddingHorizontal: 18,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
    },

    addButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },

    searchInput: {
        height: 50,
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 12,
        fontSize: 16,
        marginBottom: 15,
    },

    list: {
        paddingBottom: 20,
    },

    emptyList: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    emptyContainer: {
        alignItems: 'center',
        padding: 30,
    },

    emptyText: {
        fontSize: 16,
        textAlign: 'center',
    },

    todoItem: {
        minHeight: 65,
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 10,
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },

    todoContent: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },

    checkbox: {
        width: 25,
        height: 25,
        borderWidth: 2,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },

    checkMark: {
        color: '#fff',
        fontSize: 17,
        fontWeight: 'bold',
    },

    todoTitle: {
        flex: 1,
        fontSize: 16,
    },

    deleteButton: {
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 6,
        marginLeft: 10,
    },

    deleteText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});