import { Auth, API, graphqlOperation } from "aws-amplify";
import { authActions } from "../slices/auth";
import { uiActions } from "../slices/ui";
import { getPushToken, getUser } from "../../src/graphql/queries";
import {
  createPushToken,
  createUser,
  deletePushToken,
  updatePushToken,
  updateUser,
} from "../../src/graphql/mutations";
import jwtDecode from "jwt-decode";
import store from "../index";
export const login = (params, navigation) => {
  return async (dispatch) => {
    dispatch(uiActions.setLoading({ loading: true }));
    try {
      dispatch(uiActions.closeToast());
      const response = await Auth.signIn(params.username, params.password);

      if (response) {
        const currentUser = await Auth.currentAuthenticatedUser();
        if (currentUser)
          dispatch(
            authActions.login({
              token: currentUser.signInUserSession.idToken.jwtToken,
            })
          );
      }
    } catch (e) {
      if (e.message === "User is not confirmed.") {
        navigation.navigate("EmailConfirmation", {
          username: params.username,
          password: params.password,
        });
      }
      dispatch(
        uiActions.showToast({
          toast: {
            title: "Error",
            status: "error",
            description: e.message,
          },
        })
      );
    }
    dispatch(uiActions.setLoading({ loading: false }));
  };
};

export const register = (params, navigation) => {
  return async (dispatch) => {
    dispatch(uiActions.setLoading({ loading: true }));
    try {
      let { username, password, email, name } = params;
      const { user } = await Auth.signUp({
        username,
        password,
        attributes: {
          email,
          name,
          preferred_username: username,
        },
      });
      if (user !== null) {
        navigation.navigate("EmailConfirmation", {
          username,
          password,
        });
      }
    } catch (e) {
      dispatch(
        uiActions.showToast({
          toast: {
            title: "Error",
            status: "error",
            description: e.message,
          },
        })
      );
    }
    dispatch(uiActions.setLoading({ loading: false }));
  };
};

export const confirmSignUp = (params, navigation) => {
  return async (dispatch) => {
    dispatch(uiActions.setLoading({ loading: true }));
    try {
      let confirm = await Auth.confirmSignUp(params.username, params.code);
      if (confirm) {
        const response = await Auth.signIn(params.username, params.password);
        if (response) {
          const currentUser = await Auth.currentAuthenticatedUser();
          if (currentUser) {
            let user = jwtDecode(
              currentUser.signInUserSession.idToken.jwtToken
            );
            let input = {
              name: user.name,
              email: user.email,
              username: user["cognito:username"],
              id: user.sub,
            };
            await API.graphql(
              graphqlOperation(createUser, {
                input,
              })
            );
            dispatch(
              authActions.login({
                token: currentUser.signInUserSession.idToken.jwtToken,
              })
            );
          }
        }
      }
    } catch (e) {
      dispatch(
        uiActions.showToast({
          toast: {
            title: "Error",
            status: "error",
            description: e.message,
          },
        })
      );
    }
    dispatch(uiActions.setLoading({ loading: false }));
  };
};

export const resendSignUp = (params) => {
  return async (dispatch) => {
    dispatch(uiActions.setLoading({ loading: true }));
    try {
      await Auth.resendSignUp(params.username);
      dispatch(
        uiActions.showToast({
          toast: {
            title: "Success",
            status: "success",
            description: "A confirmation code has been sent to your email.",
          },
        })
      );
    } catch (e) {
      dispatch(
        uiActions.showToast({
          toast: {
            title: "Error",
            status: "error",
            description: e.message,
          },
        })
      );
    }
    dispatch(uiActions.setLoading({ loading: false }));
  };
};

export const signOut = () => {
  return async (dispatch) => {
    dispatch(uiActions.setLoading({ loading: true }));
    try {
      const { user, pushToken } = store.getState().auth;
      if (user && pushToken) {
        await API.graphql(
          graphqlOperation(deletePushToken, {
            input: {
              userID: user.sub,
            },
          })
        );
        await API.graphql(
          graphqlOperation(updateUser, {
            input: {
              id: user.sub,
              isNotificationsAccepted: false,
            },
          })
        );
      }
      await Auth.signOut();
      dispatch(authActions.signOut());
    } catch (e) {
      console.log("error", e);
      dispatch(
        uiActions.showToast({
          toast: {
            title: "Error",
            status: "error",
            description: e.message,
          },
        })
      );
    }
    dispatch(uiActions.setLoading({ loading: false }));
  };
};

export const setLoggedUser = () => {
  return async (dispatch) => {
    dispatch(uiActions.setLoading({ loading: true }));
    try {
      const { user } = store.getState().auth;
      if (user) return;
      const currentUser = await Auth.currentAuthenticatedUser();
      if (currentUser) {
        let decodedToken = jwtDecode(
          currentUser.signInUserSession.idToken.jwtToken
        );

        dispatch(
          authActions.login({
            token: currentUser.signInUserSession.idToken.jwtToken,
          })
        );

        let APIuser = await API.graphql({
          query: getPushToken,
          variables: {
            userID: decodedToken.sub,
          },
        });
        dispatch(
          authActions.setPushToken({
            pushToken: APIuser.data.getPushToken?.pushToken,
          })
        );
      }
    } catch (e) {
      console.log("erroreddd", e);
      dispatch(authActions.signOut());
    }
    dispatch(uiActions.setLoading({ loading: false }));
  };
};

