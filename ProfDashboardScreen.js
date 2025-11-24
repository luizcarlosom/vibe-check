import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import ProfessorLayout from './ProfessorLayout';

const { width } = Dimensions.get('window');

export default function ProfDashboardScreen({ navigation }) {
  const barData = [
    { day: 'Seg', label: '😊', checkin: 3, checkout: 3 },
    { day: 'Ter', label: 'Ter', checkin: 2, checkout: 2 },
    { day: 'Qua', label: 'Qua', checkin: 9, checkout: 8 },
    { day: 'Qui', label: 'Qui', checkin: 1, checkout: 3 },
    { day: 'Sex', label: 'Sex', checkin: 3, checkout: 3 },
    { day: 'Sab', label: 'Sab', checkin: 2, checkout: 9 },
    { day: 'Dom', label: 'Dom', checkin: 1, checkout: 4 },
  ];

  const pieData = [
    { label: "Pensativo", value: "20.59%", color: "#2196F3", count: 7, pos: "left-top" },
    { label: "Cansado", value: "8.82%", color: "#4FC3F7", count: 3, pos: "left-mid" },
    { label: "Neutro", value: "5.88%", color: "#9C27B0", count: 2, pos: "left-bottom-1" },
    { label: "Estusiasmado", value: "5.88%", color: "#66BB6A", count: 2, pos: "left-bottom-2" },
    { label: "Frustrado", value: "8.82%", color: "#3F51B5", count: 3, pos: "bottom" },
    { label: "Triste", value: "5.88%", color: "#FF9800", count: 2, pos: "right-bottom" },
    { label: "Ansioso", value: "23.53%", color: "#26C6DA", count: 8, pos: "right-mid" },
    { label: "Calmo", value: "14.71%", color: "#FF8A80", count: 5, pos: "right-top-1" },
    { label: "Feliz", value: "5.88%", color: "#B388FF", count: 2, pos: "right-top-2" },
  ]

  return (
    <ProfessorLayout>
      
      <Text style={styles.pageTitle}>Dashboard Geral</Text>

      <View style={styles.filtersRow}>
        <TouchableOpacity style={styles.filterButton}>
          <Ionicons name="calendar-outline" size={20} color="#4A2B6A" />
          <Text style={styles.filterText}>Período</Text>
        </TouchableOpacity>
        
        <View style={styles.dropdownContainer}>
          <Text style={styles.dropdownText}>Turma</Text>
          <Ionicons name="chevron-down" size={20} color="#4A2B6A" />
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Check-in x Check-out</Text>
        <Text style={styles.cardSubtitle}>Pontuações emocionais médias ao longo da semana</Text>

        <View style={styles.chartContainer}>
          <View style={styles.yAxis}>
            <Text style={styles.axisText}>9</Text>
            <Text style={styles.axisText}>6</Text>
            <Text style={styles.axisText}>3</Text>
            <Text style={styles.axisText}>0</Text>
          </View>

          <View style={styles.barsArea}>
            <View style={[styles.gridLine, { bottom: '0%' }]} />
            <View style={[styles.gridLine, { bottom: '33%' }]} />
            <View style={[styles.gridLine, { bottom: '66%' }]} />
            <View style={[styles.gridLine, { bottom: '100%' }]} />

            <View style={styles.barsRow}>
              {barData.map((item, index) => (
                <View key={index} style={styles.barGroup}>
                  <View style={styles.barsWrapper}>
                    <View style={[styles.bar, { height: `${(item.checkin / 9) * 100}%`, backgroundColor: '#8B5CF6' }]} />
                    <View style={[styles.bar, { height: `${(item.checkout / 9) * 100}%`, backgroundColor: '#F87171' }]} />
                  </View>
                  <Text style={styles.xAxisText}>{item.label}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        <View style={styles.legendContainer}>
          <View style={styles.legendItem}>
            <View style={[styles.legendBox, { backgroundColor: '#8B5CF6' }]} />
            <Text style={styles.legendText}>Check-in</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendBox, { backgroundColor: '#F87171' }]} />
            <Text style={styles.legendText}>Check-out</Text>
          </View>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Distribuição das emoções dos estudantes</Text>
        <Text style={styles.cardSubtitle}>Pontuações emocionais médias ao longo da semana</Text>

        <View style={styles.pieChartMock}>
          <View style={styles.pieCircle}>
            <View style={[styles.slice, { backgroundColor: '#2196F3', transform: [{ rotate: '0deg' }], width: '50%', height: '100%', right: '50%' }]} />
            <View style={[styles.slice, { backgroundColor: '#2196F3', transform: [{ rotate: '74deg' }], width: '50%', height: '100%', right: '50%' }]} />
            <View style={[styles.slice, { backgroundColor: '#F87171', transform: [{ rotate: '180deg' }], width: '50%', height: '100%', right: '50%' }]} />
            <View style={[styles.slice, { backgroundColor: '#A78BFA', transform: [{ rotate: '233deg' }], width: '50%', height: '100%', right: '50%' }]} />
            <View style={[styles.slice, { backgroundColor: '#6366F1', transform: [{ rotate: '-40deg' }], width: '50%', height: '100%', left: '50%' }]} />
            <View style={[styles.slice, { backgroundColor: '#60A5FA', transform: [{ rotate: '-70deg' }], width: '50%', height: '100%', left: '50%' }]} />
            <View style={[styles.slice, { backgroundColor: '#F59E0B', transform: [{ rotate: '130deg' }], width: '50%', height: '100%', right: '50%' }]} />
            <View style={[styles.slice, { backgroundColor: '#34D399', transform: [{ rotate: '-20deg' }], width: '50%', height: '100%', left: '50%' }]} />
          </View>
                
          <View style={styles.pieLabelsContainer}>
              {pieData.map((item, idx) => (
                  <View key={idx} style={styles.pieLabelTag}>
                      <View style={[styles.pieDot, { backgroundColor: item.color }]} />
                      <Text style={styles.pieLabelText}>{item.label}</Text>
                      <Text style={[styles.pieValueText, { color: item.color }]}>{item.count}  {item.value}</Text>
                  </View>
              ))}
          </View>
        </View>
      </View>

      <Text style={styles.sectionHeader}>Com base na semana anterior:</Text>
      
      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Ionicons name="trending-up" size={24} color="#22C55E" />
          <Text style={[styles.statValue, { color: '#22C55E' }]}>65%</Text>
          <Text style={styles.statLabel}>Melhor</Text>
        </View>

        <View style={styles.statCard}>
          <MaterialCommunityIcons name="minus" size={24} color="#3B32F6" />
          <Text style={[styles.statValue, { color: '#3B32F6' }]}>25%</Text>
          <Text style={styles.statLabel}>Igual</Text>
        </View>

        <View style={styles.statCard}>
          <Ionicons name="trending-down" size={24} color="#EF4444" />
          <Text style={[styles.statValue, { color: '#EF4444' }]}>10%</Text>
          <Text style={styles.statLabel}>Pior</Text>
        </View>
      </View>

      <View style={styles.exportButtonsContainer}>
          <TouchableOpacity style={styles.exportButton}>
              <FontAwesome5 name="file-pdf" size={18} color="#4A2B6A" style={{marginRight: 8}} />
              <Text style={styles.exportText}>Exportar PDF</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.exportButton}>
              <FontAwesome5 name="file-excel" size={18} color="#4A2B6A" style={{marginRight: 8}} />
              <Text style={styles.exportText}>Exportar Excel</Text>
          </TouchableOpacity>
      </View>

    </ProfessorLayout>
  );
}

