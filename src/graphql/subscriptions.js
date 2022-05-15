/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser($owner: String) {
    onCreateUser(owner: $owner) {
      id
      name
      email
      username
      isNotificationsAccepted
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser($owner: String) {
    onUpdateUser(owner: $owner) {
      id
      name
      email
      username
      isNotificationsAccepted
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser($owner: String) {
    onDeleteUser(owner: $owner) {
      id
      name
      email
      username
      isNotificationsAccepted
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onCreateNotifications = /* GraphQL */ `
  subscription OnCreateNotifications($owner: String) {
    onCreateNotifications(owner: $owner) {
      id
      senderID
      sender {
        id
        name
        email
        username
        isNotificationsAccepted
        createdAt
        updatedAt
        owner
      }
      receiverID
      receiver {
        id
        name
        email
        username
        isNotificationsAccepted
        createdAt
        updatedAt
        owner
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onUpdateNotifications = /* GraphQL */ `
  subscription OnUpdateNotifications($owner: String) {
    onUpdateNotifications(owner: $owner) {
      id
      senderID
      sender {
        id
        name
        email
        username
        isNotificationsAccepted
        createdAt
        updatedAt
        owner
      }
      receiverID
      receiver {
        id
        name
        email
        username
        isNotificationsAccepted
        createdAt
        updatedAt
        owner
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onDeleteNotifications = /* GraphQL */ `
  subscription OnDeleteNotifications($owner: String) {
    onDeleteNotifications(owner: $owner) {
      id
      senderID
      sender {
        id
        name
        email
        username
        isNotificationsAccepted
        createdAt
        updatedAt
        owner
      }
      receiverID
      receiver {
        id
        name
        email
        username
        isNotificationsAccepted
        createdAt
        updatedAt
        owner
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onCreateCollections = /* GraphQL */ `
  subscription OnCreateCollections {
    onCreateCollections {
      id
      title
      images {
        nextToken
      }
      userID
      user {
        id
        name
        email
        username
        isNotificationsAccepted
        createdAt
        updatedAt
        owner
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateCollections = /* GraphQL */ `
  subscription OnUpdateCollections {
    onUpdateCollections {
      id
      title
      images {
        nextToken
      }
      userID
      user {
        id
        name
        email
        username
        isNotificationsAccepted
        createdAt
        updatedAt
        owner
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteCollections = /* GraphQL */ `
  subscription OnDeleteCollections {
    onDeleteCollections {
      id
      title
      images {
        nextToken
      }
      userID
      user {
        id
        name
        email
        username
        isNotificationsAccepted
        createdAt
        updatedAt
        owner
      }
      createdAt
      updatedAt
    }
  }
`;
export const onCreateImage = /* GraphQL */ `
  subscription OnCreateImage {
    onCreateImage {
      id
      url
      collections {
        nextToken
      }
      userID
      user {
        id
        name
        email
        username
        isNotificationsAccepted
        createdAt
        updatedAt
        owner
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateImage = /* GraphQL */ `
  subscription OnUpdateImage {
    onUpdateImage {
      id
      url
      collections {
        nextToken
      }
      userID
      user {
        id
        name
        email
        username
        isNotificationsAccepted
        createdAt
        updatedAt
        owner
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteImage = /* GraphQL */ `
  subscription OnDeleteImage {
    onDeleteImage {
      id
      url
      collections {
        nextToken
      }
      userID
      user {
        id
        name
        email
        username
        isNotificationsAccepted
        createdAt
        updatedAt
        owner
      }
      createdAt
      updatedAt
    }
  }
`;
export const onCreateLevels = /* GraphQL */ `
  subscription OnCreateLevels {
    onCreateLevels {
      id
      number
      gameRules
      userID
      user {
        id
        name
        email
        username
        isNotificationsAccepted
        createdAt
        updatedAt
        owner
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateLevels = /* GraphQL */ `
  subscription OnUpdateLevels {
    onUpdateLevels {
      id
      number
      gameRules
      userID
      user {
        id
        name
        email
        username
        isNotificationsAccepted
        createdAt
        updatedAt
        owner
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteLevels = /* GraphQL */ `
  subscription OnDeleteLevels {
    onDeleteLevels {
      id
      number
      gameRules
      userID
      user {
        id
        name
        email
        username
        isNotificationsAccepted
        createdAt
        updatedAt
        owner
      }
      createdAt
      updatedAt
    }
  }
`;
export const onCreateCompletedLevels = /* GraphQL */ `
  subscription OnCreateCompletedLevels {
    onCreateCompletedLevels {
      id
      levelID
      level {
        id
        number
        gameRules
        userID
        createdAt
        updatedAt
      }
      userID
      user {
        id
        name
        email
        username
        isNotificationsAccepted
        createdAt
        updatedAt
        owner
      }
      rate
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateCompletedLevels = /* GraphQL */ `
  subscription OnUpdateCompletedLevels {
    onUpdateCompletedLevels {
      id
      levelID
      level {
        id
        number
        gameRules
        userID
        createdAt
        updatedAt
      }
      userID
      user {
        id
        name
        email
        username
        isNotificationsAccepted
        createdAt
        updatedAt
        owner
      }
      rate
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteCompletedLevels = /* GraphQL */ `
  subscription OnDeleteCompletedLevels {
    onDeleteCompletedLevels {
      id
      levelID
      level {
        id
        number
        gameRules
        userID
        createdAt
        updatedAt
      }
      userID
      user {
        id
        name
        email
        username
        isNotificationsAccepted
        createdAt
        updatedAt
        owner
      }
      rate
      createdAt
      updatedAt
    }
  }
`;
export const onCreatePushToken = /* GraphQL */ `
  subscription OnCreatePushToken($owner: String) {
    onCreatePushToken(owner: $owner) {
      pushToken
      userID
      user {
        id
        name
        email
        username
        isNotificationsAccepted
        createdAt
        updatedAt
        owner
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onUpdatePushToken = /* GraphQL */ `
  subscription OnUpdatePushToken($owner: String) {
    onUpdatePushToken(owner: $owner) {
      pushToken
      userID
      user {
        id
        name
        email
        username
        isNotificationsAccepted
        createdAt
        updatedAt
        owner
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onDeletePushToken = /* GraphQL */ `
  subscription OnDeletePushToken($owner: String) {
    onDeletePushToken(owner: $owner) {
      pushToken
      userID
      user {
        id
        name
        email
        username
        isNotificationsAccepted
        createdAt
        updatedAt
        owner
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onCreateCompletedCollections = /* GraphQL */ `
  subscription OnCreateCompletedCollections {
    onCreateCompletedCollections {
      id
      collectionID
      collection {
        id
        title
        userID
        createdAt
        updatedAt
      }
      userID
      user {
        id
        name
        email
        username
        isNotificationsAccepted
        createdAt
        updatedAt
        owner
      }
      rate
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateCompletedCollections = /* GraphQL */ `
  subscription OnUpdateCompletedCollections {
    onUpdateCompletedCollections {
      id
      collectionID
      collection {
        id
        title
        userID
        createdAt
        updatedAt
      }
      userID
      user {
        id
        name
        email
        username
        isNotificationsAccepted
        createdAt
        updatedAt
        owner
      }
      rate
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteCompletedCollections = /* GraphQL */ `
  subscription OnDeleteCompletedCollections {
    onDeleteCompletedCollections {
      id
      collectionID
      collection {
        id
        title
        userID
        createdAt
        updatedAt
      }
      userID
      user {
        id
        name
        email
        username
        isNotificationsAccepted
        createdAt
        updatedAt
        owner
      }
      rate
      createdAt
      updatedAt
    }
  }
`;
export const onCreateImageCollections = /* GraphQL */ `
  subscription OnCreateImageCollections {
    onCreateImageCollections {
      id
      collectionsID
      imageID
      collections {
        id
        title
        userID
        createdAt
        updatedAt
      }
      image {
        id
        url
        userID
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateImageCollections = /* GraphQL */ `
  subscription OnUpdateImageCollections {
    onUpdateImageCollections {
      id
      collectionsID
      imageID
      collections {
        id
        title
        userID
        createdAt
        updatedAt
      }
      image {
        id
        url
        userID
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteImageCollections = /* GraphQL */ `
  subscription OnDeleteImageCollections {
    onDeleteImageCollections {
      id
      collectionsID
      imageID
      collections {
        id
        title
        userID
        createdAt
        updatedAt
      }
      image {
        id
        url
        userID
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
