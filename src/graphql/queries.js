/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
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
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        email
        username
        isNotificationsAccepted
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const getNotifications = /* GraphQL */ `
  query GetNotifications($id: ID!) {
    getNotifications(id: $id) {
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
export const listNotifications = /* GraphQL */ `
  query ListNotifications(
    $filter: ModelNotificationsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listNotifications(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        senderID
        receiverID
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const getCollections = /* GraphQL */ `
  query GetCollections($id: ID!) {
    getCollections(id: $id) {
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
export const listCollections = /* GraphQL */ `
  query ListCollections(
    $filter: ModelCollectionsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCollections(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        userID
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getImage = /* GraphQL */ `
  query GetImage($id: ID!) {
    getImage(id: $id) {
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
export const listImages = /* GraphQL */ `
  query ListImages(
    $filter: ModelImageFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listImages(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        url
        userID
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getLevels = /* GraphQL */ `
  query GetLevels($id: ID!) {
    getLevels(id: $id) {
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
export const listLevels = /* GraphQL */ `
  query ListLevels(
    $filter: ModelLevelsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listLevels(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        number
        gameRules
        userID
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const searchLevels = /* GraphQL */ `
  query SearchLevels(
    $filter: SearchableLevelsFilterInput
    $sort: [SearchableLevelsSortInput]
    $limit: Int
    $nextToken: String
    $from: Int
    $aggregates: [SearchableLevelsAggregationInput]
  ) {
    searchLevels(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
      from: $from
      aggregates: $aggregates
    ) {
      items {
        id
        number
        gameRules
        userID
        createdAt
        updatedAt
      }
      nextToken
      total
      aggregateItems {
        name
        result {
          ... on SearchableAggregateScalarResult {
            value
          }
          ... on SearchableAggregateBucketResult {
            buckets {
              key
              doc_count
            }
          }
        }
      }
    }
  }
`;
export const getCompletedLevels = /* GraphQL */ `
  query GetCompletedLevels($id: ID!) {
    getCompletedLevels(id: $id) {
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
export const listCompletedLevels = /* GraphQL */ `
  query ListCompletedLevels(
    $filter: ModelCompletedLevelsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCompletedLevels(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        levelID
        userID
        rate
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const completedLevelByLevel = /* GraphQL */ `
  query CompletedLevelByLevel(
    $levelID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelCompletedLevelsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    completedLevelByLevel(
      levelID: $levelID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        levelID
        userID
        rate
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const completedLevelByUser = /* GraphQL */ `
  query CompletedLevelByUser(
    $userID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelCompletedLevelsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    completedLevelByUser(
      userID: $userID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        levelID
        userID
        rate
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getPushToken = /* GraphQL */ `
  query GetPushToken($userID: ID!) {
    getPushToken(userID: $userID) {
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
export const listPushTokens = /* GraphQL */ `
  query ListPushTokens(
    $userID: ID
    $filter: ModelPushTokenFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listPushTokens(
      userID: $userID
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        pushToken
        userID
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const getCompletedCollections = /* GraphQL */ `
  query GetCompletedCollections($id: ID!) {
    getCompletedCollections(id: $id) {
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
export const listCompletedCollections = /* GraphQL */ `
  query ListCompletedCollections(
    $filter: ModelCompletedCollectionsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCompletedCollections(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        collectionID
        userID
        rate
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const completedCollectionByCollection = /* GraphQL */ `
  query CompletedCollectionByCollection(
    $collectionID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelCompletedCollectionsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    completedCollectionByCollection(
      collectionID: $collectionID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        collectionID
        userID
        rate
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const completedCollectionByUser = /* GraphQL */ `
  query CompletedCollectionByUser(
    $userID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelCompletedCollectionsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    completedCollectionByUser(
      userID: $userID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        collectionID
        userID
        rate
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getImageCollections = /* GraphQL */ `
  query GetImageCollections($id: ID!) {
    getImageCollections(id: $id) {
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
export const listImageCollections = /* GraphQL */ `
  query ListImageCollections(
    $filter: ModelImageCollectionsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listImageCollections(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        collectionsID
        imageID
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