const styles = StyleSheet.create({
  pageTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#2E1065',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 20,
  },

  filtersRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 20,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#4A2B6A',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  filterText: {
    marginLeft: 8,
    color: '#4A2B6A',
    fontWeight: '600',
  },
  dropdownContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#4A2B6A',
    paddingBottom: 8,
    width: '45%',
    justifyContent: 'space-between',
  },
  dropdownText: {
    fontSize: 16,
    color: '#4A2B6A',
    fontWeight: '600',
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
  },
  cardSubtitle: {
    fontSize: 12,
    color: '#7B7B90',
    marginTop: 4,
    marginBottom: 20,
  },

  chartContainer: {
    flexDirection: 'row',
    height: 180,
    marginBottom: 10,
  },
  yAxis: {
    justifyContent: 'space-between',
    paddingRight: 10,
    paddingBottom: 20, 
  },
  axisText: {
    fontSize: 12,
    color: '#7B7B90',
  },
  barsArea: {
    flex: 1,
    position: 'relative',
    paddingBottom: 20, 
  },
  gridLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: '#E5E7EB',
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  barsRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    zIndex: 1,
  },
  barGroup: {
    alignItems: 'center',
    height: '100%',
    justifyContent: 'flex-end',
  },
  barsWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 4,
    height: '100%', 
  },
  bar: {
    width: 8,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  xAxisText: {
    marginTop: 8,
    fontSize: 10,
    color: '#555',
    transform: [{ rotate: '-45deg' }],
  },
  legendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
    gap: 20,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendBox: {
    width: 8,
    height: 8,
    marginRight: 6,
  },
  legendText: {
    fontSize: 12,
    color: '#555',
  },

  pieChartMock: {
    alignItems: 'center',
  },
  pieCircle: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: '#EEE',
  },
  pieLabelsContainer: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  pieLabelTag: {
    width: '48%',
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  pieDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  pieLabelText: {
    fontSize: 12,
    color: '#333',
    marginRight: 4,
  },
  pieValueText: {
    fontSize: 12,
    fontWeight: '700',
  },

  sectionHeader: {
    fontSize: 14,
    fontWeight: '700',
    color: '#000',
    marginBottom: 12,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  statCard: {
    width: '30%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    marginVertical: 8,
  },
  statLabel: {
    fontSize: 14,
    color: '#000',
    fontWeight: '600',
  },

  exportButtonsContainer: {
    gap: 12,
    marginBottom: 20,
  },
  exportButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#4A2B6A',
    borderRadius: 25,
    paddingVertical: 14,
  },
  exportText: {
    color: '#4A2B6A',
    fontWeight: '600',
    fontSize: 14,
  },
});