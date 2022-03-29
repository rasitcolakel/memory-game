import React from "react";
import { Button, Heading, Input } from "native-base";
import AuthCard from "../../UI/Auth/AuthCard";

export default function SignUp({ navigation }) {
  return (
    <AuthCard>
      <Heading
        alignSelf="center"
        py="5"
        pb="7"
        _text={{
          color: "gray.400",
        }}
      >
        Create An Account
      </Heading>

      <Input placeholder="Full Name" mb="2" />
      <Input placeholder="E-mail Adress" mb="2" />
      <Input placeholder="Password" mb="2" type="password" />
      <Input placeholder="Confirm Password" mb="2" type="password" />
      <Button>Login</Button>
      <Button
        variant="link"
        onPress={() => navigation.navigate("Login")}
        mt="4"
      >
        Do you have an account? Login
      </Button>
    </AuthCard>
  );
}
