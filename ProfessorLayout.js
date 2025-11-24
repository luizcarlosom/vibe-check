import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import ProfessorIcon from "./assets/professor.png";

export default function ProfessorLayout({ children }) {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>

      {/* -------- TOP BAR -------- */}
      <View style={styles.topBar}>
        <Image source={ProfessorIcon} style={styles.mascote} />
        <Text style={styles.topName}>Professor(a) Silva</Text>
      </View>

      {/* -------- PÁGINA -------- */}
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ScrollView>

      {/* -------- BOTTOM TAB -------- */}
      <View style={styles.bottomTab}>
          <Text style={styles.tabText}>
            VibeCheck
          </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F7F8FF" },

  topBar: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 60, 
    paddingVertical: 18,
    paddingHorizontal: 32,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderColor: "#C0C0C0",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 8,
    zIndex: 10,
  },
  mascote: {
    width: 32,
    height: 32,
    resizeMode: "contain",
    borderRadius: 100,
  },
  topName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#4A2B6A",
  },
  
  scrollContainer: {
    flex: 1,
    paddingTop: 80, 
    paddingHorizontal: 32,
  },
  
  content: {
    flex: 1,
    paddingTop: 80,
    paddingBottom: 80,
    paddingHorizontal: 32,
  },
  bottomTab: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderColor: "#C0C0C0",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 8,
  },
  tabItem: {
    alignItems: "center",
  },
  tabText: {
    marginTop: 4,
    fontSize: 16,
    color: "#4A2B6A",
    fontWeight: "700",
  },
});