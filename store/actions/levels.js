import { Auth, API, graphqlOperation } from "aws-amplify";
import { uiActions } from "../slices/ui";
import store from "../index";
import {
  completedLevelByUser,
  listCompletedLevels,
  searchLevels,
} from "../../src/graphql/queries";
import { contentsActions } from "../slices/contents";
import {
  clearCompletedLevels,
  getCompletedLevelsFromDB,
  insertCompletedLevel,
} from "../database/completedLevels";
import { openDatabase } from "../database";
const db = openDatabase();
export const getLevels = (reset) => {
  return async (dispatch) => {
    try {
      if (reset) {
        await dispatch(contentsActions.resetLevels());
      }
      await dispatch(uiActions.setLoading({ loading: true }));
      await dispatch(uiActions.closeToast());
      const { nextToken } = store.getState().contents.levels;
      await dispatch(
        contentsActions.setLevelLoading({
          loading: true,
        })
      );
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
      await dispatch(
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
    await dispatch(
      contentsActions.setLevelLoading({
        loading: false,
      })
    );
    await dispatch(uiActions.setLoading({ loading: false }));
  };
};

export const getCompletedLevels = () => {
  return async (dispatch) => {
    dispatch(uiActions.setLoading({ loading: true }));
    dispatch(uiActions.closeToast());
    try {
      const { user } = store.getState().auth;
      let variables = {
        limit: 150,
        userID: user.sub,
      };
      const query = await API.graphql(
        graphqlOperation(completedLevelByUser, variables)
      );
      clearCompletedLevels(db);
      await query.data.completedLevelByUser.items.map((item) => {
        insertCompletedLevel(db, item);
      });
      let results = await getCompletedLevelsFromDB(db);
      await dispatch(
        contentsActions.setCompletedLevels({
          data: results,
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
    dispatch(uiActions.setLoading({ loading: false }));
  };
};
