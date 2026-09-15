import React, { useReducer } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

const initialState = {
    email: '',
    password: '',
    error: '',
};

type FormAction =
    | { type: 'SET_EMAIL' | 'SET_PASSWORD' | 'SET_ERROR'; payload: string }
    | { type: 'RESET' };

function formReducer(state: typeof initialState, action: FormAction) {
    switch (action.type) {
        case 'SET_EMAIL':
            return {
                ...state,
                email: action.payload,
                error: '',
            };

        case 'SET_PASSWORD':
            return {
                ...state,
                password: action.payload,
                error: '',
            };

        case 'SET_ERROR':
            return {
                ...state,
                error: action.payload,
            };

        case 'RESET':
            return initialState;

        default:
            return state;
    }
}

export default function LoginForm() {
    const [state, dispatch] = useReducer(formReducer, initialState);

    const handleLogin = () => {
        if (!state.email || !state.password) {
            dispatch({
                type: 'SET_ERROR',
                payload: 'Vui lòng nhập đầy đủ thông tin',
            });
            return;
        }

        dispatch({
            type: 'SET_ERROR',
            payload: '',
        });

        console.log('Email:', state.email);

    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Đăng nhập</Text>

            <TextInput
                style={styles.input}
                value={state.email}
                onChangeText={(text) =>
                    dispatch({
                        type: 'SET_EMAIL',
                        payload: text,
                    })
                }
                placeholder="Email"
                keyboardType="email-address"
                autoCapitalize="none"
            />

            <TextInput
                style={styles.input}
                value={state.password}
                onChangeText={(text) =>
                    dispatch({
                        type: 'SET_PASSWORD',
                        payload: text,
                    })
                }
                placeholder="Mật khẩu"
                secureTextEntry
            />

            {state.error ? (
                <Text style={styles.error}>{state.error}</Text>
            ) : null}

            <Button title="Đăng nhập" onPress={handleLogin} />

            <View style={styles.resetButton}>
                <Button
                    title="Đặt lại"
                    onPress={() => dispatch({ type: 'RESET' })}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        backgroundColor: 'white'
    },

    title: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 30,
    },

    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 12,
        marginBottom: 15,
    },

    error: {
        color: 'red',
        marginBottom: 15,
    },

    resetButton: {
        marginTop: 10,
    },
});
