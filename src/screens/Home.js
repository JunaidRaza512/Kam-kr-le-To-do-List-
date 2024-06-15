import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
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
import { View, BackHandler } from "react-native";
import { useEffect } from "react";
import { useRef } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { setISOWeekYear } from "date-fns/fp";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function Home({ navigation }) {
  const {
    isOpen,
    setOpen,
    tasks,
    settasks,
    value,
    setValue,
    updateItemCategory,
    items,
    setItems,
  } = useContext(ContextList);
  //Search Filter State
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const textInputRef = useRef(null);
  const [matchData, setMatchData] = useState([]);
  const [iconStates, setIconStates] = useState({});

  const handleSearchQuery = (query) => {
    setSearchQuery(query);
    const searchList = filteredItems.filter(
      (items) =>
        items.title.toLowerCase().includes(query.toLowerCase()) ||
        items.category.toLowerCase().includes(query.toLowerCase())
    );
    setMatchData(searchList);
  };

  //FUNCTION TO TOGGLE search
  const handleSearchIconPress = () => {
    setIsSearchActive(true);
    setTimeout(() => {
      textInputRef.current.focus();
    }, 100); // Ensure the TextInput is focused after it appears
  };
  const handleCancelPress = () => {
    setIsSearchActive(false);
    setSearchQuery("");
  };

  // categorizing your items in flatlist
  const [filteredItems, setFilteredItems] = useState(tasks);
  const _addTask = () => {
    navigation.navigate("Details");
  };
  // swipable close and
  const [swipedItemId, setSwipedItemId] = useState(null);
  const leftSwipe = (deleteItem) => {
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

  useEffect(() => {
    // Filter tasks based on the selected value
    const filterTasks = () => {
      if (value === "All Lists") {
        return tasks.filter((item) => item.category !== "Finished");
      }
      return tasks.filter((item) => item.category === value);
    };

    // Update the filtered items state
    setFilteredItems(filterTasks());

    // Define the back action handler
    const backAction = () => {
      if (isSearchActive) {
        setIsSearchActive(false);
        setSearchQuery("");
        return true; // Prevent default behavior
      }
      return false; // Allow default behavior
    };

    // Add the back button event listener
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    // Clean up the event listener on component unmount
    return () => {
      backHandler.remove();
    };
  }, [value, tasks, isSearchActive]);

  // Task finished update

  const handleItemPress = (id) => {
    setIconStates((prevStates) => ({
      ...prevStates,
      [id]: !prevStates[id],
    }));
    updateItemCategory(id);
  };

  const _renderItem = ({ item }) => {
    const iconName = iconStates[item.id]
      ? "checkbox-multiple-marked-outline"
      : "checkbox-multiple-blank-outline";
    return (
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
          renderLeftActions={() => leftSwipe(() => handleDeleteItem(item.id))}
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
              <TouchableOpacity onPress={() => handleItemPress(item.id)}>
                <Icon name={iconName} size={24} color="white" />
              </TouchableOpacity>
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
  };
  return (
    // <SafeAreaView style={styles.container}>
    // <TouchableWithoutFeedback onPress={handleOutsidePress}>
    <View style={styles.container}>
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
        {isSearchActive ? (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              //justifyContent: "space-between",
              flex: 1,
            }}
          >
            <TouchableOpacity onPress={handleCancelPress}>
              <View style={{ marginLeft: 15 }}>
                <Ionicons name="arrow-back" size={24} color="white" />
              </View>
            </TouchableOpacity>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",

                marginLeft: 50,
                flex: 1,
              }}
            >
              <EvilIcons name="search" size={30} color="white" />

              <TextInput
                ref={textInputRef}
                style={styles.textInput}
                placeholder="Search..."
                placeholderTextColor="#fff"
                clearButtonMode="always"
                value={searchQuery}
                onChangeText={(query) => handleSearchQuery(query)}
                //onBlur={() => setIsSearchActive(false)}
              />
            </View>
          </View>
        ) : (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              flex: 1,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-around",
                padding: 10,
              }}
            >
              <MaterialCommunityIcons
                name="sticker-check"
                size={24}
                color="white"
              />
              <MyDropdownPicker
                open={isOpen}
                setOpen={setOpen}
                value={value}
                setValue={setValue}
                items={items}
                setItems={setItems}
              />
            </View>
            <View style={{ padding: 10 }}>
              <TouchableOpacity onPress={handleSearchIconPress}>
                <EvilIcons name="search" size={35} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={searchQuery.length > 0 ? matchData : filteredItems}
        renderItem={_renderItem}
        keyExtractor={(item) => item.id}
      />
      <TouchableOpacity style={styles.addButton} onPress={_addTask}>
        <Ionicons name="add-circle-outline" size={50} color="white" />
      </TouchableOpacity>
    </View>
    // </TouchableWithoutFeedback>
    //   </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  textInput: {
    marginLeft: 15,
    fontSize: 18,
    color: "white",
    padding: 10,
  },
});
