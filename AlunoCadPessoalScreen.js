import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Modal } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

export default function AlunoCadPessoalScreen() {
  const navigation = useNavigation();
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [housing, setHousing] = useState("");
  const [musicGenre, setMusicGenre] = useState({});
  const [feelGoodGenre, setFeelGoodGenre] = useState({});
  const [isAgeModalVisible, setAgeModalVisible] = useState(false);

  const genres = ["Clássico", "Jazz", "Pop", "Rock", "Eletrônica", "Hip Hop", "R&B", "Outro"];
  const ages = Array.from({ length: 50 }, (_, i) => 10 + i);

  const handleMusicGenreChange = (genre) => {
    setMusicGenre(prev => ({
      ...prev,
      [genre]: !prev[genre]
    }));
  };

  const handleFeelGoodGenreChange = (genre) => {
    setFeelGoodGenre(prev => ({
      ...prev,
      [genre]: !prev[genre]
    }));
  };

  const handleSelectAge = (selectedAge) => {
    setAge(selectedAge);
    setAgeModalVisible(false);
  };
  
  const handleNext = () => {
    navigation.navigate('AlunoCadastroCredenciais'); 
  };

  const renderCheckbox = (checked) => (
    <View style={[styles.checkbox, checked && styles.checkboxChecked]}>
      {checked && <MaterialIcons name="check" size={14} color="#6B46C1" />}
    </View>
  );

  const renderRadio = (selected) => (
    <View style={[styles.radio, selected && styles.radioSelected]}>
      {selected && <View style={styles.radioDot} />}
    </View>
  );

  const AgePickerModal = () => (
      <Modal
          animationType="slide"
          transparent={true}
          visible={isAgeModalVisible}
          onRequestClose={() => setAgeModalVisible(false)}
      >
          <View style={styles.modalOverlay}>
              <View style={styles.modalContent}>
                  <Text style={styles.modalTitle}>Selecione sua Idade</Text>
                  <ScrollView style={styles.ageList}>
                      {ages.map((a) => (
                          <TouchableOpacity 
                              key={a} 
                              style={styles.ageItem} 
                              onPress={() => handleSelectAge(String(a))}
                          >
                              <Text style={styles.ageText}>{a}</Text>
                          </TouchableOpacity>
                      ))}
                  </ScrollView>
                  <TouchableOpacity 
                      style={styles.modalCloseButton} 
                      onPress={() => setAgeModalVisible(false)}
                  >
                      <Text style={styles.modalCloseText}>Fechar</Text>
                  </TouchableOpacity>
              </View>
          </View>
      </Modal>
  );

  return (
    <View style={styles.container}>
      
      <AgePickerModal />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Cadastro')}>
          <MaterialIcons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Cadastro do{"\n"}Estudante</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.progressContainer}>
        <View style={styles.progressLineActive} /> 
        <View style={styles.stepCircle1}>
          <MaterialIcons name="person" size={24} color="#6B46C1" />
        </View>
        <View style={styles.progressLine} />
        <View style={styles.stepCircle2}>
          <MaterialIcons name="mail-outline" size={24} color="#FFFFFF" />
        </View>
        <View style={styles.progressLine} />
      </View>
      <View style={styles.progressLabels}>
        <Text style={[styles.progressLabel, styles.progressLabelActive]}>Pessoal</Text>
        <Text style={styles.progressLabel}>Credenciais</Text>
      </View>

      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={{ paddingBottom: 120, paddingHorizontal: 24 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.formSection}>
          <Text style={styles.label}>Idade {age ? `(${age} anos)` : ''}</Text>
          <TouchableOpacity 
              style={styles.selectContainer} 
              onPress={() => setAgeModalVisible(true)}
          >
            <Text style={[styles.selectPlaceholder, age && styles.selectValue]}>
              {age || "Selecione sua idade"}
            </Text>
            <MaterialIcons name="arrow-drop-down" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        <View style={styles.formSection}>
          <Text style={styles.label}>Sexo</Text>
          <TouchableOpacity
            style={styles.optionRow}
            onPress={() => setGender("masculino")}
          >
            {renderRadio(gender === "masculino")}
            <Text style={styles.optionText}>Masculino</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.optionRow}
            onPress={() => setGender("feminino")}
          >
            {renderRadio(gender === "feminino")}
            <Text style={styles.optionText}>Feminino</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.optionRow}
            onPress={() => setGender("outro")}
          >
            {renderRadio(gender === "outro")}
            <Text style={styles.optionText}>Outro</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.formSection}>
          <Text style={styles.label}>Moradia</Text>
          <TouchableOpacity
            style={styles.optionRow}
            onPress={() => setHousing("interna")}
          >
            {renderRadio(housing === "interna")}
            <Text style={styles.optionText}>Interna</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.optionRow}
            onPress={() => setHousing("externa")}
          >
            {renderRadio(housing === "externa")}
            <Text style={styles.optionText}>Externa</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.formSection}>
          <Text style={styles.label}>Gênero musical preferido (Múltipla escolha)</Text>
          <View style={styles.checkboxGrid}>
            {genres.map((genre, index) => (
              <TouchableOpacity
                key={index}
                style={styles.checkboxRow}
                onPress={() => handleMusicGenreChange(genre)}
              >
                {renderCheckbox(musicGenre[genre] || false)}
                <Text style={styles.checkboxText}>{genre}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.formSection}>
          <Text style={styles.label}>Qual gênero te ajuda a se sentir bem? (Múltipla escolha)</Text>
          <View style={styles.checkboxGrid}>
            {genres.map((genre, index) => (
              <TouchableOpacity
                key={index}
                style={styles.checkboxRow}
                onPress={() => handleFeelGoodGenreChange(genre)}
              >
                {renderCheckbox(feelGoodGenre[genre] || false)}
                <Text style={styles.checkboxText}>{genre}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity 
            style={styles.nextButton}
            onPress={handleNext}
        >
          <Text style={styles.nextButtonText}>Próximo</Text>
          <MaterialIcons name="arrow-forward" size={20} color="#6B46C1" />
        </TouchableOpacity>
        <Text style={styles.vibeCheckText}>VibeCheck</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7C3AED", 
  },
  header: {
    paddingTop: 60, 
    paddingBottom: 24,
    paddingHorizontal: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: "#FFFFFF",
    textAlign: "center",
    flex: 1,
  },
  progressContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
    marginBottom: 12,
  },
  progressLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#A78BFA",
  },
  progressLineActive: {
    flex: 1,
    height: 3, 
    backgroundColor: "#FFFFFF",
  },
  stepCircle1: {
    width: 40, 
    height: 40,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 8,
  },
  stepCircle2: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#A78BFA",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 8,
  },
  progressLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 60,
    marginBottom: 24,
  },
  progressLabel: {
    fontSize: 12,
    fontWeight: "500",
    color: "#A78BFA",
    width: '40%',
    textAlign: 'center',
  },
  progressLabelActive: {
      color: "#FFFFFF",
      fontWeight: "700",
  },
  scrollContainer: {
    flexGrow: 1,
  },
  formSection: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FFFFFF",
    marginBottom: 12,
  },
  selectContainer: {
    borderWidth: 2,
    borderColor: "#FFFFFF",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  selectPlaceholder: {
    fontSize: 14,
    color: "#E0E7FF",
  },
  selectValue: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
  
  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#FFFFFF",
    marginRight: 12,
  },
  radioSelected: {
    borderColor: "#FFFFFF",
    backgroundColor: "transparent",
  },
  radioDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#FFFFFF",
    alignSelf: "center",
    marginTop: 3,
  },
  optionText: {
    fontSize: 14,
    color: "#FFFFFF",
  },
  checkboxGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
    width: "48%",
    marginBottom: 12,
  },
  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#FFFFFF",
    marginRight: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxChecked: {
    backgroundColor: "#FFFFFF", 
    borderColor: "#FFFFFF",
  },
  checkboxText: {
    fontSize: 13,
    color: "#FFFFFF",
    flex: 1,
  },
  
  footer: {
    backgroundColor: "#7C3AED",
    paddingTop: 16,
    paddingBottom: 40,
    paddingHorizontal: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 10,
  },
  nextButton: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingVertical: 14,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    gap: 8,
  },
  nextButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#6B46C1",
  },
  vibeCheckText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#E0E0FF",
    textAlign: "center",
  },

  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '60%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#4A2B6A',
    marginBottom: 15,
    textAlign: 'center',
  },
  ageList: {
    maxHeight: 250,
  },
  ageItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  ageText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
  modalCloseButton: {
    backgroundColor: '#7C3AED',
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 15,
  },
  modalCloseText: {
    color: '#FFFFFF',
    fontWeight: '700',
    textAlign: 'center',
  }
});