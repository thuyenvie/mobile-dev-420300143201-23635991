import React, { createContext, useContext, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

type ThemeContextType = {
    isDarkMode: boolean;
    toggleTheme: () => void;
};
const ThemeContext = createContext<ThemeContextType | null>(null);

function HomeScreen() {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('HomeScreen must be used inside ThemeContext.Provider');
    }
    const { isDarkMode, toggleTheme } = context;

    return (
        <View
            style={[
                styles.container,
                { backgroundColor: isDarkMode ? '#222222' : '#ffffff' },
            ]}
        >
            <Text style={{ color: isDarkMode ? '#ffffff' : '#222222' }}>
                {isDarkMode ? 'Chế độ tối' : 'Chế độ sáng'}
            </Text>

            <Button title="Đổi giao diện" onPress={toggleTheme} />
        </View>
    );
}

export default function CheDoSangToi() {
    const [isDarkMode, setIsDarkMode] = useState(false);

    const toggleTheme = () => {
        setIsDarkMode(previousMode => !previousMode);
    };

    return (
        <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
            <HomeScreen />
        </ThemeContext.Provider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 16,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 500,
    },
});
