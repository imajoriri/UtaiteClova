var rp = require('request-promise');

exports.postLikeSongToServer = (song, userId) => {
  return new Promise( (resolve, reject) => {

    const uri = "http://" + process.env["serverIP"] + "/api/v1/cek/like";

    var options = {
      method: 'POST',
      uri: uri,
      //timeout: 30 * 1000, // タイムアウト指定しないと帰ってこない場合がある
      form: {
        song: song,
        userId: userId,
      },
      headers: {
      }
    }

    rp(options).then( data => {
      resolve( JSON.parse(data) );
    }).catch( err => {
      resolve(err);
    })

  });

}
