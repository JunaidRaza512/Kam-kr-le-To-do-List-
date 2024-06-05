import { StyleSheet, View, Text, TouchableOpacity, Modal } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { FlatList } from "react-native";
import { useState } from "react";
import { ContextList } from "../contexts/ContextState";
import { useContext } from "react";

export default function Home({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const { tasks } = useContext(ContextList);

  const _addTask = () => {
    navigation.navigate("Details");
  };
  const _renderItem = ({ item }) => (
    <View>
      <Text style={{ padding: 10, fontSize: 16, color: "blue" }}>Later</Text>
      <TouchableOpacity delayPressIn={50}>
        <View style={styles.outerView}>
          <View style={styles.item}>
            <Ionicons name="stop-outline" size={24} color="black" />
            <Text style={styles.title}>{item.title}</Text>
          </View>
          {item.date ? (
            <Text
              style={{
                alignSelf: "stretch",
                marginVertical: 3,
                marginLeft: 35,
                fontSize: 14,
                fontWeight: "400",
                color: "blue",
              }}
            >
              {item.date}
            </Text>
          ) : null}

          <Text style={{ marginLeft: 35, fontSize: 14 }}>{item.category}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
  return (
    <View style={styles.container}>
      <View style={{ justifyContent: "center", alignContent: "center" }}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={tasks}
          renderItem={_renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>

      <TouchableOpacity style={styles.addButton} onPress={_addTask}>
        <Ionicons name="add-circle" size={50} color="blue" />
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      ></Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  addButton: {
    position: "absolute",
    bottom: 60,
    right: 18,
  },
  title: {
    fontSize: 16,
    marginLeft: 10,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
  },
  outerView: {
    backgroundColor: "white",
    padding: 20,
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 16,
    width: 330,
    elevation: 1,
  },
});
