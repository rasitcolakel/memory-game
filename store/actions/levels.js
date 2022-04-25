import { Auth, API, graphqlOperation } from "aws-amplify";
import { uiActions } from "../slices/ui";
import store from "../index";
import {
  createLevels,
  deleteLevels,
  updateLevels,
} from "../../src/graphql/mutations";
import { searchLevels } from "../../src/graphql/queries";
import { contentsActions } from "../slices/contents";
export const getLevels = (reset) => {
  return async (dispatch) => {
    if (reset) {
      await dispatch(contentsActions.resetLevels());
    }
    dispatch(uiActions.setLoading({ loading: true }));
    dispatch(uiActions.closeToast());
    const { nextToken } = store.getState().contents.levels;
    dispatch(
      contentsActions.setLevelLoading({
        loading: true,
      })
    );
    try {
      let variables = {
        limit: 20,
        sort: { direction: "asc", field: "number" },
      };
      if (nextToken) {
        variables.nextToken = nextToken;
      }
      const query = await API.graphql(
        graphqlOperation(searchLevels, variables)
      );
      let data = await query.data.searchLevels.items.map((item) => {
        let gameRules = {
          ...JSON.parse(item.gameRules),
        };
        delete item.gameRules;
        let newItem = { ...gameRules, ...item };
        return newItem;
      });
      dispatch(
        contentsActions.setLevels({
          data: data,
          nextToken: query.data.searchLevels.nextToken,
          total: query.data.searchLevels.total,
        })
      );
    } catch (e) {
      await dispatch(
        uiActions.showToast({
          toast: {
            title: "Error",
            status: "error",
            description: e.message,
          },
        })
      );
    }
    dispatch(
      contentsActions.setLevelLoading({
        loading: false,
      })
    );
    dispatch(uiActions.setLoading({ loading: false }));
  };
};

export const createLevel = (data, reset) => {
  return async (dispatch) => {
    dispatch(uiActions.setLoading({ loading: true }));
    try {
      const { user } = store.getState().auth;
      let input = {
        number: data.number,
        userID: user.sub,
      };
      delete data.number;
      input.gameRules = JSON.stringify(data);
      const newLevel = await API.graphql(
        graphqlOperation(createLevels, {
          input,
        })
      );
      let gameRules = JSON.parse(await newLevel.data.createLevels?.gameRules);
      let newItem = { ...newLevel.data.createLevels, ...gameRules };
      delete newItem?.gameRules;
      dispatch(
        contentsActions.addLevel({
          level: newItem,
        })
      );
      dispatch(contentsActions.hideLevelModal());
      dispatch(uiActions.closeToast());
      if (typeof reset === "function") reset();
    } catch (e) {
      await dispatch(
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

export const updateLevel = (data, selected, reset) => {
  return async (dispatch) => {
    dispatch(uiActions.setLoading({ loading: true }));
    try {
      const { user } = store.getState().auth;
      let input = {
        id: data.id,
        number: data.number,
        userID: user.sub,
      };
      delete data.number;
      input.gameRules = JSON.stringify({
        images: data.images,
        seconds: data.seconds,
        for1Stars: data.for1Stars,
        for2Stars: data.for2Stars,
        for3Stars: data.for3Stars,
      });

      const updatedLevel = await API.graphql({
        query: updateLevels,
        variables: {
          input,
        },
      });

      await dispatch(
        contentsActions.updateLevel({
          level: updatedLevel.data.updateLevels,
        })
      );
      dispatch(contentsActions.hideLevelModal());
      dispatch(uiActions.closeToast());
      if (typeof reset === "function") reset();
    } catch (e) {
      await dispatch(
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

export const deleteLevel = (id, callback) => {
  return async (dispatch) => {
    dispatch(uiActions.setLoading({ loading: true }));
    try {
      const { levels } = store.getState().contents;
      const level = levels.data.find((item) => item.id === id);
      await API.graphql({
        query: deleteLevels,
        variables: {
          input: { id },
        },
      });
      dispatch(contentsActions.deleteLevel({ id }));
      dispatch(uiActions.closeToast());
      callback();
    } catch (e) {
      await dispatch(
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
