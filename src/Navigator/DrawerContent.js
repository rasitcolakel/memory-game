import React, { useEffect } from "react";
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";

const DrawerContent = (props) => {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItem label="Help" />
    </DrawerContentScrollView>
  );
};

export default DrawerContent;
