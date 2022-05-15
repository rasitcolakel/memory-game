import React from "react";
import { useDispatch, useSelector } from "react-redux";
import AppContainer from "../UI/AppContainer";
import {
  Avatar,
  Box,
  Center,
  HStack,
  Icon,
  ScrollView,
  Switch,
  Text,
  VStack,
} from "native-base";
import {
  getUserFromDB,
  resetPushToken,
  setPushToken,
} from "../../../store/actions/auth";
import { Alert } from "react-native";

export default function Profile() {
  const { user, pushToken } = useSelector((state) => state.auth);
  const { userDetails } = user;
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getUserFromDB());
  }, []);
  console.log("userDetails", pushToken, userDetails);
  return (
    <AppContainer>
      <Center w="full" flex={1}>
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
