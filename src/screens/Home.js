import { StyleSheet, View, Text, TouchableOpacity, Modal } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { FlatList } from "react-native";
import { useState } from "react";
import { ContextList } from "../contexts/ContextState";
import { useContext } from "react";

export default function Home({ navigation }) {
  // modal vissibility
  const [modalVisible, setModalVisible] = useState(false);
  const { tasks } = useContext(ContextList);
  const _addTask = () => {
    navigation.navigate("Details");
  };
  const _renderItem = ({ item }) => (
    <View>
      <Text
        style={{
          padding: 10,
          fontSize: 16,
          color: "#004997",
          fontWeight: "bold",
        }}
      >
        Later
      </Text>
      <TouchableOpacity activeOpacity={0.5} delayPressIn={50}>
        <View
          style={[
            styles.outerView,
            { backgroundColor: item.color ? item.color : "#004997" },
          ]}
        >
          <View style={styles.item}>
            <Ionicons name="stop-outline" size={24} color="white" />
            <Text style={styles.title}>{item.title}</Text>
          </View>
          {item.date ? (
            <Text
              style={{
                alignSelf: "stretch",
                marginVertical: 3,
                marginLeft: 35,
                fontSize: 16,
                fontWeight: "400",
                color: "white",
              }}
            >
              {item.date}
            </Text>
          ) : null}
          {item.category ? (
            <Text
              style={{
                marginLeft: 35,
                fontSize: 16,
                color: "white",
                fontWeight: "500",
              }}
            >
              {item.category}
            </Text>
          ) : null}
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
        <Ionicons name="add-circle-outline" size={50} color="white" />
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
    fontSize: 18,
    marginLeft: 10,
    color: "white",
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
