import React, { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { styles } from "./styles";
import { Participant } from "../../components/Participant";

interface Participant {
  id: string;
  name: string;
}

export function Home() {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [participantName, setParticipantName] = useState("");
  const [date, setDate] = useState("");

  function handleAddNewParticipant() {
    if (participantName === "") {
      return Alert.alert(
        "A participant should have a name to be added to the event."
      );
    }

    const newParticipant: Participant = {
      id: new Date().getTime().toString(),
      name: participantName,
    };

    setParticipants((previousState) => [...previousState, newParticipant]);
    setParticipantName("");
  }

  function handleRemoverParticipant(name: string) {
    Alert.alert("Remove", `Are you sure you want to remove ${name}?`, [
      {
        text: "Yes",
        onPress: () => {
          setParticipants(
            participants.filter((participant) => participant.name !== name)
          ),
            Alert.alert(`${name} was removed.`);
        },
      },
      {
        text: "No",
        style: "cancel",
      },
    ]);
  }

  useEffect(() => {
    const today = new Date().toDateString();

    setDate(today);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.eventName}>Event name</Text>
      <Text style={styles.eventDate}>{date}</Text>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Participant's name"
          placeholderTextColor="#6B6B6B"
          autoCapitalize="words"
          value={participantName}
          onChangeText={setParticipantName}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={handleAddNewParticipant}
        >
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={participants}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Participant
            key={item.id}
            name={item.name}
            onButtonPress={() => handleRemoverParticipant(item.name)}
          />
        )}
        ListEmptyComponent={() => (
          <Text style={styles.listEmptyText}>
            Add new participants to your event.
          </Text>
        )}
      />
    </View>
  );
}
