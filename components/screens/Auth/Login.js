import React from "react";
import { Button, Heading, Input } from "native-base";
import AuthCard from "../../UI/Auth/AuthCard";

export default function Login({ navigation }) {
  return (
    <AuthCard>
      <Heading alignSelf="center" py="5" pb="7">
        Log In
      </Heading>
      <Input
        placeholder="E-mail Adress"
        mb="2"
        type="text"
        keyboardType="email-address"
      />
      <Input placeholder="Password" mb="2" type="password" />
      <Button
        variant="unstyled"
        alignSelf="flex-end"
        p="0"
        m="0"
        py="1"
        pb="2"
        _text={{
          color: "gray.400",
        }}
        onPress={() => navigation.navigate("Home")}
        size="sm"
      >
        Forgot Password?
      </Button>
      <Button>Sign</Button>
      <Button
        variant="link"
        onPress={() => navigation.navigate("SignUp")}
        mt="4"
      >
        Do not have an account? Create one
      </Button>
    </AuthCard>
  );
}
