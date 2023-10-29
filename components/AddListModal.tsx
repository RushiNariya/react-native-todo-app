import React, {useState} from 'react';
import {StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
import {KeyboardAvoidingView, Text} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import colors from '../Colors';
import todos from '../tempData';

function AddListModal({closeModal, addList}: any) {
  const backgroundColors = [
    '#5CD859',
    '#24A6D9',
    '#595BD9',
    '#8022D9',
    '#D159D8',
    '#D85963',
    '#D88559',
  ];
  const [name, setName] = useState('');
  const [bgColors, setBgColors] = useState(backgroundColors[0]);

  const renderColors = () => {
    return backgroundColors.map((color: string) => {
      return (
        <TouchableOpacity
          key={color}
          onPress={() => setBgColors(color)}
          style={[styles.colorSelect, {backgroundColor: color}]}
        />
      );
    });
  };

  const createTodo = () => {
    addList({name, color: bgColors});

    setName('');
    setBgColors('');
    closeModal();
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <TouchableOpacity
        onPress={closeModal}
        style={{
          position: 'absolute',
          top: 64,
          right: 32,
        }}>
        <AntDesign name="close" size={24} color={colors.black} />
      </TouchableOpacity>
      <View style={{marginHorizontal: 32, alignSelf: 'stretch'}}>
        <Text style={styles.title}>Create Todo List</Text>
        <TextInput
          style={styles.input}
          value={name}
          placeholder="List Name"
          onChangeText={text => setName(text)}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginTop: 12,
          }}>
          {renderColors()}
        </View>
        <TouchableOpacity
          style={[styles.create, {backgroundColor: bgColors}]}
          onPress={createTodo}>
          <Text style={{color: colors.white, fontWeight: '600'}}>Create</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.black,
    alignSelf: 'center',
    marginBottom: 16,
  },
  create: {
    marginTop: 24,
    height: 50,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.blue,
    borderRadius: 6,
    height: 50,
    marginTop: 8,
    paddingHorizontal: 16,
    fontSize: 18,
  },
  colorSelect: {
    width: 30,
    height: 30,
    borderRadius: 4,
  },
});
export default AddListModal;
