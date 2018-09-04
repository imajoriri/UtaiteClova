var rp = require('request-promise');

exports.postCreateUser = async function(event){
  // TODO Userを作成する。

  console.log('---create user---');
  const uri = "http://" + process.env["serverIP"] + "/api/v1/cek/create_user";
  var options = {
    method: 'POST',
    uri: uri,
    form: {
      userId: event.context.System.user.userId,
    },
  }

  await rp(options);
  return this;
}
