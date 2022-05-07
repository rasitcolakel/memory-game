import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";

import Login from "../components/screens/Auth/Login";
import Home from "../components/screens/Home";
import SignUp from "../components/screens/Auth/SignUp";
import { useDispatch, useSelector } from "react-redux";
import { Icon, useToast } from "native-base";
import { useEffect, useRef } from "react";
import EmailConfirmation from "../components/screens/Auth/EmailConfirmation";
import LoadingScreen from "../components/screens/LoadingScreen";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import { setLoggedUser, setPushToken } from "../../store/actions/auth";
import DrawerContent from "./DrawerContent";
import Level from "../components/screens/Level";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});
// Define the stack navigator
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const BottomTabs = createBottomTabNavigator();

function BottomNavigator() {
  return (
    <BottomTabs.Navigator>
      <BottomTabs.Screen
        name="LevelStack"
        component={LevelStack}
        options={{ headerShown: false }}
      />
      <BottomTabs.Screen
        name="CollectionStack"
        component={CollectionStack}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" color={color} size={size} />
          ),
        }}
      />
    </BottomTabs.Navigator>
  );
}
export default function Navigator() {
  const { toast } = useSelector((state) => state.ui);
  const { isLogged } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const toaster = useToast();
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    if (toast.title) {
      toaster.show(toast);
    }
    checkUser();
  }, [toast]);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = () => {
    dispatch(setLoggedUser());
  };

  useEffect(() => {
    if (!isLogged) return;
    registerForPushNotificationsAsync().then(
      (token) => token && dispatch(setPushToken(token))
    );
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {});
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log("response", response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, [isLogged]);

  return (
    <NavigationContainer>
      {isLogged === null ? (
        <LoadingStack />
      ) : isLogged ? (
        <DrawerNavigator />
      ) : (
        <NoAuthStack />
      )}
    </NavigationContainer>
  );
}

async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    console.log("status", finalStatus);
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  }
  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return token;
}

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => DrawerContent(props)}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Drawer.Screen
        name="Levels"
        component={BottomNavigator}
        options={{ drawerLabel: "Levels" }}
      />
      <Drawer.Screen
        name="Collections"
        component={BottomNavigator}
        options={{ drawerLabel: "Collections" }}
      />
    </Drawer.Navigator>
  );
};

function LevelStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Level"
        component={Level}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

function CollectionStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

const NoAuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EmailConfirmation"
        component={EmailConfirmation}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const LoadingStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="LoadingScreen"
        component={LoadingScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
