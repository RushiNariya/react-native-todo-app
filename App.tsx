import React, {useState} from 'react';
import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import colors from './Colors';
import AddListModal from './components/AddListModal';
import TodoList from './components/TodoList';
import todos from './tempData';

function App(): JSX.Element {
  const [todoVisible, setTodoVisible] = useState(false);
  const [todoList, setTodoList] = useState(todos);

  const toggleVisibility = () => {
    setTodoVisible(flag => !flag);
  };

  const addIntoList = (list: any) => {
    setTodoList(data => [
      ...data,
      {...list, id: todoList.length + 1, todos: []},
    ]);
  };

  const updateList = (list: any) => {
    setTodoList(data =>
      data.map((item: any) => {
        return list.id === item.id ? list : item;
      }),
    );
  };

  return (
    <View style={styles.container}>
      <Modal
        visible={todoVisible}
        animationType="slide"
        onRequestClose={toggleVisibility}>
        <AddListModal closeModal={toggleVisibility} addList={addIntoList} />
      </Modal>
      <View style={{flexDirection: 'row'}}>
        <View style={styles.divider} />
        <Text style={styles.title}>
          Todo{' '}
          <Text style={{fontWeight: '300', color: colors.blue}}> List</Text>
        </Text>
        <View style={styles.divider} />
      </View>
      <View style={{marginVertical: 48}}>
        <TouchableOpacity style={styles.addList} onPress={toggleVisibility}>
          <AntDesign name="plus" size={16} color={colors.blue} />
        </TouchableOpacity>

        <Text style={styles.add}>Add List</Text>
      </View>
      <View style={{height: 275, paddingLeft: 32}}>
        <FlatList
          data={todoList}
          keyExtractor={item => item.name}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={({item}) => {
            return <TodoList list={item} updateList={updateList} />;
          }}
          keyboardShouldPersistTaps="always"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  divider: {
    backgroundColor: colors.lightBlue,
    height: 1,
    flex: 1,
    alignSelf: 'center',
  },
  title: {
    fontSize: 38,
    fontWeight: '800',
    color: colors.black,
    paddingHorizontal: 40,
  },
  addList: {
    borderWidth: 2,
    borderColor: colors.lightBlue,
    borderRadius: 4,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  add: {
    color: colors.blue,
    fontWeight: '600',
    fontSize: 14,
    marginTop: 8,
  },
});

export default App;
