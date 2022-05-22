import React from "react";
import { Button, Modal } from "native-base";
import { useDispatch, useSelector } from "react-redux";
import {
  editProfileAction,
  resetEditProfileState,
} from "../../../../store/actions/auth";
import { useForm } from "react-hook-form";
import CustomInput from "../CustomInput";

export const EditProfile = () => {
  const { user } = useSelector((state) => state.auth);
  const { userDetails } = user;
  const { editProfile } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const closeModal = () => {
    dispatch(resetEditProfileState());
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: userDetails?.name,
    },
  });
  const submit = async (data) => {
    console.log(data);
    dispatch(editProfileAction(data));
  };
  return (
    <Modal isOpen={editProfile.visible} onClose={closeModal}>
      <Modal.Content maxWidth="400px" maxHeight="90%">
        <Modal.CloseButton />
        <Modal.Header>Change Password</Modal.Header>
        <Modal.Body>
          <CustomInput
            control={control}
            inputProps={{
              placeholder: "Full Name",
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
