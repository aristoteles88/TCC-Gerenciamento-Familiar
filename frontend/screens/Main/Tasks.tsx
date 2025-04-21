import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { format, addDays, addWeeks, addMonths, startOfDay, endOfDay, startOfWeek, endOfWeek, startOfMonth, endOfMonth, isWithinInterval } from 'date-fns';
import { ptBR } from 'date-fns/locale'; // For Portuguese formatting

const TasksContent = () => {
  // Seletor de visão
  const [viewMode, setViewMode] = useState('day'); // 'dia', 'semana', 'mes'
  const [currentDate, setCurrentDate] = useState(new Date());

  // Dados mock de tarefas
  const [tasks, setTasks] = useState([
    { id: 1, name: 'Jogar o lixo fora', points: 50, deadline: new Date(2025, 3, 19), completed: true, assignedTo: 'Beatriz Silva' },
    { id: 2, name: 'Fazer o dever de casa', points: 100, deadline: new Date(2025, 3, 19), completed: false, assignedTo: 'Bruno Silva' },
    { id: 3, name: 'Lavar a louça', points: 75, deadline: new Date(2025, 3, 19), completed: false, assignedTo: 'Pedro Silva' },
    { id: 4, name: 'Limpar o quarto', points: 150, deadline: new Date(2025, 3, 19), completed: true, assignedTo: 'Amanda Silva' },
    { id: 5, name: 'Passear com o cachorro', points: 60, deadline: new Date(2025, 3, 19), completed: false, assignedTo: 'Bruno Silva' },
    { id: 6, name: 'Fazer compras', points: 120, deadline: new Date(2025, 3, 21), completed: false, assignedTo: 'Beatriz Silva' },
    { id: 7, name: 'Regar as plantas', points: 40, deadline: new Date(2025, 3, 20), completed: true, assignedTo: 'Amanda Silva' },
    { id: 8, name: 'Jogar o lixo fora', points: 50, deadline: new Date(2025, 3, 19), completed: true, assignedTo: 'Beatriz Silva' },
    { id: 9, name: 'Fazer o dever de casa', points: 100, deadline: new Date(2025, 3, 19), completed: false, assignedTo: 'Bruno Silva' },
    { id: 10, name: 'Lavar a louça', points: 75, deadline: new Date(2025, 3, 19), completed: false, assignedTo: 'Pedro Silva' },
    { id: 11, name: 'Limpar o quarto', points: 150, deadline: new Date(2025, 3, 19), completed: true, assignedTo: 'Amanda Silva' },
    { id: 12, name: 'Passear com o cachorro', points: 60, deadline: new Date(2025, 3, 19), completed: false, assignedTo: 'Bruno Silva' },
    { id: 13, name: 'Fazer compras', points: 120, deadline: new Date(2025, 3, 21), completed: false, assignedTo: 'Beatriz Silva' },
    { id: 14, name: 'Regar as plantas', points: 40, deadline: new Date(2025, 3, 20), completed: true, assignedTo: 'Amanda Silva' },
    { id: 15, name: 'Jogar o lixo fora', points: 50, deadline: new Date(2025, 3, 19), completed: true, assignedTo: 'Beatriz Silva' },
    { id: 16, name: 'Fazer o dever de casa', points: 100, deadline: new Date(2025, 3, 19), completed: false, assignedTo: 'Bruno Silva' },
    { id: 17, name: 'Lavar a louça', points: 75, deadline: new Date(2025, 3, 19), completed: false, assignedTo: 'Pedro Silva' },
    { id: 18, name: 'Limpar o quarto', points: 150, deadline: new Date(2025, 3, 19), completed: true, assignedTo: 'Amanda Silva' },
    { id: 19, name: 'Passear com o cachorro', points: 60, deadline: new Date(2025, 3, 19), completed: false, assignedTo: 'Bruno Silva' },
    { id: 20, name: 'Fazer compras', points: 120, deadline: new Date(2025, 3, 21), completed: false, assignedTo: 'Beatriz Silva' },
    { id: 21, name: 'Regar as plantas', points: 40, deadline: new Date(2025, 3, 20), completed: true, assignedTo: 'Amanda Silva' },
    { id: 22, name: 'Jogar o lixo fora', points: 50, deadline: new Date(2025, 3, 19), completed: true, assignedTo: 'Beatriz Silva' },
    { id: 23, name: 'Fazer o dever de casa', points: 100, deadline: new Date(2025, 3, 19), completed: false, assignedTo: 'Bruno Silva' },
    { id: 24, name: 'Lavar a louça', points: 75, deadline: new Date(2025, 3, 19), completed: false, assignedTo: 'Pedro Silva' },
    { id: 25, name: 'Limpar o quarto', points: 150, deadline: new Date(2025, 3, 19), completed: true, assignedTo: 'Amanda Silva' },
    { id: 26, name: 'Passear com o cachorro', points: 60, deadline: new Date(2025, 3, 19), completed: false, assignedTo: 'Bruno Silva' },
    { id: 27, name: 'Fazer compras', points: 120, deadline: new Date(2025, 3, 21), completed: false, assignedTo: 'Beatriz Silva' },
    { id: 28, name: 'Regar as plantas', points: 40, deadline: new Date(2025, 3, 20), completed: true, assignedTo: 'Amanda Silva' },
  ]);

  // Calculo de intervalo de datas baseado na visao escolhida
  const getDateRange = () => {
    switch (viewMode) {
      case 'week':
        return {
          start: startOfWeek(currentDate),
          end: endOfWeek(currentDate)
        };
      case 'month':
        return {
          start: startOfMonth(currentDate),
          end: endOfMonth(currentDate)
        };
      default: // day
        return {
          start: startOfDay(currentDate),
          end: endOfDay(currentDate)
        };
    }
  };

  // Filtrar tarefas baseado na visao escolhida
  const { start, end } = getDateRange();
  const filteredTasks = tasks.filter(task => isWithinInterval(task.deadline, { start, end }));

  // Funcao de navegacao das datas
  const navigateDate = (direction) => {
    const navigators = {
      day: addDays,
      week: addWeeks,
      month: addMonths
    };
    setCurrentDate(navigators[viewMode](currentDate, direction === 'next' ? 1 : -1));
    setCurrentPage(1)
  };

  // Formata a data de acordo com o modo de visao
  const formatDateDisplay = () => {
    switch (viewMode) {
      case 'week':
        if (start.getMonth() === end.getMonth()) {
          return `${format(start, 'd')}-${format(end, 'd MMM yyyy', { locale: ptBR })}`;
        } else {
          return `${format(start, 'd MMM')}-${format(end, 'd MMM yyyy', { locale: ptBR })}`;
        }
      case 'month':
        return format(currentDate, 'MMMM yyyy', { locale: ptBR });
      default:
        return format(currentDate, "EEEE, d MMM yyyy", { locale: ptBR });
    }
  };

  // Estados para a paginacao
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 10;
  const totalPages = Math.ceil(filteredTasks.length / tasksPerPage);

  // Pega tarefas da pagina atual
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = filteredTasks.slice(indexOfFirstTask, indexOfLastTask);

  // Marca tarefa como completa
  const toggleTaskCompletion = (taskId) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.pageTitle}>Tarefas</Text>
      </View>
      <View style={styles.header}>
        <View style={styles.dateNavigator}>
          <TouchableOpacity onPress={() => navigateDate('prev')}>
            <Ionicons name="chevron-back" size={24} color="#6C63FF" />
          </TouchableOpacity>
          
          <TouchableOpacity onPress={() => setCurrentDate(new Date())}>
            <Text style={styles.dateText}>{formatDateDisplay()}</Text>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={() => navigateDate('next')}>
            <Ionicons name="chevron-forward" size={24} color="#6C63FF" />
          </TouchableOpacity>
        </View>

        <View style={styles.viewModeButtons}>
          <TouchableOpacity 
            style={[styles.viewModeButton, viewMode === 'day' && styles.activeViewMode]}
            onPress={() => { 
              setCurrentPage(1);
              setViewMode('day');
            }}
          >
            <Text style={styles.viewModeText}>Dia</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.viewModeButton, viewMode === 'week' && styles.activeViewMode]}
            onPress={() => { 
              setCurrentPage(1);
              setViewMode('week');
            }}
          >
            <Text style={styles.viewModeText}>Semana</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.viewModeButton, viewMode === 'month' && styles.activeViewMode]}
            onPress={() => { 
              setCurrentPage(1);
              setViewMode('month');
            }}
          >
            <Text style={styles.viewModeText}>Mês</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Cabecalho da tabela*/}
      <View style={styles.tableHeader}>
        <Text style={[styles.headerText, { flex: 2 }]}>Tarefa</Text>
        <Text style={styles.headerText}>Pontos</Text>
        { (viewMode === 'week' || viewMode === 'month') ? <Text style={styles.headerText}>Prazo</Text> : null }
        <Text style={styles.headerText}>Concluída</Text>
        <Text style={styles.headerText}>Designada a</Text>
      </View>

      {/* Linhas da tabela */}
      {currentTasks.length > 0 ? (
        <FlatList
          data={currentTasks}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.tableRow}>
              <Text style={[styles.cellText, { flex: 2 }]}>{item.name}</Text>
              <Text style={styles.cellText}>{item.points}</Text>
              { (viewMode === 'week' || viewMode === 'month') ? 
              <Text style={styles.cellText}>
                {format(item.deadline, "dd/MM", { locale: ptBR })}
              </Text> : null }
              <TouchableOpacity 
                style={styles.checkbox} 
                // onPress={() => toggleTaskCompletion(item.id)}
                onPress={() => {}}
                disabled
              >
                <Ionicons 
                  name={item.completed ? "checkbox" : "square-outline"} 
                  size={24} 
                  color={item.completed ? "#6C63FF" : "#ccc"} 
                />
              </TouchableOpacity>
              <Text style={styles.cellText}>{item.assignedTo}</Text>
            </View>
          )}
        />
      ) : (
        <Text style={styles.noTasks}>Nenhuma tarefa para esta data</Text>
      )}

      {/* Paginacao */}
      <View style={styles.pagination}>
        <TouchableOpacity 
          style={styles.paginationButton}
          onPress={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          <Ionicons name="chevron-back" size={20} color={currentPage === 1 ? "#ccc" : "#6C63FF"} />
        </TouchableOpacity>
        
        <Text style={styles.pageText}>
          Página {currentPage} de {totalPages}
        </Text>
        
        <TouchableOpacity 
          style={styles.paginationButton}
          onPress={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          <Ionicons name="chevron-forward" size={20} color={currentPage === totalPages ? "#ccc" : "#6C63FF"} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#fff',
  },
  pageTitle: {
    justifyContent: 'center',
    fontSize: 36,
    fontWeight: 'bold',
    alignSelf: 'center',
    paddingVertical: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  dateNavigator: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateText: {
    paddingHorizontal: 40,
    marginHorizontal: 10,
    fontSize: 16,
    fontWeight: '500',
    textTransform: 'capitalize',
    width: 300
  },
  viewModeButtons: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 2,
  },
  viewModeButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  activeViewMode: {
    backgroundColor: '#6C63FF',
  },
  viewModeText: {
    fontSize: 14,
    color: '#333',
  },
  activeViewModeText: {
    color: '#fff',
  },
  tableHeader: {
    flexDirection: 'row',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    marginBottom: 5,
  },
  headerText: {
    flex: 1,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
    alignItems: 'center',
  },
  cellText: {
    flex: 1,
    textAlign: 'center',
    color: '#555',
  },
  checkbox: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  paginationButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
  },
  pageText: {
    marginHorizontal: 15,
    color: '#666',
  },
  noTasks: {
    textAlign: 'center',
    marginTop: 20,
    color: '#888',
    fontStyle: 'italic',
  },
});

export default TasksContent;

