import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./components/screens/Auth/Login";
import Home from "./components/screens/Home";
import SignUp from "./components/screens/Auth/SignUp";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "native-base";
import { useEffect } from "react";
import EmailConfirmation from "./components/screens/Auth/EmailConfirmation";
import { Auth } from "aws-amplify";
import { authActions } from "../store/slices/auth";
import { uiActions } from "../store/slices/ui";
import LoadingScreen from "./components/screens/LoadingScreen";

// Define the stack navigator
const Stack = createNativeStackNavigator();

export default function Navigator() {
  const { toast, loading } = useSelector((state) => state.ui);
  const { isLogged } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const toaster = useToast();
  useEffect(() => {
    if (toast.title) {
      toaster.show(toast);
    }
    checkUser();
  }, [toast]);
  useEffect(() => {
    checkUser();
  }, []);
  const checkUser = async () => {
    dispatch(uiActions.setLoading({ loading: true }));
    try {
      const currentUser = await Auth.currentAuthenticatedUser();
      if (currentUser)
        dispatch(
          authActions.login({
            token: currentUser.signInUserSession.idToken.jwtToken,
          })
        );
    } catch (e) {
      dispatch(authActions.setIsLogged({ isLogged: false }));
    }
    dispatch(uiActions.setLoading({ loading: false }));
  };
  // signin aws
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isLogged === null ? (
          <Stack.Screen
            name="LoadingScreen"
            component={LoadingScreen}
            options={{ headerShown: false }}
          />
        ) : isLogged ? (
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ headerShown: false }}
          />
        ) : (
          <>
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
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
