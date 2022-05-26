import React from "react";
import { Button, Heading } from "native-base";
import AuthCard from "../../UI/Auth/AuthCard";
import { useForm } from "react-hook-form";
import CustomInput from "../../UI/CustomInput";
import { forgotPasswordSubmit } from "../../../../store/actions/auth";
import { useDispatch } from "react-redux";
import { useRoute } from "@react-navigation/native";

export default function ForgotPasswordSubmit({ navigation }) {
  const dispatch = useDispatch();
  const route = useRoute();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: route?.params?.username,
      code: "",
      password: "",
      confirmPassword: "",
    },
  });
  const loginPressed = async (data) => {
    dispatch(forgotPasswordSubmit(data, navigation));
  };

  return (
    <AuthCard>
      <Heading alignSelf="center" py="5" pb="7">
        Reset Password
      </Heading>
      <CustomInput
        control={control}
        inputProps={{
          placeholder: "Username",
          autoCapitalize: "none",
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
          autoCapitalize: "none",
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
      <CustomInput
        control={control}
        inputProps={{
          placeholder: "Password",
          type: "password",
          autoCapitalize: "none",
        }}
        name="password"
        rules={{
          required: true,
        }}
        errors={{
          type: errors?.password?.type,
          messages: {
            required: "This field is required",
          },
        }}
      />
      <CustomInput
        control={control}
        inputProps={{
          placeholder: "Confirm Password",
          type: "password",
          autoCapitalize: "none",
        }}
        name="confirmPassword"
        rules={{
          required: true,
        }}
        errors={{
          type: errors?.confirmPassword?.type,
          messages: {
            required: "This field is required",
          },
        }}
      />
      <Button onPress={handleSubmit(loginPressed)} my="2">
        Reset
      </Button>
      <Button
        variant="link"
        onPress={() => navigation.navigate("Login")}
        my="2"
      >
        Back to Login
      </Button>
    </AuthCard>
  );
}
