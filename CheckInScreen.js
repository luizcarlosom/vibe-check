import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, Image, Alert, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ProfessorIcon from "./assets/professor.png";

export default function CheckInScreen({ navigation, route }) {
  const [turmas, setTurmas] = useState(() => {
    const mock = route?.params?.mock;
    return mock
      ? ['Turma 01', 'Turma 02', 'Turma 03', 'Turma 04', 'Turma 05', 'Turma 06', 'Turma 07', 'Turma 08']
      : ['Turma 01'];
  });
  const [input, setInput] = useState('');
  const [selectedTurma, setSelectedTurma] = useState(null);
  const [showCodeModal, setShowCodeModal] = useState(false);
  const [codigoGerado, setCodigoGerado] = useState('');
  const [modalKey, setModalKey] = useState(0);

  // Debug: verificar se o estado está mudando
  useEffect(() => {
    console.log('showCodeModal:', showCodeModal);
    console.log('codigoGerado:', codigoGerado);
  }, [showCodeModal, codigoGerado]);

  // Filtrar turmas baseado no input
  const turmasFiltradas = turmas.filter(turma => 
    turma.toLowerCase().includes(input.toLowerCase())
  );

  // Verificar se a turma digitada já existe
  const turmaExiste = turmas.some(turma => 
    turma.toLowerCase() === input.trim().toLowerCase()
  );

  const nextTurmaName = () => {
    let i = 1;
    while (i <= 99) {
      const n = `Turma ${String(i).padStart(2, '0')}`;
      if (!turmas.includes(n)) return n;
      i++;
    }
    return `Turma ${Date.now()}`;
  };

  const handleAdd = () => {
    const nome = input.trim();
    if (!nome) {
      Alert.alert('Atenção', 'Digite o nome da turma.');
      return;
    }
    if (turmas.some(t => t.toLowerCase() === nome.toLowerCase())) {
      Alert.alert('Atenção', 'Esta turma já existe.');
      return;
    }
    setTurmas(prev => [...prev, nome]);
    setInput('');
  };

  const handleDelete = (nome) => {
    setTurmas(prev => prev.filter(t => t !== nome));
  };

  const gerarCodigo = () => {
    return Math.floor(10000 + Math.random() * 90000).toString();
  };

  const handleLiberar = () => {
    if (!selectedTurma) {
      Alert.alert('Atenção', 'Por favor, selecione uma turma antes de liberar o check-in.');
      return;
    }
    
    const novoCodigo = String(Math.floor(10000 + Math.random() * 90000));
    console.log('Gerando código:', novoCodigo);
    setCodigoGerado(novoCodigo);
    setModalKey(prev => prev + 1);
    setShowCodeModal(true);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={[
        styles.turmaRow,
        selectedTurma === item && styles.turmaRowSelected
      ]}
      onPress={() => setSelectedTurma(item)}
    >
      <View style={styles.turmaContent}>
        <View style={[
          styles.radioButton,
          selectedTurma === item && styles.radioButtonSelected
        ]}>
          {selectedTurma === item && <View style={styles.radioButtonInner} />}
        </View>
        <Text style={styles.turmaNome}>{item}</Text>
      </View>
      <TouchableOpacity onPress={() => handleDelete(item)}>
        <Ionicons name="trash-outline" size={20} color="#c30000" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* TOP BAR */}
      <View style={styles.topBar}>
        <Image source={ProfessorIcon} style={styles.mascote} />
        <Text style={styles.topName}>Professor(a) Silva</Text>
      </View>

      {/* CONTENT */}
      <View style={styles.content}>
        <Text style={styles.title}>Iniciar check-in</Text>

        <View style={styles.searchContainer}>
          <Ionicons name="search-outline" size={20} color="#666" style={styles.searchIcon} />
          <TextInput
            style={styles.input}
            placeholder="Buscar ou adicionar turma"
            placeholderTextColor="#999"
            value={input}
            onChangeText={setInput}
            returnKeyType="search"
          />
          {input.length > 0 && (
            <TouchableOpacity onPress={() => setInput('')}>
              <Ionicons name="close-circle" size={20} color="#999" />
            </TouchableOpacity>
          )}
        </View>

        {input.length > 0 && !turmaExiste && (
          <TouchableOpacity style={styles.addSuggestion} onPress={handleAdd}>
            <Ionicons name="add-circle-outline" size={20} color="#4A2B6A" />
            <Text style={styles.addSuggestionText}>
              Adicionar "{input}"
            </Text>
          </TouchableOpacity>
        )}

        {turmasFiltradas.length === 0 && input.length > 0 && turmaExiste && (
          <Text style={styles.noResultText}>Turma já cadastrada</Text>
        )}

        {turmasFiltradas.length === 0 && input.length > 0 && !turmaExiste && (
          <Text style={styles.noResultText}>Nenhuma turma encontrada. Clique acima para adicionar.</Text>
        )}

        <FlatList
          data={turmasFiltradas}
          keyExtractor={(item) => item}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            input.length === 0 ? (
              <Text style={styles.emptyText}>Nenhuma turma cadastrada</Text>
            ) : null
          }
        />

        <TouchableOpacity
          style={styles.primaryButton}
          onPress={handleLiberar}
          disabled={!turmas.length}
        >
          <Text style={styles.primaryButtonText}>Liberar Check-in</Text>
        </TouchableOpacity>
      </View>

      {/* BOTTOM TAB */}
      <View style={styles.bottomTab}>
        <TouchableOpacity 
          style={styles.tabItem}
          onPress={() => navigation.navigate('ProfDashboard')}
        >
          <Ionicons name="stats-chart-outline" size={24} color="#888" />
          <Text style={styles.tabText}>Dashboard</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabItem}>
          <Ionicons name="checkmark-circle" size={24} color="#4A2B6A" />
          <Text style={[styles.tabText, styles.tabTextActive]}>Check-in</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.tabItem}
          onPress={() => navigation.navigate('CheckOutScreen', { mock: true })}
        >
          <Ionicons name="exit-outline" size={24} color="#888" />
          <Text style={styles.tabText}>Check-out</Text>
        </TouchableOpacity>
      </View>

      {/* OVERLAY CUSTOMIZADO */}
      {showCodeModal && (
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Ionicons name="checkmark-circle" size={60} color="#4A2B6A" />
            <Text style={styles.modalTitle}>Check-in Liberado!</Text>
            <Text style={styles.modalSubtitle}>Turma: {selectedTurma}</Text>
            <View style={styles.codigoContainer}>
              <Text style={styles.codigoLabel}>Código de acesso:</Text>
              <Text style={styles.codigoText}>{codigoGerado}</Text>
            </View>
            <TouchableOpacity 
              style={styles.modalButton}
              onPress={() => {
                setShowCodeModal(false);
                setSelectedTurma(null);
              }}
            >
              <Text style={styles.modalButtonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F8FF',
  },
  topBar: {
    height: 60,
    paddingVertical: 18,
    paddingHorizontal: 32,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderColor: '#C0C0C0',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 8,
  },
  mascote: {
    width: 32,
    height: 32,
    resizeMode: 'contain',
    borderRadius: 100,
  },
  topName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4A2B6A',
  },
  content: {
    flex: 1,
    paddingHorizontal: 32,
    paddingTop: 24,
    paddingBottom: 90,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#4A2B6A',
    textAlign: 'center',
    marginBottom: 24,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#4A2B6A',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    marginBottom: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    color: '#222',
    fontSize: 14,
  },
  addSuggestion: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0e6ff',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  addSuggestionText: {
    marginLeft: 8,
    color: '#4A2B6A',
    fontSize: 14,
    fontWeight: '600',
  },
  noResultText: {
    textAlign: 'center',
    color: '#666',
    fontSize: 14,
    marginVertical: 16,
  },
  emptyText: {
    textAlign: 'center',
    color: '#999',
    fontSize: 14,
    marginTop: 20,
  },
  listContent: {
    paddingBottom: 16,
  },
  turmaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  turmaRowSelected: {
    backgroundColor: '#f0e6ff',
    borderColor: '#4A2B6A',
  },
  turmaContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#999',
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButtonSelected: {
    borderColor: '#4A2B6A',
  },
  radioButtonInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#4A2B6A',
  },
  turmaNome: {
    color: '#2d2d2d',
    fontSize: 14,
  },
  primaryButton: {
    backgroundColor: '#4A2B6A',
    paddingVertical: 16,
    borderRadius: 12,
    marginTop: 10,
  },
  primaryButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 16,
  },
  outlinedButton: {
    borderWidth: 1,
    borderColor: '#4A2B6A',
    paddingVertical: 16,
    borderRadius: 12,
    marginTop: 14,
    backgroundColor: '#fff',
    display: 'none', // Esconder o botão "Add Nova Turma"
  },
  bottomTab: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderColor: '#C0C0C0',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 8,
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabText: {
    marginTop: 4,
    fontSize: 12,
    color: '#888',
  },
  tabTextActive: {
    color: '#4A2B6A',
    fontWeight: '700',
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    width: '80%',
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#4A2B6A',
    marginTop: 16,
    marginBottom: 8,
  },
  modalSubtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
  },
  codigoContainer: {
    backgroundColor: '#f0e6ff',
    paddingVertical: 20,
    paddingHorizontal: 30,
    borderRadius: 12,
    marginBottom: 24,
    alignItems: 'center',
  },
  codigoLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  codigoText: {
    fontSize: 36,
    fontWeight: '700',
    color: '#4A2B6A',
    letterSpacing: 8,
  },
  modalButton: {
    backgroundColor: '#4A2B6A',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 12,
  },
  modalButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});