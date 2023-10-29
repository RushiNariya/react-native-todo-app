import React, {useState} from 'react';
import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import colors from '../Colors';
import TodoModal from './TodoModal';

function TodoList({list, updateList}: any) {
  const completedTodos = list.todos.filter(
    (item: any) => item.completed,
  ).length;
  const remainingTodos = list.todos.length - completedTodos;

  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal((flag: boolean) => !flag);
  };
  return (
    <View>
      <Modal
        onRequestClose={toggleModal}
        visible={showModal}
        animationType="slide">
        <TodoModal
          list={list}
          closeModal={toggleModal}
          updateList={updateList}
        />
      </Modal>
      <TouchableOpacity
        onPress={toggleModal}
        style={[styles.listContainer, {backgroundColor: list.color}]}>
        <Text style={styles.listTitle} numberOfLines={1}>
          {list.name}
        </Text>
        <View>
          <View style={{alignItems: 'center'}}>
            <Text style={styles.count}>{remainingTodos}</Text>
            <Text style={styles.subtitle}>remaining</Text>
          </View>
          <View style={{alignItems: 'center'}}>
            <Text style={styles.count}>{completedTodos}</Text>
            <Text style={styles.subtitle}>completed</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    paddingVertical: 32,
    paddingHorizontal: 16,
    borderRadius: 6,
    marginHorizontal: 12,
    alignItems: 'center',
    width: 200,
  },
  listTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.white,
    marginBottom: 18,
  },
  count: {
    fontSize: 48,
    fontWeight: '200',
    color: colors.white,
  },
  subtitle: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.white,
  },
});

export default TodoList;
