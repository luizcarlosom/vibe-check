import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import ProfessorIcon from "./assets/professor.png";

export default function ProfessorLayout({ children, activeScreen }) {
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
        <TouchableOpacity 
          style={styles.tabItem}
          onPress={() => navigation.navigate('ProfDashboard')}
        >
          <Ionicons 
            name={activeScreen === 'Dashboard' ? 'stats-chart' : 'stats-chart-outline'}
            size={24} 
            color={activeScreen === 'Dashboard' ? '#4A2B6A' : '#888'} 
          />
          <Text style={[
            styles.tabText,
            activeScreen === 'Dashboard' && styles.tabTextActive
          ]}>
            Dashboard
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.tabItem}
          onPress={() => navigation.navigate('CheckInScreen', { mock: true })}
        >
          <Ionicons 
            name={activeScreen === 'CheckIn' ? 'checkmark-circle' : 'checkmark-circle-outline'}
            size={24} 
            color={activeScreen === 'CheckIn' ? '#4A2B6A' : '#888'} 
          />
          <Text style={[
            styles.tabText,
            activeScreen === 'CheckIn' && styles.tabTextActive
          ]}>
            Check-in
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.tabItem}
          onPress={() => navigation.navigate('CheckOutScreen', { mock: true })}
        >
          <Ionicons 
            name={activeScreen === 'CheckOut' ? 'exit' : 'exit-outline'}
            size={24} 
            color={activeScreen === 'CheckOut' ? '#4A2B6A' : '#888'} 
          />
          <Text style={[
            styles.tabText,
            activeScreen === 'CheckOut' && styles.tabTextActive
          ]}>
            Check-out
          </Text>
        </TouchableOpacity>
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
    justifyContent: "center",
  },
  tabText: {
    marginTop: 4,
    fontSize: 12,
    color: "#888",
  },
  tabTextActive: {
    color: "#4A2B6A",
    fontWeight: "700",
  },
});