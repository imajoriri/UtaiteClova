var { getTwitterImage } = require('./getTwitterImage.js');
var { isHTTPS } = require('./isHTTPS.js');

var FUNCTION_NAME = 'UtaiteAsync';

var AWS = require('aws-sdk');

// botにいいねしたこと、歌い手、歌の情報をpush
async function postLikeSongToBot(song, singer, userId, alias){
  var lambda = new AWS.Lambda();
  var postEvent = {
    method: "postLikeSongToBot",
    events: {
      song: song,
      singer: singer,
      userId: userId,
      alias: alias
    }
  }

  var params = {
    FunctionName: FUNCTION_NAME,
    InvokeArgs: JSON.stringify(postEvent)
  };

  await lambda.invokeAsync(params).promise();
}
exports.postLikeSongToBot = postLikeSongToBot;

  //return new Promise( (resolve, reject) => {
  //return new Promise( async function(resolve, reject){
  //  const line = require('@line/bot-sdk');

  //  const client = new line.Client({
  //    channelAccessToken: process.env["channelAccessToken"]
  //  });

  //  var twitterURL = singer.twitter_url || "https://hogehgoe";
  //  var imageURL = await getTwitterImage(singer.twitter_name) || "https://hogehgoe";
  //  // ちゃんと画像URLが取得できなかった時
  //  //if(imageURL === "/"){ imageURL = "https://hogehgoe" };

  //  var message = {
  //    type: "template",
  //    altText: `${singer.name}の曲をいいねしました。`,
  //    template: {
  //      type: "buttons",
  //      actions: [
  //        {
  //          type: "uri",
  //          label: `プロフィールを見る!!`,
  //          uri: isHTTPS(twitterURL),
  //        }, ], thumbnailImageUrl: isHTTPS(imageURL), title: `${singer.name}の曲をいいねしました。`,
  //      text: `${singer.name}の${song.name}をいいねしました。`
  //    }
  //  }

  //  // ないor変な形式だとエラーになる
  //  var detailURL = song.detail_url;

  //  // songURLがあったらボタンとして追加
  //  if(detailURL){
  //    message.template.actions.push({
  //      type: "uri",
  //      label: `曲をもっと聞きたい!!`,
  //      uri: isHTTPS(detailURL),
  //    })
  //  }else{
  //    message.template.actions.push({
  //      type: "uri",
  //      label: `曲を聞きたい!!`,
  //      uri: isHTTPS(song.sound.url),
  //    })
  //  }

  //  console.log(message);
  //  client.pushMessage(userId, message).then( (data) => {
  //    console.log('success for bot');
  //    resolve(data);
  //  }).catch((err) => {
  //    console.log('error for bot');
  //    console.log(err);
  //    reject();
  //  });
  //});

