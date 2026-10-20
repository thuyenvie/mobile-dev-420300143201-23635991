import { Pressable, Text, View } from "react-native";

type Props = {
    value: number;
    size?: number;
    onChange?: (value: number) => void;
    disabled?: boolean;
};

export default function RatingStars({ value, size = 24, onChange, disabled = false }: Props) {
    const rating = Number.isFinite(value) ? Math.max(0, Math.min(5, value)) : 0;
    const width = size * 1.3;
    const height = size * 1.5;
    const textStyle = { fontSize: size, lineHeight: height, width };

    return (
        <View
            style={{ flexDirection: "row" }}
            accessible={!onChange}
            accessibilityLabel={`${rating.toFixed(1)} trên 5 sao`}
        >
            {[1, 2, 3, 4, 5].map((star) => (
                <Pressable
                    key={star}
                    disabled={!onChange || disabled}
                    onPress={() => onChange?.(star)}
                    accessibilityRole="button"
                    accessibilityLabel={`Đánh giá ${star} sao`}
                    accessibilityState={{ selected: star === rating, disabled: !onChange || disabled }}
                    style={{ width, height }}
                >
                    <Text style={[textStyle, { color: "#cbd5e1" }]}>★</Text>
                    <View
                        pointerEvents="none"
                        style={{ position: "absolute", overflow: "hidden", width: width * Math.max(0, Math.min(1, rating - star + 1)), height }}
                    >
                        <Text style={[textStyle, { color: "#b45309" }]}>★</Text>
                    </View>
                </Pressable>
            ))}
        </View>
    );
}
