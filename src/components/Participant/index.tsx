import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";

type ParticipantProps = {
  name: string;
  onButtonPress: () => void;
};

export function Participant({ name, onButtonPress }: ParticipantProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>{name}</Text>

      <TouchableOpacity style={styles.button} onPress={onButtonPress}>
        <Text style={styles.buttonText}>-</Text>
      </TouchableOpacity>
    </View>
  );
}
