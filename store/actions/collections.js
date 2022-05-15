import { API, graphqlOperation } from "aws-amplify";
import { uiActions } from "../slices/ui";
import store from "../index";
import { listCollections } from "../../src/customGraphql/index";
import { contentsActions } from "../slices/contents";
import { insertImage } from "../database/images";
import { openDatabase } from "../database";
import { completedCollectionByUser } from "../../src/graphql/queries";
import {
  clearCompletedCollections,
  getCompletedCollectionsFromDB,
  insertCompletedCollection,
} from "../database/completedCollections";
const db = openDatabase();

export const getCollections = (reset) => {
  return async (dispatch) => {
    if (reset) {
      await dispatch(contentsActions.resetCollections());
    }
    await dispatch(uiActions.setLoading({ loading: true }));
    await dispatch(uiActions.closeToast());
    const { nextToken } = store.getState().contents.collections;
    await dispatch(
      contentsActions.setCollectionLoading({
        loading: true,
      })
    );
    try {
      let variables = {
        limit: 20,
      };
      if (nextToken) {
        variables.nextToken = nextToken;
      }
      const query = await API.graphql(
        graphqlOperation(listCollections, variables)
      );

      query.data.listCollections?.items.forEach((item) => {
        item.images?.items.forEach((image) => {
          insertImage(db, image.image.url);
        });
      });

      dispatch(
        contentsActions.setCollections({
          data: query.data.listCollections.items,
          nextToken: query.data.listCollections.nextToken,
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
      contentsActions.setCollectionLoading({
        loading: false,
      })
    );
    dispatch(uiActions.setLoading({ loading: false }));
  };
};

export const getCompletedCollections = () => {
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
        graphqlOperation(completedCollectionByUser, variables)
      );
      clearCompletedCollections(db);
      await query.data.completedCollectionByUser.items.map((item) => {
        insertCompletedCollection(db, item);
      });
      let results = await getCompletedCollectionsFromDB(db);
      await dispatch(
        contentsActions.setCompletedCollections({
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
