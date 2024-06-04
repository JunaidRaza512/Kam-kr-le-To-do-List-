import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text, TouchableOpacity } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { ContextState } from "../contexts/ContextState";

import Home from "../screens/Home";
import Details from "../screens/Details";

const MainStack = createNativeStackNavigator();

export default function MainNavigator() {
  return (
    <ContextState>
      <NavigationContainer>
        <MainStack.Navigator initialRouteName="Home">
          <MainStack.Screen
            name="Home"
            component={Home}
            options={{
              statusBarColor: "white",
              title: "",
              headerRight: () => (
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <TouchableOpacity>
                    <EvilIcons
                      name="search"
                      size={35}
                      color="white"
                      style={{ marginRight: 15 }}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Entypo
                      name="dots-three-vertical"
                      size={20}
                      color="white"
                    />
                  </TouchableOpacity>
                </View>
              ),
              headerLeft: () => (
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <MaterialCommunityIcons
                    name="sticker-check"
                    size={24}
                    color="white"
                  />
                  <Text style={{ fontSize: 20, color: "white", marginLeft: 8 }}>
                    All Lists
                  </Text>
                  <TouchableOpacity>
                    <AntDesign
                      style={{ padding: 10, marginLeft: 20 }}
                      name="caretdown"
                      size={18}
                      color="white"
                    />
                  </TouchableOpacity>
                </View>
              ),
              headerStyle: {
                backgroundColor: "blue",
              },
              headerTitleStyle: {
                color: "white",
              },
            }}
          />

          <MainStack.Screen
            name="Details"
            component={Details}
            options={({ navigation }) => {
              return {
                statusBarColor: "white",
                title: "",
                headerStyle: {
                  backgroundColor: "blue",
                },
                headerTitleStyle: {
                  color: "white",
                },
                headerLeft: () => (
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                      <Ionicons name="arrow-back" size={24} color="white" />
                    </TouchableOpacity>
                    <Text
                      style={{
                        fontSize: 20,
                        color: "white",
                        marginLeft: 26,
                        fontWeight: "700",
                      }}
                    >
                      New Task
                    </Text>
                  </View>
                ),
              };
            }}
          />
        </MainStack.Navigator>
      </NavigationContainer>
    </ContextState>
  );
}
