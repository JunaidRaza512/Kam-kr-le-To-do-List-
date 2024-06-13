import React, { useContext } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import { StyleSheet, View } from "react-native";

const MyDropdownPicker = ({
  value,
  setValue,
  items,
  setItems,
  open,
  setOpen,
}) => {
  return (
    <View>
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={(text) => setValue(text)}
        setItems={setItems}
        style={styles.dropDown}
        dropDownContainerStyle={styles.dropDownContainerStyle}
        dropDownDirection="BOTTOM"
        placeholder="All Lists"
        // placeholderStyle={{
        //   color: "white",
        //   fontSize: 18,
        //   fontWeight: "400",
        // }}
        textStyle={styles.pickerStyle}
        listMode="SCROLLVIEW"
        arrowIconStyle={styles.arrowIcon} // Style for arrow icon
        tickIconStyle={styles.tickIcon} // Style for tick icon
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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
    maxHeight: 1000,
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
