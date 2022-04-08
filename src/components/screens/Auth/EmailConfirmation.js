import React from "react";
import { Button, Heading, Text } from "native-base";
import AuthCard from "../../UI/Auth/AuthCard";
import { useForm } from "react-hook-form";
import CustomInput from "../../UI/CustomInput";
import { confirmSignUp, resendSignUp } from "../../../../store/actions/auth";
import { useDispatch } from "react-redux";
import { useRoute } from "@react-navigation/native";

export default function Login({ navigation }) {
  const route = useRoute();
  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: route?.params?.username,
      code: "",
    },
  });
  const confirmPressed = async (data) => {
    dispatch(confirmSignUp(data, navigation));
  };
  const resendPressed = async () => {
    dispatch(resendSignUp({ username: route?.params?.username }));
  };

  return (
    <AuthCard>
      <Heading alignSelf="center" py="5" pb="7">
        Confirm Your Email
      </Heading>
      <Text>
        We sent you an email with a confirmation code. Please enter the code
      </Text>
      <CustomInput
        control={control}
        inputProps={{
          placeholder: "E-mail Adress",
          isDisabled: true,
        }}
        name="username"
        rules={{
          required: true,
        }}
        errors={{
          type: errors?.username?.type,
          messages: {
            required: "This field is required",
          },
        }}
      />
      <CustomInput
        control={control}
        inputProps={{
          placeholder: "Verification Code",
        }}
        name="code"
        rules={{
          required: true,
        }}
        errors={{
          type: errors?.code?.type,
          messages: {
            required: "This field is required",
          },
        }}
      />

      <Button onPress={handleSubmit(confirmPressed)} my="2">
        Confirm
      </Button>
      <Button onPress={resendPressed} my="2" variant="outline">
        Resend Code
      </Button>
    </AuthCard>
  );
}
