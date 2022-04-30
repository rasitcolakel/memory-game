import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  collections: {
    data: null,
    page: 0,
    modal: {
      visible: false,
      mode: null,
      collection: null,
    },
    loading: false,
    nextToken: null,
  },
  users: {
    data: null,
    page: 0,
    modal: {
      visible: false,
      mode: null,
      collection: null,
    },
    loading: false,
    nextToken: null,
  },
  images: {
    data: null,
    page: 0,
    uploading: {
      visible: false,
      value: 0,
      isFinished: false,
    },
    modal: {
      visible: false,
      mode: null,
      collection: null,
    },
    loading: false,
    nextToken: null,
  },
  levels: {
    data: null,
    page: 0,
    modal: {
      visible: false,
      mode: null,
      level: null,
    },
    loading: false,
    nextToken: null,
    total: 0,
  },
};

const slice = createSlice({
  name: "contents",
  initialState: initialState,
  reducers: {
    // Collection Reducers
    showCollectionModal(state, action) {
      state.collections.modal = {
        ...state.collections.modal,
        ...action.payload.modal,
      };
    },
    hideCollectionModal(state, action) {
      state.collections.modal = { ...initialState.collections.modal };
    },
    resetCollections(state) {
      state.collections = {
        ...initialState.collections,
      };
    },
    setCollections(state, actions) {
      state.collections.nextToken = actions.payload.nextToken;
      if (state.collections.data === null) {
        state.collections.data = actions.payload.data;
        return;
      }
      state.collections.data = [
        ...state.collections.data,
        ...actions.payload.data,
      ];
    },
    addCollection(state, actions) {
      if (state.collections.data === null) state.collections.data = [];
      state.collections.data.push(actions.payload.collection);
    },
    updateCollection(state, actions) {
      state.collections.data = state.collections.data.map((collection) => {
        if (collection.id === actions.payload.collection.id) {
          return actions.payload.collection;
        }
        return collection;
      });
    },
    deleteCollection(state, actions) {
      state.collections.data = state.collections.data.filter(
        (collection) => collection.id !== actions.payload.id
      );
    },
    setCollectionLoading(state, actions) {
      state.collections.loading = actions.payload.loading;
    },
    // Images Reducers
    showImageModal(state, action) {
      state.images.modal = {
        ...state.images.modal,
        ...action.payload.modal,
      };
    },
    hideImageModal(state, action) {
      state.images.modal = { ...initialState.images.modal };
    },
    resetImages(state) {
      state.images = {
        ...initialState.images,
      };
    },
    setImages(state, actions) {
      state.images.nextToken = actions.payload.nextToken;
      if (state.images.data === null) {
        state.images.data = actions.payload.data;
        return;
      }
      state.images.data = [...state.images.data, ...actions.payload.data];
    },
    addImage(state, actions) {
      if (state.images.data === null) state.images.data = [];
      state.images.data.push(actions.payload.collection);
    },
    updateImage(state, actions) {
      state.images.data = state.images.data.map((collection) => {
        if (collection.id === actions.payload.collection.id) {
          return actions.payload.collection;
        }
        return collection;
      });
    },
    deleteImage(state, actions) {
      state.images.data = state.images.data.filter(
        (collection) => collection.id !== actions.payload.id
      );
    },
    setImageUploading(state, actions) {
      state.images.uploading = {
        ...state.images.uploading,
        ...actions.payload.uploading,
      };
    },
    resetImageUploading(state, actions) {
      state.images.uploading = { ...initialState.images.uploading };
    },
    setImageLoading(state, actions) {
      state.images.loading = actions.payload.loading;
    },
    // User Reducers
    showUserModal(state, action) {
      state.users.modal = {
        ...state.users.modal,
        ...action.payload.modal,
      };
    },
    hideUserModal(state, action) {
      state.users.modal = { ...initialState.users.modal };
    },
    resetUsers(state) {
      state.users = {
        ...initialState.users,
      };
    },
    setUsers(state, actions) {
      state.users.nextToken = actions.payload.nextToken;
      if (state.users.data === null) {
        state.users.data = actions.payload.data;
        return;
      }
      state.users.data = [...state.users.data, ...actions.payload.data];
    },
    setUserLoading(state, actions) {
      state.users.loading = actions.payload.loading;
    },
    // Level Reducers
    showLevelModal(state, action) {
      state.levels.modal = {
        ...state.levels.modal,
        ...action.payload.modal,
      };
    },
    hideLevelModal(state, action) {
      state.levels.modal = { ...initialState.levels.modal };
    },
    resetLevels(state) {
      state.levels = {
        ...initialState.levels,
      };
    },
    setLevels(state, actions) {
      state.levels.nextToken = actions.payload.nextToken;
      state.levels.total = actions.payload.total;
      if (state.levels.data === null) {
        state.levels.data = actions.payload.data;
        return;
      }
      state.levels.data = [...state.levels.data, ...actions.payload.data];
    },
    addLevel(state, actions) {
      if (state.levels.data === null) state.levels.data = [];
      state.levels.data.push(actions.payload.level);
    },
    updateLevel(state, actions) {
      state.levels.data = state.levels.data.map((level) => {
        if (level.id === actions.payload.level.id) {
          let gameRules = JSON.parse(actions.payload.level?.gameRules);
          let newItem = { ...actions.payload.level, ...gameRules };
          delete newItem?.gameRules;
          return newItem;
        }
        return level;
      });
    },
    deleteLevel(state, actions) {
      state.levels.data = state.levels.data.filter(
        (level) => level.id !== actions.payload.id
      );
    },
    setLevelLoading(state, actions) {
      state.levels.loading = actions.payload.loading;
    },
    setCompletedLevels(state, actions) {
      if (state.levels.data === null) state.levels.data = [];
      state.levels.data = state.levels.data.map(level => {
        let find = actions.payload.data.find(item => item.level_id === level.id);
        if (find) {
          level.completed = { ...find };
        } else {
          level.completed = null;
        }
        return level;
      });

    },
  },
});

export const contentsReducer = slice.reducer;
export const contentsActions = slice.actions;
