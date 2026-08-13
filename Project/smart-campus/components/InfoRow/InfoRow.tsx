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
            <Text style={styles.label}>{label}</Text>

            <Text style={[styles.value, emphasized && styles.emphasized]}>
                {value}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },

    label: {
        width: 100,
        fontWeight: 'bold',
    },

    value: {
        flex: 1,
    },

    emphasized: {
        fontWeight: 'bold',
    },
});