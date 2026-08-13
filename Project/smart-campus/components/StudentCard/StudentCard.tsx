import { StyleSheet, Text, View } from 'react-native';
import InfoRow from '../InfoRow/InfoRow';

export default function StudentCard() {
    return (
        <View style={styles.card}>
            <Text style={styles.title}>THÔNG TIN SINH VIÊN</Text>

            <InfoRow
                label="Mã SV:"
                value="23635991"
            />

            <InfoRow
                label="Ngành học:"
                // value="Kỹ thuật phần mềm"
                value="Kỹ thuật phần mềm"
            />

            <InfoRow
                label="Niên khóa:"
                value="2023 - 2027"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        width: '100%',
        padding: 20,
        borderWidth: 1,
        borderRadius: 12,
    },

    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
});