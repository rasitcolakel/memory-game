var AWS = require("aws-sdk");

exports.handler = (event, context, callback) => {
  var cognitoIdentityServiceProvider = new AWS.CognitoIdentityServiceProvider();

  var params = {
    GroupName: "Users", //your confirmed user gets added to this group
    UserPoolId: event.userPoolId,
    Username: event.userName,
  };

  // the user attribute 'custom:ManagerID' was set on User Sign Up.  Here, we are// using it as a flag.  If it has a value, then add the user to the Managers group.

  cognitoIdentityServiceProvider.adminAddUserToGroup(
    params,
    function (err, data) {
      if (err) {
        callback(err); // uh oh, an error
      }

      callback(null, event); // yay! success
    }
  );
};
