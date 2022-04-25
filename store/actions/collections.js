import { Auth, API, graphqlOperation } from "aws-amplify";
import { uiActions } from "../slices/ui";
import store from "../index";
import {
  createCollections,
  deleteCollections,
  deleteImageCollections,
  updateCollections,
} from "../../graphql/mutations";
import {
  createImageCollections,
  listCollections,
} from "../../customGraphql/index";
import { contentsActions } from "../slices/contents";
export const getCollections = (reset) => {
  return async (dispatch) => {
    if (reset) {
      await dispatch(contentsActions.resetCollections());
    }
    dispatch(uiActions.setLoading({ loading: true }));
    dispatch(uiActions.closeToast());
    const { nextToken } = store.getState().contents.collections;
    dispatch(
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

export const createCollection = (data, reset) => {
  return async (dispatch) => {
    dispatch(uiActions.setLoading({ loading: true }));
    try {
      const { user } = store.getState().auth;
      const newCollection = await API.graphql({
        query: createCollections,
        variables: { input: { title: data.title, userID: user.sub } },
      });
      dispatch(
        contentsActions.addCollection({
          collection: newCollection.data.createCollections,
        })
      );
      dispatch(contentsActions.hideCollectionModal());
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
const updateCollectionResources = async (data, selected) => {
  let oldImages =
    data.images.items.length > 0
      ? data.images.items.map((item) => {
          return { id: item.id, imageID: item.image.id };
        })
      : [];

  let deletedImages = oldImages.filter(
    (item) => !selected.includes(item.imageID)
  );
  let newImages = selected.filter(
    (item) => !oldImages.filter((oldItem) => oldItem.imageID === item).length
  );
  newImages?.length > 0 &&
    newImages.map(async (imageID) => {
      await API.graphql({
        query: createImageCollections,
        variables: {
          input: { collectionsID: data.id, imageID: imageID },
        },
      });
    });
  deletedImages?.length &&
    deletedImages.map(async (item) => {
      await API.graphql({
        query: deleteImageCollections,
        variables: {
          input: { id: item.id },
        },
      });
    });
};
export const updateCollection = (data, selected, reset) => {
  return async (dispatch) => {
    dispatch(uiActions.setLoading({ loading: true }));
    try {
      updateCollectionResources(data, selected).then(async () => {
        const { user } = store.getState().auth;
        const updatedCollection = await API.graphql({
          query: updateCollections,
          variables: {
            input: { id: data.id, title: data.title, userID: user.sub },
          },
        });
        await dispatch(
          contentsActions.updateCollection({
            collection: updatedCollection.data.updateCollections,
          })
        );
        dispatch(contentsActions.hideCollectionModal());
        dispatch(uiActions.closeToast());
        if (typeof reset === "function") reset();
      });
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
const unlinkAllImagesFromCollection = async (data) => {
  const links = data?.images?.items;
  links &&
    links.map(async (link) => {
      await API.graphql({
        query: deleteImageCollections,
        variables: { input: { id: link.id } },
      });
    });
};
export const deleteCollection = (id, callback) => {
  return async (dispatch) => {
    dispatch(uiActions.setLoading({ loading: true }));
    try {
      const { collections } = store.getState().contents;
      const collection = collections.data.find((item) => item.id === id);
      console.log("collection", collection);
      unlinkAllImagesFromCollection(collection)
        .then(async () => {
          await API.graphql({
            query: deleteCollections,
            variables: {
              input: { id },
            },
          });
        })
        .catch((e) => {
          console.log(e);
        });

      dispatch(contentsActions.deleteCollection({ id }));
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