export const setPushToken = (token) => {
  return async (dispatch) => {
    dispatch(uiActions.setLoading({ loading: true }));
    try {
      const { user } = store.getState().auth;
      let input = {
        userID: user.sub,
        pushToken: token,
      };
      let APIuser = await API.graphql({
        query: getPushToken,
        variables: {
          userID: user.sub,
        },
      });
      let pushToken = APIuser.data.getPushToken?.pushToken;
      if (pushToken) {
        if (pushToken !== token) {
          await API.graphql(
            graphqlOperation(updatePushToken, {
              input,
            })
          );
          await API.graphql(
            graphqlOperation(updateUser, {
              input: {
                id: user.sub,
                isNotificationsAccepted: true,
              },
            })
          );
        }
      } else {
        await API.graphql(
          graphqlOperation(createPushToken, {
            input,
          })
        );
        await API.graphql(
          graphqlOperation(updateUser, {
            input: {
              id: user.sub,
              isNotificationsAccepted: true,
            },
          })
        );
      }
      dispatch(authActions.setPushToken({ pushToken: token }));
      await dispatch(getUserFromDB());
    } catch (e) {
      console.log("error", e);
      dispatch(
        uiActions.showToast({
          toast: {
            title: "Error",
            status: "error",
            description: e.message,
          },
        })
      );
    }
    dispatch(uiActions.setLoading({ loading: false }));
  };
};

export const getUserFromDB = (id) => {
  return async (dispatch) => {
    dispatch(uiActions.setLoading({ loading: true }));
    try {
      const { user } = store.getState().auth;

      let APIuser = await API.graphql({
        query: getUser,
        variables: {
          id: user.sub,
        },
      });
      let userDetails = APIuser.data.getUser;
      dispatch(authActions.setUserDetails({ userDetails }));
    } catch (e) {
      console.log("error", e);
      dispatch(
        uiActions.showToast({
          toast: {
            title: "Error",
            status: "error",
            description: e.message,
          },
        })
      );
    }

    dispatch(uiActions.setLoading({ loading: false }));
  };
};

export const resetPushToken = () => {
  return async (dispatch) => {
    dispatch(uiActions.setLoading({ loading: true }));
    try {
      const { user } = store.getState().auth;
      await API.graphql(
        graphqlOperation(deletePushToken, {
          input: {
            userID: user.sub,
          },
        })
      );
      await API.graphql(
        graphqlOperation(updateUser, {
          input: {
            id: user.sub,
            isNotificationsAccepted: false,
          },
        })
      );
      await dispatch(getUserFromDB());
    } catch (e) {
      console.log("error", e);
      dispatch(
        uiActions.showToast({
          toast: {
            title: "Error",
            status: "error",
            description: e.message,
          },
        })
      );
    }
    dispatch(uiActions.setLoading({ loading: false }));
  };
};

export const changeUserPassword = ({ oldPassword, newPassword }) => {
  return async (dispatch) => {
    dispatch(uiActions.setLoading({ loading: true }));
    try {
      const currentUser = await Auth.currentAuthenticatedUser();
      if (currentUser) {
        await Auth.changePassword(currentUser, oldPassword, newPassword);
        await dispatch(resetChangePasswordState());
        // await dispatch(
        //   uiActions.showToast({
        //     toast: {
        //       title: "Success",
        //       status: "success",
        //       description: "Password changed successfully",
        //     },
        //   })
        // );
      }
    } catch (e) {
      console.log("error", e);
      dispatch(
        uiActions.showToast({
          toast: {
            title: "Error",
            status: "error",
            description: e.message,
          },
        })
      );
    }
    await dispatch(uiActions.setLoading({ loading: false }));
  };
};

export const resetChangePasswordState = () => {
  return async (dispatch) => {
    dispatch(authActions.resetChangePasswordState());
  };
};

export const setChangePasswordState = (state) => {
  return async (dispatch) => {
    dispatch(authActions.setChangePasswordState(state));
  };
};

export const editProfileAction = ({ name }) => {
  return async (dispatch) => {
    dispatch(uiActions.setLoading({ loading: true }));
    try {
      const currentUser = await Auth.currentAuthenticatedUser();
      if (currentUser) {
        await Auth.updateUserAttributes(currentUser, { name });

        const { user } = store.getState().auth;
        let input = {
          name,
          id: user.sub,
        };
        await API.graphql(
          graphqlOperation(updateUser, {
            input,
          })
        );
        await dispatch(resetEditProfileState());
        await dispatch(getUserFromDB());
        // await dispatch(
        //   uiActions.showToast({
        //     toast: {
        //       title: "Success",
        //       status: "success",
        //       description: "Profile edited successfully",
        //     },
        //   })
        // );
      }
    } catch (e) {
      console.log("error", e);
      dispatch(
        uiActions.showToast({
          toast: {
            title: "Error",
            status: "error",
            description: e.message,
          },
        })
      );
    }
    await dispatch(uiActions.setLoading({ loading: false }));
  };
};

export const resetEditProfileState = () => {
  return async (dispatch) => {
    dispatch(authActions.resetEditProfileState());
  };
};

export const setEditProfileState = (state) => {
  return async (dispatch) => {
    dispatch(authActions.setEditProfileState(state));
  };
};
