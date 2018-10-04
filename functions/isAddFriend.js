const rp = require('request-promise');
exports.isAddFriend = async (alias, userId) => {
  const channelAccessToken = process.env["channelAccessToken" + "_" + alias];

  var options = {
    method: 'GET',
    uri: 'https://api.line.me/v2/bot/profile/' + userId,
    headers: {
      "Authorization": "Bearer {" + channelAccessToken + "}"
    }
  };

  var res;
  await rp(options)
    .then( async (data) => {
      // 友だち追加されているとき
      res = true;
    })
    .catch( err => {
      res = false;
    });
  return res;
}
