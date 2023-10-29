/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useState} from 'react';
import {
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Animated,
  Alert,
} from 'react-native';
import {Swipeable} from 'react-native-gesture-handler';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';

import colors from '../Colors';

function TodoModal({closeModal, list, updateList}: any) {
  const [newTodo, setNewTodo] = useState('');
  // const [color, setColor] = useState(list.color);
  // const [todos, setTodos] = useState(list.todos);

  const totalTodos = list.todos.length;
  const completedTodos = list.todos.filter(
    (todo: any) => todo.completed,
  ).length;

  const toggleTodoCompleted = (index: any) => {
    let newList = list;

    newList.todos[index].completed = !newList.todos[index].completed;

    updateList(newList);
  };

  const addTodo = () => {
    if (list.todos.some((todo: any) => todo.title === newTodo)) {
      console.log('same');
      Alert.alert('Aready Exist', 'check your todo list again!!');
      return;
    }

    let newList = list;

    newList.todos.push({
      title: newTodo,
      completed: false,
    });

    updateList(newList);

    Keyboard.dismiss();

    setNewTodo('');
  };

  const deleteTodo = (index: any) => {
    let newList = list;

    newList.todos.splice(index, 1);

    updateList(newList);
  };

  const renderTodo = (todo: any, index: any) => {
    return (
      <Swipeable renderRightActions={(_, dragX) => rightAction(dragX, index)}>
        <View style={styles.todoContainer}>
          <TouchableOpacity onPress={() => toggleTodoCompleted(index)}>
            <Ionicons
              name={todo.completed ? 'ios-square' : 'ios-square-outline'}
              size={24}
              color={colors.gray}
              style={{width: 32}}
            />
          </TouchableOpacity>
          <Text
            style={[
              styles.todo,
              {
                color: todo.completed ? colors.gray : colors.black,
                textDecorationLine: todo.completed ? 'line-through' : 'none',
              },
            ]}>
            {todo.title}
          </Text>
        </View>
      </Swipeable>
    );
  };

  const rightAction = (dragX: any, index: any) => {
    const scale = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [1, 0.9],
      extrapolate: 'clamp',
    });

    const opacity = dragX.interpolate({
      inputRange: [-100, -20, 0],
      outputRange: [1, 0.9, 0],
      extrapolate: 'clamp',
    });

    return (
      <TouchableOpacity onPress={() => deleteTodo(index)}>
        <Animated.View style={[styles.deleteButton, {opacity: opacity}]}>
          <Animated.Text
            style={{
              color: colors.white,
              fontWeight: '800',
              transform: [{scale}],
            }}>
            Delete
          </Animated.Text>
        </Animated.View>
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        onPress={closeModal}
        style={{
          position: 'absolute',
          top: 64,
          right: 32,
          zIndex: 10,
        }}>
        <AntDesign name="close" size={24} color={colors.black} />
      </TouchableOpacity>
      <View
        style={[
          styles.section,
          styles.header,
          {borderBottomColor: list.color},
        ]}>
        <View>
          <Text style={styles.title}>{list.name}</Text>
          <Text style={styles.taskCount}>
            {completedTodos} of {totalTodos} tasks
          </Text>
        </View>
      </View>
      <View style={[styles.section, {flex: 3, marginVertical: 16}]}>
        <FlatList
          data={list.todos}
          renderItem={({item, index}) => renderTodo(item, index)}
          keyExtractor={item => item.title}
          showsVerticalScrollIndicator={false}
        />
      </View>

      <KeyboardAvoidingView
        style={[styles.section, styles.footer]}
        behavior="padding">
        <TextInput
          style={[styles.input, {borderColor: list.color}]}
          value={newTodo}
          onChangeText={setNewTodo}
        />
        <TouchableOpacity
          style={[styles.addTodo, {backgroundColor: list.color}]}
          onPress={addTodo}>
          <AntDesign name="plus" size={16} color={colors.white} />
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  section: {
    // flex: 1,
    alignSelf: 'stretch',
  },
  header: {
    marginLeft: 64,
    justifyContent: 'flex-end',
    borderBottomWidth: 3,
    paddingTop: 16,
  },
  title: {
    fontSize: 30,
    fontWeight: '800',
    color: colors.black,
  },
  taskCount: {
    marginTop: 4,
    marginBottom: 16,
    color: colors.gray,
    fontWeight: '600',
  },
  footer: {
    paddingHorizontal: 32,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
  },
  input: {
    flex: 1,
    height: 48,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 6,
    marginRight: 8,
    paddingHorizontal: 8,
  },
  addTodo: {
    borderRadius: 4,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  todoContainer: {
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 32,
  },
  todo: {
    color: colors.black,
    fontWeight: '700',
    fontSize: 16,
  },
  deleteButton: {
    flex: 1,
    backgroundColor: colors.red,
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
  },
});

export default TodoModal;
