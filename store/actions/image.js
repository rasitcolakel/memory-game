import { API, graphqlOperation } from "aws-amplify";
import { uiActions } from "../slices/ui";
import store from "../index";
import { listImages } from "../../src/graphql/queries";
import { contentsActions } from "../slices/contents";
import { openDatabase } from "../database";
import { insertImage } from "../database/images";
const db = openDatabase();
export const getImages = (reset) => {
  return async (dispatch) => {
    if (reset) {
      await dispatch(contentsActions.resetImages());
    }
    dispatch(uiActions.setLoading({ loading: true }));
    dispatch(uiActions.closeToast());
    const { nextToken } = store.getState().contents.images;
    dispatch(
      contentsActions.setImageLoading({
        loading: true,
      })
    );
    try {
      let variables = {
        limit: 50,
      };
      if (nextToken) {
        variables.nextToken = nextToken;
      }

      const query = await API.graphql(graphqlOperation(listImages, variables));
      query.data.listImages?.items.forEach((item) => {
        insertImage(db, item.url);
      });
      await dispatch(
        contentsActions.setImages({
          data: query.data.listImages?.items,
          nextToken: query.data.listImages.nextToken,
        })
      );
    } catch (e) {
      console.log(e);
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
      contentsActions.setImageLoading({
        loading: false,
      })
    );
    dispatch(uiActions.setLoading({ loading: false }));
  };
};
