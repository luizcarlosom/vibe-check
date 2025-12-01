import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from "react-native";
import AlunoLayout from "./AlunoLayout";

export default function Emocional({ navigation }) {
  const [selectedTab, setSelectedTab] = useState("checkin"); 
  const [selectedEmotion, setSelectedEmotion] = useState(null);

  const emotions = [
    { id: 1, emoji: "😊", label: "Happy" },
    { id: 2, emoji: "😌", label: "Calmo" },
    { id: 3, emoji: "😪", label: "Cansado" },
    { id: 4, emoji: "😅", label: "Ansioso" },
    { id: 5, emoji: "😢", label: "Triste" },
    { id: 6, emoji: "😤", label: "Frustrado" },
    { id: 7, emoji: "🤩", label: "Entusiasmado" },
    { id: 8, emoji: "😐", label: "Neutro" },
    { id: 9, emoji: "🤔", label: "Pensativo" },
  ];

  return (
    <AlunoLayout style={styles.container}>
      {/* -------- TÍTULO -------- */}
      <Text style={styles.title}>Emocional</Text>

      <Text style={styles.subtitle}>Como você está se sentindo?</Text>

      {/* -------- CHECK-IN / CHECK-OUT TABS -------- */}
      <View style={styles.tabsRow}>
        <TouchableOpacity
          style={[
            styles.tabButton,
            selectedTab === "checkin" && styles.tabButtonActive,
          ]}
          onPress={() => setSelectedTab("checkin")}
        >
          <Text
            style={[
              styles.tabTextOption,
              selectedTab === "checkin" && styles.tabTextActive,
            ]}
          >
            Check-in
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.tabButton,
            selectedTab === "checkout" && styles.tabButtonActive,
          ]}
          onPress={() => setSelectedTab("checkout")}
        >
          <Text
            style={[
              styles.tabTextOption,
              selectedTab === "checkout" && styles.tabTextActive,
            ]}
          >
            Check-out
          </Text>
        </TouchableOpacity>
      </View>

      {/* -------- EMOJI SELECTION CARD -------- */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>
          {selectedTab === "checkin"
            ? "Como você está se sentindo antes da aula?"
            : "Como você está se sentindo após a aula?"}
        </Text>
        <Text style={styles.cardSub}>
          Selecione o emoji que melhor representa seu humor atual
        </Text>

        <View style={styles.emotionsGrid}>
          {emotions.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.emojiItem,
                selectedEmotion === item.id && styles.emojiItemSelected,
              ]}
              onPress={() =>
                setSelectedEmotion((prev) => (prev === item.id ? null : item.id))
              }
            >
              <Text style={styles.emoji}>{item.emoji}</Text>
              <Text style={styles.emojiLabel}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {selectedTab === "checkout" && (
        <View style={styles.musicBox}>
          <Text style={styles.musicLabel}>
            Escreva músicas que você escutou durante a aula:
          </Text>

          <TextInput
            style={styles.musicInput}
            placeholder="Ex.: Mozart, improvisação de Jazz"
            placeholderTextColor="#B1A9C8"
            multiline
          />
        </View>
      )}

      {/* -------- BUTTON -------- */}
      <TouchableOpacity
        style={[
          styles.sendButton,
          !selectedEmotion && styles.sendButtonDisabled
        ]}
        disabled={!selectedEmotion}
        onPress={() => navigation.navigate("VibeCheckFinalizada")}
      >
        <Text style={styles.sendButtonText}>Enviar {selectedTab === "checkin" ? "Check-in" : "Check-out"}</Text>
      </TouchableOpacity>
    </AlunoLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F8FF",
    paddingHorizontal: 32,
  },

  /* TITLES */
  title: {
    marginTop: 20,
    fontSize: 28,
    fontWeight: "700",
    color: "#502A68",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#4E2761",
    textAlign: "center",
    marginTop: 8,
  },

  /* TABS */
  tabsRow: {
    flexDirection: "row",
    backgroundColor: "#EDEBFA",
    marginTop: 20,
    borderRadius: 20,
    padding: 4,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 16,
  },
  tabButtonActive: {
    backgroundColor: "#FFFFFF",
  },
  tabTextOption: {
    textAlign: "center",
    fontSize: 15,
    color: "#7C70A8",
  },
  tabTextActive: {
    color: "#4A2B6A",
    fontWeight: "700",
  },

  /* CARD */
  card: {
    backgroundColor: "#FFFFFF",
    marginTop: 20,
    padding: 20,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 6,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#4A2B6A",
  },
  cardSub: {
    fontSize: 13,
    color: "#7B7B90",
    marginTop: 4,
  },

  /* EMOJI GRID */
  emotionsGrid: {
    marginTop: 16,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  emojiItem: {
    width: "30%",
    backgroundColor: "#F7F7FF",
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: "center",
    marginBottom: 12,
    borderWidth: 2,
    borderColor: "transparent",
  },
  emojiItemSelected: {
    borderColor: "#6B3E8C",
    backgroundColor: "#EDE2F7",
  },
  emoji: { fontSize: 32 },
  emojiLabel: {
    marginTop: 6,
    fontSize: 13,
    color: "#4A2B6A",
    fontWeight: "600",
  },

  /* BUTTON */
  sendButton: {
    backgroundColor: "#4A2B6A",
    paddingVertical: 16,
    borderRadius: 10,
    marginTop: 20,
  },
  sendButtonDisabled: {
    backgroundColor: "#BFA9D4",
  },
  sendButtonText: {
    color: "#FFF",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "700",
  },
  musicBox: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 16,
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 6,
  },
  musicLabel: {
    fontSize: 15,
    color: "#4A2B6A",
    marginBottom: 8,
    fontWeight: "500",
  },
  musicInput: {
    height: 80,
    backgroundColor: "#F7F7FF",
    borderRadius: 12,
    padding: 12,
    textAlignVertical: "top",
    fontSize: 14,
    color: "#4A2B6A",
  },
});
