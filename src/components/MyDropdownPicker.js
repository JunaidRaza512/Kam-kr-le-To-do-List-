import React, { useContext } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import { ContextList } from "../contexts/ContextState"; // Adjust the path as needed
import { StyleSheet, View } from "react-native";

const MyDropdownPicker = () => {
  const { isOpen, setOpen, value, setValue, items, setItems } =
    useContext(ContextList);

  return (
    <View>
      <DropDownPicker
        open={isOpen}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        style={styles.dropDown}
        dropDownContainerStyle={styles.dropDownContainerStyle}
        dropDownDirection="BOTTOM"
        placeholder="All Lists"
        placeholderStyle={{
          color: "white",
          fontSize: 18,
          fontWeight: "400",
        }}
        textStyle={styles.pickerStyle}
        listMode="SCROLLVIEW"
        arrowIconStyle={styles.arrowIcon} // Style for arrow icon
        tickIconStyle={styles.tickIcon} // Style for tick icon
        //   zIndex={1000}
        //   zIndexInverse={6000}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  dropDown: {
    width: 150,
    padding: 5,
    borderWidth: 0,
    backgroundColor: "#004997",
  },
  dropDownContainerStyle: {
    backgroundColor: "#004997",
    borderWidth: 0,
    width: 150,
  },

  pickerStyle: {
    fontSize: 18,
    color: "white",
  },
  arrowIcon: {
    tintColor: "white", // Change the color of the arrow icon
  },
  tickIcon: {
    tintColor: "#004997", // Change the color of the tick icon
  },
});

export default MyDropdownPicker;
