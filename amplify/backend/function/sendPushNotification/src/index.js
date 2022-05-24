/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
const { Expo } = require("expo-server-sdk");
const AWS = require("aws-sdk");
AWS.config.update({ region: "eu-central-1" });

exports.handler = async (event) => {
  // fetch all items from dynamodb
  try {
    if (!event.arguments?.sendPushNotification) {
      return "success";
    }
    const dynamodb = new AWS.DynamoDB();
    const params = {
      TableName: process.env.USER_TABLE,
      ReturnConsumedCapacity: "TOTAL",
    };

    const users = await dynamodb.scan(params).promise();
    if (users?.Items) {
      let acceptedUsers = users.Items.filter(
        (user) => user.isNotificationsAccepted.BOOL
      );
      if (acceptedUsers.length > 0) {
        acceptedUsers = acceptedUsers.map((user) => user.id.S);
      }

      const params = {
        TableName: process.env.PUSHTOKEN_TABLE,
        ReturnConsumedCapacity: "TOTAL",
      };
      const pushTokens = await dynamodb.scan(params).promise();
      if (pushTokens?.Items) {
        const tokens = pushTokens.Items.filter((token) =>
          acceptedUsers.includes(token.userID.S)
        ).map((token) => token.pushToken.S);
        console.log("tokens1111", tokens);
        await expoServerSend(tokens, event);
      }
    }
  } catch (e) {
    console.log(e);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: e.message,
      }),
    };
  }
};

async function expoServerSend(tokens, event) {
  console.log("tokens", tokens);
  let { fieldName } = event;
  let message = {
    title: "New Things For You",
    body: "New things for you. Check it out!",
  };
  if (fieldName === "customCreateCollection") {
    message = {
      title: "New Collection Has Been Added",
      body: "New collection has been added. Check it out",
    };
  } else if (fieldName === "customCreateLevel") {
    message = {
      title: "New Level Has Been Added",
      body: "New level has been added. Check it out",
    };
  }
  let expo = new Expo();

  let messages = [];

  for (let pushToken of tokens) {
    if (!Expo.isExpoPushToken(pushToken)) {
      console.log(`Push token ${pushToken} is not a valid Expo push token`);
      continue;
    }

    messages.push({
      to: pushToken,
      sound: "default",
      ...message,
    });
  }
  let chunks = expo.chunkPushNotifications(messages);
  let tickets = [];

  for (let chunk of chunks) {
    try {
      let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
      console.log(ticketChunk);
      tickets.push(...ticketChunk);
    } catch (error) {
      console.log(error);
    }
  }

  let receiptIds = [];
  for (let ticket of tickets) {
    if (ticket.id) {
      receiptIds.push(ticket.id);
    }
  }

  let receiptIdChunks = expo.chunkPushNotificationReceiptIds(receiptIds);
  for (let chunk of receiptIdChunks) {
    try {
      let receipts = await expo.getPushNotificationReceiptsAsync(chunk);
      console.log(receipts);
      for (let receiptId in receipts) {
        let { status, message, details } = receipts[receiptId];
        if (status === "ok") {
          continue;
        } else if (status === "error") {
          console.log(`There was an error sending a notification: ${message}`);
          if (details && details.log) {
            console.log(`The error code is ${details.log}`);
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
}
