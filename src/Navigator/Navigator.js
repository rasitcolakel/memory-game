import { NavigationContainer } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import { setLoggedUser, setPushToken } from "../../store/actions/auth";
import UnAuthorizedStack from "./UnAuthorizedStack";
import LoadingStack from "./LoadingStack";
import DrawerNavigator from "./DrawerNavigator";
import { useToast } from "native-base";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

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
        <UnAuthorizedStack />
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
