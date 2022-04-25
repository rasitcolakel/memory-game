import React from "react";
import { Button, Heading } from "native-base";
import AuthCard from "../../UI/Auth/AuthCard";
import { useForm } from "react-hook-form";
import CustomInput from "../../UI/CustomInput";
import { register } from "../../../../store/actions/auth";
import { useDispatch } from "react-redux";

export default function Login({ navigation }) {
  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "rast",
      email: "rasitcolakel@hotmail.com",
      username: "raseke",
      password: "12345678",
      confirmPassword: "12345678",
    },
  });
  const signInPressed = (data) => {
    dispatch(register(data, navigation));
  };

  return (
    <AuthCard>
      <Heading alignSelf="center" py="5" pb="7">
        Sign Ip
      </Heading>
      <CustomInput
        control={control}
        inputProps={{
          placeholder: "Full Name",
          autoCapitalize: "none",
        }}
        name="name"
        rules={{
          required: true,
        }}
        errors={{
          type: errors?.name?.type,
          messages: {
            required: "This field is required",
          },
        }}
      />
      <CustomInput
        control={control}
        inputProps={{
          placeholder: "E-mail Adress",
          type: "email",
          autoCapitalize: "none",
        }}
        name="email"
        rules={{
          required: true,
        }}
        errors={{
          type: errors?.email?.type,
          messages: {
            required: "This field is required",
          },
        }}
      />
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
      <Button onPress={handleSubmit(signInPressed)} my="2">
        Register
      </Button>
      <Button
        variant="link"
        onPress={() => navigation.navigate("Login")}
        my="2"
      >
        Do you have an account? Sign In
      </Button>
    </AuthCard>
  );
}
