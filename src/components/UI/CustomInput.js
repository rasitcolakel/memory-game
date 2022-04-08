import {
  FormControl,
  Input,
  Text,
  View,
  WarningOutlineIcon,
} from "native-base";
import { Controller } from "react-hook-form";
import React from "react";

export default function CustomInput(props) {
  return (
    <Controller
      control={props.control}
      name={props.name}
      rules={props.rules}
      render={({ field: { onChange, onBlur, value } }) => (
        <FormControl>
          <Input
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            my="2"
            {...props.inputProps}
          />
          {props?.errors?.type && (
            <View
              _text={{ color: "res" }}
              flexDirection="row"
              alignItems="center"
            >
              <WarningOutlineIcon size="xs" color="red.600" />
              <Text fontSize="xs" color="red.600" px="2">
                {props.errors?.messages[props.errors.type] || "Error"}
              </Text>
            </View>
          )}
        </FormControl>
      )}
    />
  );
}
