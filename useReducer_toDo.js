import React, { useState, useEffect, useReducer } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
  Button,
  TouchableOpacity,
  Image,
  TextInput
} from 'react-native';

// Reducer function
var reducer = (state, action) => {
  switch (action.type) {
    case 'add': {
      return {
        ...state,
        draft: '',
        dolist: [
          {
            id: state.dolist.length.toString(),
            name: state.draft
          },
          ...state.dolist
        ]
      };
    }
    case 'change_todo': {
      return {
        ...state,
        draft: action.nextToDo
      };
    }
    default:
      return state; // Return current state by default
  }
};

// Item component for rendering each task
const Item = ({ name, id, onEdit, onDelete }) => (
  <TouchableOpacity style={styles.dolist_btn_do}>
    <Image source={require('./assets/Frame (3).png')} style={{ margin: 10 }} />
    <Text style={{ fontSize: 16, fontWeight: '700', lineHeight: 26, width: 200 }}>{name}</Text>
    <TouchableOpacity style={{ width: 40, height: 30, backgroundColor: 'red' }}></TouchableOpacity>
    <Image source={require('./assets/Frame (4).png')} style={{ margin: 10 }} />
  </TouchableOpacity>
);

const App = () => {
  // Initial state with default values
  const initialState = {
    draft: '',
    dolist: [
      { id: '1', name: 'Lau nha' },
      { id: '2', name: 'quet nha' }
    ]
  };

  var [state, dispatch] = useReducer(reducer, initialState);

  return (
    <View style={styles.dolist}>
      <Image source={require('./assets/Container 104.png')} />
      <View style={styles.row}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')} style={{ marginRight: 120 }}>
          <Image source={require('./assets/Icon Button 11.png')} />
        </TouchableOpacity>
        <Image source={require('./assets/Frame (1).png')} />
        <View style={{ marginLeft: 5 }}>
          <Text style={styles.dolist_text_1}>Hi Twinkle</Text>
          <Text style={styles.dolist_text_2}>Have a great day ahead</Text>
        </View>
      </View>
      <View>
        <TextInput
          style={styles.dolist_btn_sreach}
          onChangeText={text => {
            dispatch({
              type: 'change_todo',
              nextToDo: text
            });
          }}
          value={state.draft}
        />
        <Button
          style={styles.dolist_img}
          title={'Add'}
          onPress={() => {
            dispatch({ type: 'add' });
          }}
        />
      </View>
      <FlatList
        data={state.dolist}
        renderItem={({ item }) => (
          <Item
            name={item.name}
            id={item.id}
            onEdit={() => handleEdit(item.id)}
            onDelete={() => handleDelete(item.id)}
          />
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row'
  },
  dolist: {
    flexDirection: 'column',
    alignItems: 'center',
    width: 389,
    height: 843,
    borderWidth: 2
  },
  dolist_text_1: {
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 30,
    textAlign: 'center'
  },
  dolist_text_2: {
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 22,
    color: '#171A1F',
    textAlign: 'center',
    opacity: 0.75
  },
  dolist_btn_sreach: {
    flexDirection: 'row',
    width: 334,
    height: 43,
    borderColor: '#9095A0',
    borderWidth: 1,
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 50,
    marginBottom: 20
  },
  dolist_img: {
    margin: 10
  },
  dolist_text_input: {
    color: '#BCC1CA'
  },
  dolist_btn_do: {
    flexDirection: 'row',
    width: 335,
    height: 48,
    backgroundColor: '#DEE1E678',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 5,
    justifyContent: 'space-around'
  },
  dolist_btn_cong: {
    width: 69,
    height: 69,
    backgroundColor: '#00BDD6',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50
  }
});

export default App;
