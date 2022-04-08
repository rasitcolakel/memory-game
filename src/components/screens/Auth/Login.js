import React from "react";
import { Button, Heading } from "native-base";
import AuthCard from "../../UI/Auth/AuthCard";
import { useForm } from "react-hook-form";
import CustomInput from "../../UI/CustomInput";
import { login } from "../../../../store/actions/auth";
import { useDispatch } from "react-redux";

export default function Login({ navigation }) {
  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const loginPressed = async (data) => {
    dispatch(login(data));
  };

  return (
    <AuthCard>
      <Heading alignSelf="center" py="5" pb="7">
        Log In
      </Heading>
      <CustomInput
        control={control}
        inputProps={{
          placeholder: "Username",
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
          placeholder: "Password",
          type: "password",
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
      <Button
        variant="unstyled"
        alignSelf="flex-end"
        _text={{
          color: "gray.400",
        }}
        px="0"
        onPress={() => navigation.navigate("Home")}
        size="sm"
      >
        Forgot Password?
      </Button>
      <Button onPress={handleSubmit(loginPressed)} my="2">
        Login
      </Button>
      <Button
        variant="link"
        onPress={() => navigation.navigate("SignUp")}
        my="2"
      >
        Do not have an account? Create one
      </Button>
    </AuthCard>
  );
}
