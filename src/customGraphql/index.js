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
        images {
          items {
            id
            image {
              url
              id
            }
          }
        }
        userID
        user {
          id
          name
          email
          username
          createdAt
          updatedAt
          owner
        }
        createdAt
        updatedAt
      }
      nextToken
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
        images {
          nextToken
        }
        userID
        user {
          id
          name
          email
          username
          createdAt
          updatedAt
          owner
        }
        createdAt
        updatedAt
      }
      image {
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

          createdAt
          updatedAt
          owner
        }
        createdAt
        updatedAt
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
        collections {
          items {
            id
            collectionsID
          }
        }
        userID
        createdAt
        updatedAt
      }
      nextToken
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
    }
  }
`;
