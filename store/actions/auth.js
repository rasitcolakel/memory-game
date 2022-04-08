import { Auth } from "aws-amplify";
import { authActions } from "../slices/auth";
import { uiActions } from "../slices/ui";

export const login = (params) => {
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
          email,
          username,
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
      await Auth.confirmSignUp(params.username, params.code);
      navigation.navigate("Login");
      dispatch(
        uiActions.showToast({
          toast: {
            title: "Success",
            status: "success",
            description: "Your account has been created. Please login.",
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
      await Auth.signOut();
      dispatch(authActions.signOut());
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
