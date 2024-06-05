import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Modal,
  Button,
  Alert,
  Image,
} from "react-native";
import { useState } from "react";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import DropDownPicker from "react-native-dropdown-picker";
import { MaterialIcons } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { ContextList } from "../contexts/ContextState";
import { useContext } from "react";
import uuid from "react-native-uuid";
import { format } from "date-fns";

export default function Details({ navigation }) {
  // colors  array
  const backGroundColors = [
    "#5CD859",
    "#24A6D9",
    "#595BD9",
    "#8022D9",
    "#D159D8",
    "#D85963",
    "#D88559",
  ];
  const [newTaskColor, setnewTaskColor] = useState("");

  // formatted date
  const [formattedDate, setFormattedDate] = useState(
    format(new Date(), "MMMM d, yyyy")
  );
  const [formattedTime, setFormattedTime] = useState(
    format(new Date(), "h:mm a")
  );
  const { addTask } = useContext(ContextList);
  // task Added InputText usestate
  const [_addedActivity, set_addedActivity] = useState("");
  //const navigation = useNavigation();
  const taskAdded = () => {
    if (_addedActivity.trim() === "") {
      Alert.alert("Error", "Please Enter your Task");
    } else {
      const activity = {
        id: uuid.v4(),
        title: _addedActivity,
        date: formattedDate,
        category: value,
        color: newTaskColor,
      };
      addTask(activity);
      set_addedActivity("");
      navigation.goBack();
    }
  };
  //Modal of Add new category
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [task, setTask] = useState("");
  //function of add category
  const handleAddTask = () => {
    // Logic to add task to a list
    if (task.trim() === "") {
      Alert.alert("Error", "task cannot be empty.");
    } else {
      const category = {
        label: task,
        value: task.toLowerCase().replace(/\s+/g, ""),
      };
      setItems([...items, category]); // adding item
      //setValue(category);
      // Reset the task input
      setTask("");
      // Hide the modal
      setIsModalVisible(false);
    }
  };
  //InputText Height
  const [inputHeight, setInputHeight] = useState(0);
  // datepicker and time picker
  const [date, setDate] = useState(new Date()); // date usestate
  const [time, setTime] = useState(new Date()); // time usestate
  const [showDatePicker, setShowDatePicker] = useState(false); // showdatepicker usestate
  const [showTimePicker, setShowTimePicker] = useState(false); ///time picker usestate
  const [showTime, setShowTime] = useState(false); //conditional rendering of time text

  // date selection
  const onChangeDate = (_, selectedDate) => {
    // const currentDate = selectedDate || date;
    // setDate(currentDate);
    // setShowDatePicker(false);
    // setShowTime(true);
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate);
      setFormattedDate(format(selectedDate, "MMMM d, yyyy"));
      setShowTime(true);
    }
  };
  // time selection
  const onChangeTime = (_, selectedTime) => {
    const currentTime = selectedTime || time;
    setShowTimePicker(false);
    setTime(currentTime);
    setFormattedTime(format(currentTime, "h:mm a"));
  };
  // dropdown picker
  const [isOpen, setOpen] = useState(false);
  const [value, setValue] = useState(null); // value selcted in items
  //items in a dropdownpicker
  const [items, setItems] = useState([
    { label: "Work", value: "work" },
    {
      label: "Personal",
      value: "personal",
    },
    {
      label: "Errands",
      value: "errands",
    },
    {
      label: "Birthday",
      value: "birthday",
    },
    {
      label: "School",
      value: "school",
    },
  ]);

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.keyBoardAwareScrollView}
      extraScrollHeight={100}
    >
      <View
        style={{
          backgroundColor: "white",
          borderRadius: 20,
          flex: 1,
        }}
      >
        <View style={styles.container}>
          <Text
            style={[styles.textStyle, { fontWeight: "500", color: "#004997" }]}
          >
            Please Write your Activity?
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              flexWrap: "wrap",
              marginVertical: 5,
            }}
          >
            <TextInput
              value={_addedActivity}
              onChangeText={(text) => set_addedActivity(text)}
              style={[styles.inputValue, { height: Math.max(35, inputHeight) }]}
              placeholder="Enter your task"
              placeholderTextColor="#888"
              multiline
              onContentSizeChange={(e) =>
                setInputHeight(e.nativeEvent.contentSize.height)
              }
            />
          </View>
          <View
            style={{
              height: 1,
              backgroundColor: "blue",
              width: 320,
              marginBottom: 40,
            }}
          />
          <Text
            style={[styles.textStyle, { fontWeight: "500", color: "#004997" }]}
          >
            Due Date
          </Text>
          <TouchableOpacity
            style={{ marginTop: 5, marginBottom: 12 }}
            onPress={() => setShowDatePicker(true)}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Text style={[styles.inputValue, { width: 300, color: "#888" }]}>
                {formattedDate}
              </Text>

              <AntDesign name="calendar" size={24} color="black" />
              {showDatePicker && (
                <DateTimePicker
                  value={date}
                  mode="date"
                  display="default"
                  onChange={onChangeDate}
                />
              )}
            </View>
          </TouchableOpacity>
          <View
            style={{
              height: 1,
              backgroundColor: "blue",
              width: 320,
              marginBottom: 30,
            }}
          />
          {showTime && [
            <Text key="text" style={[styles.textStyle, { fontWeight: "500" }]}>
              Due Time
            </Text>,
            <TouchableOpacity
              key="opacity"
              style={{ marginTop: 5, marginBottom: 12 }}
              onPress={() => setShowTimePicker(true)}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Text
                  style={[styles.inputValue, { width: 300, color: "#888" }]}
                >
                  {formattedTime}
                </Text>

                <Ionicons name="timer-outline" size={24} color="black" />
                {showTimePicker && (
                  <DateTimePicker
                    value={time}
                    mode="time"
                    display="default"
                    onChange={onChangeTime}
                  />
                )}
              </View>
            </TouchableOpacity>,
            <View
              key="view"
              style={{
                height: 1,
                backgroundColor: "blue",
                width: 320,
                marginBottom: 50,
              }}
            />,
          ]}

          <Text
            style={[styles.textStyle, { fontWeight: "500", color: "#004997" }]}
          >
            Add List
          </Text>
          <View
            style={{
              marginVertical: 20,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {
              <DropDownPicker
                open={isOpen}
                value={value}
                items={items}
                setOpen={() => setOpen(!isOpen)}
                setValue={(val) => setValue(val)}
                setItems={setItems}
                style={styles.dropDown}
                dropDownContainerStyle={styles.dropDownContainerStyle}
                dropDownDirection="BOTTOM"
                placeholder="Category"
                placeholderStyle={{
                  color: "black",
                  fontSize: 18,
                  fontWeight: "400",
                }}
                textStyle={styles.pickerStyle}
                listMode="SCROLLVIEW"
              />
            }
          </View>
          <View
            style={{
              marginTop: 30,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-evenly",
              marginBottom: 35,
            }}
          >
            <Text style={styles.textStyle}>Add a new Category</Text>
            <TouchableOpacity onPress={() => setIsModalVisible(true)}>
              <MaterialIcons
                name="category"
                size={24}
                color="black"
                style={{ marginLeft: 135 }}
              />
            </TouchableOpacity>
            <Modal
              animationType="slide"
              transparent={true}
              visible={isModalVisible}
              onRequestClose={() => setIsModalVisible(false)}
            >
              <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter your category"
                    value={task}
                    onChangeText={(text) => setTask(text)}
                  />
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Button title="Submit" onPress={handleAddTask} />
                    <Button
                      title="Cancel"
                      onPress={() => setIsModalVisible(false)}
                    />
                  </View>
                </View>
              </View>
            </Modal>
          </View>
          <View
            style={{
              flexDirection: "row",
            }}
          >
            {backGroundColors.map((element, index) => (
              <TouchableOpacity
                style={{ marginRight: 12 }}
                key={index}
                onPress={() => setnewTaskColor(element)}
              >
                <Image
                  style={{
                    backgroundColor: element,
                    padding: 10,
                    borderRadius: 8,
                    height: 35,
                    width: 35,
                    alignSelf: "center",
                  }}
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <TouchableOpacity
          onPress={taskAdded}
          style={{ position: "absolute", bottom: 30, right: 40 }}
        >
          <AntDesign name="checkcircleo" size={40} color="#004997" />
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  keyBoardAwareScrollView: {
    flexGrow: 1,
    justifyContent: "space-around",
  },
  container: {
    justifyContent: "center",
    alignItems: "flex-start",
    marginHorizontal: 16,
    marginVertical: 10,
  },

  textStyle: {
    textAlign: "center",
    fontWeight: "500",
    fontSize: 18,
    color: "#004997",
  },
  inputValue: {
    color: "#888",
    fontSize: 16,
    marginTop: 5,
    // alignSelf: "flex-start",
  },
  dropDown: {
    height: 40,
    width: "100%",
    marginBottom: 20,
    elevation: 2,
    borderWidth: 0,
  },
  dropDownContainerStyle: {
    backgroundColor: "#fff",
    elevation: 2,
    borderWidth: 0,
  },
  pickerStyle: {
    fontSize: 18, // Change this to your desired font size
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
    marginBottom: 10,
    width: 200,
  },
});
