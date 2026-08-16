import { StyleSheet, Text, View } from 'react-native';
import InfoRow from '../InfoRow/InfoRow';

export default function StudentCard() {
    return (
        <View style={styles.card}>
            <Text style={styles.title}>
                THÔNG TIN CHI TIẾT VỀ SINH VIÊN
            </Text>

            <InfoRow
                label="Mã số sinh viên:"
                value="23635991"
            />

            <InfoRow
                label="Chương trình đào tạo và ngành học:"
                value="Kỹ thuật phần mềm"
            />

            <InfoRow
                label="Niên khóa đào tạo của sinh viên:"
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
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
});