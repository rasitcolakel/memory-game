/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
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
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
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
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
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
export const createNotifications = /* GraphQL */ `
  mutation CreateNotifications(
    $input: CreateNotificationsInput!
    $condition: ModelNotificationsConditionInput
  ) {
    createNotifications(input: $input, condition: $condition) {
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
export const updateNotifications = /* GraphQL */ `
  mutation UpdateNotifications(
    $input: UpdateNotificationsInput!
    $condition: ModelNotificationsConditionInput
  ) {
    updateNotifications(input: $input, condition: $condition) {
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
export const deleteNotifications = /* GraphQL */ `
  mutation DeleteNotifications(
    $input: DeleteNotificationsInput!
    $condition: ModelNotificationsConditionInput
  ) {
    deleteNotifications(input: $input, condition: $condition) {
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
export const createCollections = /* GraphQL */ `
  mutation CreateCollections(
    $input: CreateCollectionsInput!
    $condition: ModelCollectionsConditionInput
  ) {
    createCollections(input: $input, condition: $condition) {
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
export const updateCollections = /* GraphQL */ `
  mutation UpdateCollections(
    $input: UpdateCollectionsInput!
    $condition: ModelCollectionsConditionInput
  ) {
    updateCollections(input: $input, condition: $condition) {
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
export const deleteCollections = /* GraphQL */ `
  mutation DeleteCollections(
    $input: DeleteCollectionsInput!
    $condition: ModelCollectionsConditionInput
  ) {
    deleteCollections(input: $input, condition: $condition) {
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
export const createImage = /* GraphQL */ `
  mutation CreateImage(
    $input: CreateImageInput!
    $condition: ModelImageConditionInput
  ) {
    createImage(input: $input, condition: $condition) {
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
export const updateImage = /* GraphQL */ `
  mutation UpdateImage(
    $input: UpdateImageInput!
    $condition: ModelImageConditionInput
  ) {
    updateImage(input: $input, condition: $condition) {
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
export const deleteImage = /* GraphQL */ `
  mutation DeleteImage(
    $input: DeleteImageInput!
    $condition: ModelImageConditionInput
  ) {
    deleteImage(input: $input, condition: $condition) {
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
export const createLevels = /* GraphQL */ `
  mutation CreateLevels(
    $input: CreateLevelsInput!
    $condition: ModelLevelsConditionInput
  ) {
    createLevels(input: $input, condition: $condition) {
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
export const updateLevels = /* GraphQL */ `
  mutation UpdateLevels(
    $input: UpdateLevelsInput!
    $condition: ModelLevelsConditionInput
  ) {
    updateLevels(input: $input, condition: $condition) {
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
export const deleteLevels = /* GraphQL */ `
  mutation DeleteLevels(
    $input: DeleteLevelsInput!
    $condition: ModelLevelsConditionInput
  ) {
    deleteLevels(input: $input, condition: $condition) {
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
export const createCompletedLevels = /* GraphQL */ `
  mutation CreateCompletedLevels(
    $input: CreateCompletedLevelsInput!
    $condition: ModelCompletedLevelsConditionInput
  ) {
    createCompletedLevels(input: $input, condition: $condition) {
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
export const updateCompletedLevels = /* GraphQL */ `
  mutation UpdateCompletedLevels(
    $input: UpdateCompletedLevelsInput!
    $condition: ModelCompletedLevelsConditionInput
  ) {
    updateCompletedLevels(input: $input, condition: $condition) {
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
export const deleteCompletedLevels = /* GraphQL */ `
  mutation DeleteCompletedLevels(
    $input: DeleteCompletedLevelsInput!
    $condition: ModelCompletedLevelsConditionInput
  ) {
    deleteCompletedLevels(input: $input, condition: $condition) {
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
export const createPushToken = /* GraphQL */ `
  mutation CreatePushToken(
    $input: CreatePushTokenInput!
    $condition: ModelPushTokenConditionInput
  ) {
    createPushToken(input: $input, condition: $condition) {
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
export const updatePushToken = /* GraphQL */ `
  mutation UpdatePushToken(
    $input: UpdatePushTokenInput!
    $condition: ModelPushTokenConditionInput
  ) {
    updatePushToken(input: $input, condition: $condition) {
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
export const deletePushToken = /* GraphQL */ `
  mutation DeletePushToken(
    $input: DeletePushTokenInput!
    $condition: ModelPushTokenConditionInput
  ) {
    deletePushToken(input: $input, condition: $condition) {
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
export const createCompletedCollections = /* GraphQL */ `
  mutation CreateCompletedCollections(
    $input: CreateCompletedCollectionsInput!
    $condition: ModelCompletedCollectionsConditionInput
  ) {
    createCompletedCollections(input: $input, condition: $condition) {
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
export const updateCompletedCollections = /* GraphQL */ `
  mutation UpdateCompletedCollections(
    $input: UpdateCompletedCollectionsInput!
    $condition: ModelCompletedCollectionsConditionInput
  ) {
    updateCompletedCollections(input: $input, condition: $condition) {
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
export const deleteCompletedCollections = /* GraphQL */ `
  mutation DeleteCompletedCollections(
    $input: DeleteCompletedCollectionsInput!
    $condition: ModelCompletedCollectionsConditionInput
  ) {
    deleteCompletedCollections(input: $input, condition: $condition) {
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
export const createImageCollections = /* GraphQL */ `
  mutation CreateImageCollections(
    $input: CreateImageCollectionsInput!
    $condition: ModelImageCollectionsConditionInput
  ) {
    createImageCollections(input: $input, condition: $condition) {
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
export const updateImageCollections = /* GraphQL */ `
  mutation UpdateImageCollections(
    $input: UpdateImageCollectionsInput!
    $condition: ModelImageCollectionsConditionInput
  ) {
    updateImageCollections(input: $input, condition: $condition) {
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
export const deleteImageCollections = /* GraphQL */ `
  mutation DeleteImageCollections(
    $input: DeleteImageCollectionsInput!
    $condition: ModelImageCollectionsConditionInput
  ) {
    deleteImageCollections(input: $input, condition: $condition) {
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
