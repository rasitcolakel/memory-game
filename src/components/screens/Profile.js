import React from "react";
import { useDispatch, useSelector } from "react-redux";
import AppContainer from "../UI/AppContainer";
import {
  Avatar,
  Box,
  Center,
  HStack,
  Icon,
  IconButton,
  ScrollView,
  Switch,
  Text,
} from "native-base";
import {
  getUserFromDB,
  resetPushToken,
  setChangePasswordState,
  setPushToken,
} from "../../../store/actions/auth";
import { Alert } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { ChangePassword } from "../UI/Profile/ChangePassword";

export default function Profile() {
  const { user, pushToken } = useSelector((state) => state.auth);
  const { userDetails } = user;
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getUserFromDB());
  }, []);

  const openChangePasswordModal = () => {
    dispatch(setChangePasswordState({ visible: true }));
  };

  return (
    <AppContainer>
      <Center w="full" flex={1}>
        <ChangePassword />
        <Box
          flex={1}
          bg="gray.50"
          m={2}
          rounded="2xl"
          borderWidth={1}
          borderColor="gray.300"
          w={"2/5"}
        >
          <ScrollView>
            <Center flex={1} w="full" p={3}>
              <BorderedCenter>
                <Avatar
                  size={100}
                  bg="red.500"
                  mb={2}
                  _text={{
                    fontSize: "3xl",
                  }}
                >
                  {user.name.slice(0, 2).toUpperCase()}
                </Avatar>
                <Text
                  fontSize={{
                    md: "xl",
                    lg: "2xl",
                  }}
                >
                  {user.name}
                </Text>
              </BorderedCenter>
              <BorderedCenter>
                <HStack
                  alignItems="center"
                  w="full"
                  justifyContent="space-between"
                  flex={1}
                >
                  <Text fontSize="sm" fontWeight="bold">
                    Email:
                  </Text>
                  <Text fontSize="sm">{user.email}</Text>
                </HStack>
              </BorderedCenter>
              <BorderedCenter>
                <HStack
                  alignItems="center"
                  w="full"
                  justifyContent="space-between"
                  flex={1}
                >
                  <Text fontSize="sm" fontWeight="bold">
                    Notifications:
                  </Text>
                  <Switch
                    size="sm"
                    isChecked={userDetails?.isNotificationsAccepted || false}
                    onChange={() => {
                      if (userDetails?.isNotificationsAccepted) {
                        Alert.alert(
                          "Notifications",
                          "Are you sure to disable notifications?",
                          [
                            {
                              text: "Yes",
                              onPress: () => {
                                dispatch(resetPushToken());
                              },
                              style: "destructive",
                            },
                            {
                              text: "Cancel",
                              onPress: () => console.log("Cancel Pressed"),
                              style: "cancel",
                            },
                          ]
                        );
                      } else {
                        if (!pushToken) {
                          Alert.alert(
                            "Notifications",
                            "Please allow notifications in settings",
                            [
                              {
                                text: "OK",
                                onPress: () => console.log("Cancel Pressed"),
                                style: "default",
                              },
                            ]
                          );
                          return;
                        }
                        dispatch(setPushToken(pushToken));
                      }
                    }}
                  />
                </HStack>
              </BorderedCenter>
              <BorderedCenter>
                <HStack
                  alignItems="center"
                  w="full"
                  justifyContent="space-between"
                  flex={1}
                >
                  <Text fontSize="sm" fontWeight="bold">
                    Change Password:
                  </Text>
                  <IconButton
                    onPress={openChangePasswordModal}
                    icon={<Icon as={AntDesign} name="edit" />}
                  />
                </HStack>
              </BorderedCenter>
            </Center>
          </ScrollView>
        </Box>
      </Center>
    </AppContainer>
  );
}

const BorderedCenter = ({ children, ...props }) => {
  return (
    <Center
      borderBottomWidth={1}
      borderBottomColor="gray.300"
      w="full"
      {...props}
      py="2"
    >
      {children}
    </Center>
  );
};
