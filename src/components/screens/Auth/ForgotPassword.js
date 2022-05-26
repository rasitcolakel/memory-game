import React from "react";
import { Button, Heading } from "native-base";
import AuthCard from "../../UI/Auth/AuthCard";
import { useForm } from "react-hook-form";
import CustomInput from "../../UI/CustomInput";
import { forgotPassword, login } from "../../../../store/actions/auth";
import { useDispatch } from "react-redux";

export default function ForgotPassword({ navigation }) {
  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
    },
  });
  const loginPressed = async (data) => {
    dispatch(forgotPassword(data, navigation));
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
