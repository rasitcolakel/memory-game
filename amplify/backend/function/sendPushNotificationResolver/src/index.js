/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient();
const resolvers = {
  Mutation: {
    customCreateLevel: (event, context) => {
      return customCreateLevel(event, context);
    },
    customCreateCollection: (event, context) => {
      return customCreateCollection(event, context);
    },
  },
};

exports.handler = async (event) => {
  console.log("EVENT:", JSON.stringify(event));
  const typeHandler = resolvers[event.typeName];
  if (typeHandler) {
    const resolver = typeHandler[event.fieldName];
    if (resolver) {
      return await resolver(event);
    }
  }
  throw new Error("Resolver not found.");
};

async function customCreateLevel(event) {
  let date = new Date();
  var params = {
    TableName: process.env.LEVELS_TABLE,
    Item: {
      id: AWS.util.uuid.v4(),
      number: event.arguments.number,
      gameRules: event.arguments.gameRules,
      userID: event.identity.sub,
      createdAt: date.toISOString(),
      updatedAt: date.toISOString(),
    },
  };
  try {
    const data = await docClient.put(params).promise();
    console.log(data);
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (e) {
    console.log(e);
    return {
      statusCode: 500,
      body: JSON.stringify(e),
    };
  }
}

async function customCreateCollection(event) {
  let date = new Date();
  var params = {
    TableName: process.env.COLLECTIONS_TABLE,
    Item: {
      id: AWS.util.uuid.v4(),
      title: event.arguments.title,
      userID: event.identity.sub,
      createdAt: date.toISOString(),
      updatedAt: date.toISOString(),
    },
  };
  try {
    const data = await docClient.put(params).promise();
    console.log(data);
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (e) {
    console.log(e);
    return {
      statusCode: 500,
      body: JSON.stringify(e),
    };
  }
}
