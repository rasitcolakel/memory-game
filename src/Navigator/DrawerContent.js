import React, { useEffect } from "react";
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";

const DrawerContent = (props) => {
  return <DrawerContentScrollView {...props}></DrawerContentScrollView>;
};

export default DrawerContent;
