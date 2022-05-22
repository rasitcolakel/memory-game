import React from "react";
import { Button, Modal } from "native-base";
import { useDispatch, useSelector } from "react-redux";
import {
  changeUserPassword,
  resetChangePasswordState,
} from "../../../../store/actions/auth";
import { useForm } from "react-hook-form";
import CustomInput from "../CustomInput";

export const ChangePassword = () => {
  const { changePassword } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const closeModal = () => {
    dispatch(resetChangePasswordState());
  };

  const {
    register,
    watch,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });
  const submit = async (data) => {
    console.log(data);
    dispatch(changeUserPassword(data));
  };
  return (
    <Modal isOpen={changePassword.visible} onClose={closeModal}>
      <Modal.Content maxWidth="400px" maxHeight="90%">
        <Modal.CloseButton />
        <Modal.Header>Change Password</Modal.Header>
        <Modal.Body>
          <CustomInput
            control={control}
            inputProps={{
              placeholder: "Old Password",
              autoCapitalize: "none",
              type: "password",
            }}
            name="oldPassword"
            rules={{
              required: true,
            }}
            errors={{
              type: errors?.oldPassword?.type,
              messages: {
                required: "This field is required",
              },
            }}
          />
          <CustomInput
            control={control}
            inputProps={{
              placeholder: "New Password",
              autoCapitalize: "none",
              type: "password",
            }}
            name="newPassword"
            rules={{
              required: true,
            }}
            errors={{
              type: errors?.newPassword?.type,
              messages: {
                required: "This field is required",
              },
            }}
          />
          <CustomInput
            control={control}
            inputProps={{
              placeholder: "Confirm New Password",
              autoCapitalize: "none",
              type: "password",
            }}
            name="confirmNewPassword"
            rules={{
              required: true,
            }}
            errors={{
              type: errors?.confirmNewPassword?.type,
              messages: {
                required: "This field is required",
                validate: "The passwords do not match",
              },
            }}
            {...register("confirmNewPassword", {
              required: true,
              validate: (val) => {
                if (watch("newPassword") != val) {
                  return "Your passwords do no match";
                }
              },
            })}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button.Group space={2}>
            <Button variant="ghost" colorScheme="blueGray" onPress={closeModal}>
              Cancel
            </Button>
            <Button onPress={handleSubmit(submit)}>Save</Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};
