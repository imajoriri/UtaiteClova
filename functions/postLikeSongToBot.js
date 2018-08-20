var { getTwitterImage } = require('./getTwitterImage.js');

// botにいいねしたこと、歌い手、歌の情報をpush
async function postLikeSongToBot(song, singer, userId){
  //return new Promise( (resolve, reject) => {
  return new Promise( async function(resolve, reject){
    const line = require('@line/bot-sdk');

    const client = new line.Client({
      channelAccessToken: process.env["channelAccessToken"]
    });

    var twitterURL = singer.twitter_url || "https://hogehgoe";
    var imageURL = await getTwitterImage(singer.twitter_name) || "https://hogehgoe";

    var message = {
      type: "template",
      altText: `${singer.name}の曲をいいねしました。`,
      template: {
        type: "buttons",
        actions: [
          {
            type: "uri",
            label: `プロフィールを見る!!`,
            uri: twitterURL,
          }, ], thumbnailImageUrl: imageURL, title: `${singer.name}の曲をいいねしました。`,
        text: `${singer.name}の${song.name}をいいねしました。`
      }
    }

    // ないor変な形式だとエラーになる
    var songURL = song.url;

    // songURLがあったらボタンとして追加
    if(songURL){
      message.template.actions.push({
        type: "uri",
        label: `曲をもっと聞きたい!!`,
        uri: songURL,
      })
    }

    client.pushMessage(userId, message).then( () => {
      console.log('post for bot');
      resolve();
    }).catch((err) => {
      console.log(err);
      reject();
    });
  });
}

exports.postLikeSongToBot = postLikeSongToBot;
