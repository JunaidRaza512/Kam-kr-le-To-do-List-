import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Modal,
  Dimensions,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { FlatList } from "react-native";
import { useState } from "react";
import { ContextList } from "../contexts/ContextState";
import { useContext } from "react";
import { Swipeable } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import MyDropdownPicker from "../components/MyDropdownPicker";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { View } from "react-native";

export default function Home({ navigation }) {
  //setting height dynamically
  const { tasks, settasks } = useContext(ContextList);
  const _addTask = () => {
    navigation.navigate("Details");
  };
  // swipable close and
  const [swipedItemId, setSwipedItemId] = useState(null);
  const rightSwipe = (deleteItem) => {
    return (
      <View style={styles.deleteButton}>
        <TouchableOpacity
          style={{
            justifyContent: "center",
            alignItems: "center",
            width: 100,
            height: 100,
          }}
          onPress={deleteItem}
        >
          <AntDesign name="delete" size={30} color="white" />
        </TouchableOpacity>
      </View>
    );
  };
  // function to perform delete operation
  const handleDeleteItem = (id) => {
    settasks((prevData) => prevData.filter((item) => item.id !== id));
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
        {item.presentDay ? item.presentDay : "No date"}
      </Text>
      <Swipeable
        renderRightActions={() => rightSwipe(() => handleDeleteItem(item.id))}
        onSwipeableOpen={() => setSwipedItemId(item.id)}
        onSwipeableClose={() => setSwipedItemId(null)}
        overshootRight={false}
        overshootLeft={false}
        friction={2}
        leftThreshold={30}
        ref={(ref) => {
          if (ref && swipedItemId && swipedItemId !== item.id) {
            ref.close();
          }
        }}
      >
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
      </Swipeable>
    </View>
  );
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View
          style={{
            flexDirection: "row",
            alignContent: "center",
            justifyContent: "space-between",
            backgroundColor: "#004997",
            zIndex: 10000,
            height: 60,
            width: "100%",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-around",
              marginLeft: 10,
            }}
          >
            <MaterialCommunityIcons
              name="sticker-check"
              size={24}
              color="white"
            />
            <MyDropdownPicker />
          </View>

          <View style={{ justifyContent: "center", marginRight: 15 }}>
            <TouchableOpacity>
              <EvilIcons name="search" size={35} color="white" />
            </TouchableOpacity>
          </View>
        </View>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={tasks}
          renderItem={_renderItem}
          keyExtractor={(item) => item.id}
        />
        <TouchableOpacity style={styles.addButton} onPress={_addTask}>
          <Ionicons name="add-circle-outline" size={50} color="white" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  addButton: {
    position: "absolute",
    bottom: 40,
    right: 30,
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
    // backgroundColor: "white",
    padding: 20,
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 16,
    width: "93%",
    elevation: 1,
  },
  deleteButton: {
    backgroundColor: "red",
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 12,
    width: 100,
  },
});
