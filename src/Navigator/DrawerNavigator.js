import React, { useEffect } from "react";
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { createDrawerNavigator } from "@react-navigation/drawer";
import LevelStack from "./LevelStack";
import CollectionStack from "./CollectionStack";
import BottomNavigator from "./BottomNavigator";
import { useDispatch } from "react-redux";
import { signOut } from "../../store/actions/auth";

const Drawer = createDrawerNavigator();

const DrawerContent = (props) => {
  const dispatch = useDispatch();
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItem label="Help" />
      <DrawerItem label="Logout" onPress={() => dispatch(signOut())} />
    </DrawerContentScrollView>
  );
};

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
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
