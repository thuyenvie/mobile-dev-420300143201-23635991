import { StyleSheet, Text, View } from 'react-native';

interface InfoRowProps {
    label: string;
    value: string;
    emphasized?: boolean;
}

export default function InfoRow({
    label,
    value,
    emphasized = false,
}: InfoRowProps) {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>
                {label}
            </Text>

            <Text
                style={[
                    styles.value,
                    emphasized && styles.emphasized,
                ]}
            >
                {value}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 12,
    },

    label: {
        flex: 0.45,
        fontSize: 22,
        fontWeight: 'bold',
        marginRight: 8,
    },

    value: {
        flex: 0.55,
        fontSize: 22,
    },

    emphasized: {
        fontWeight: 'bold',
    },
});