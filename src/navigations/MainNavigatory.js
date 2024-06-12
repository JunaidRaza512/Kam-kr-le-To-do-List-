import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ContextState } from "../contexts/ContextState";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Home from "../screens/Home";
import Details from "../screens/Details";

const MainStack = createNativeStackNavigator();

export default function MainNavigator() {
  return (
    <GestureHandlerRootView>
      <ContextState>
        <NavigationContainer>
          <MainStack.Navigator initialRouteName="Home">
            <MainStack.Screen
              name="Home"
              component={Home}
              options={{
                statusBarColor: "white",
                title: "Home",
                headerShown: false,
                headerStyle: {
                  backgroundColor: "#004997",
                  // zIndex: 1,
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
                    backgroundColor: "#004997",
                  },
                  headerTitleStyle: {
                    color: "white",
                  },
                  headerLeft: () => (
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
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
    </GestureHandlerRootView>
  );
}
