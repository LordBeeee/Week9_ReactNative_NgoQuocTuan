import React from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { store } from './store'; // Đường dẫn tới file store.js
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  Button,
  TouchableOpacity,
  Image,
  TextInput
} from 'react-native';
import { addTodo, changeTodo } from './store'; // Import các actions từ store

// Thành phần Item để hiển thị từng mục trong danh sách
const Item = ({ name, id }) => (
  <TouchableOpacity style={styles.dolist_btn_do}>
    <Image source={require('./assets/Frame (3).png')} style={{ margin: 10 }} />
    <Text style={{ fontSize: 16, fontWeight: '700', lineHeight: 26, width: 200 }}>{name}</Text>
    <Image source={require('./assets/Frame (4).png')} style={{ margin: 10 }} />
  </TouchableOpacity>
);

const App = () => {
  const dispatch = useDispatch();
  const { draft, dolist } = useSelector((state) => state.todo); // Lấy state từ Redux store

  return (
    <View style={styles.dolist}>
      <Image source={require('./assets/Container 104.png')} />
      <View style={styles.row}>
        <TouchableOpacity style={{ marginRight: 120 }}>
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
          onChangeText={(text) => dispatch(changeTodo(text))} // Dispatch action để thay đổi draft
          value={draft}
        />
        <Button
          style={styles.dolist_img}
          title={'Add'}
          onPress={() => dispatch(addTodo())} // Dispatch action để thêm todo
        />
      </View>
      <FlatList
        data={dolist}
        renderItem={({ item }) => <Item name={item.name} id={item.id} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

// Kết nối ứng dụng với Redux store bằng Provider
export default () => (
  <Provider store={store}>
    <App />
  </Provider>
);

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
  dolist_btn_do: {
    flexDirection: 'row',
    width: 335,
    height: 48,
    backgroundColor: '#DEE1E678',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 5,
    justifyContent: 'space-around'
  }
});
