
exports.LikeIntentHandler = {
  canHandle: function(handlerInput){
    return handlerInput.requestEnvelope.isMatch('LikeIntent');
  },
  handle: async function(handlerInput){
    // TODO songTypeが1以外の時（いいねされたやつのとき）でももう一度いいねをしてbotに通知を送る

    // attributesからaudioInfoを取得
    // serverにいいねされたことを通知
    // --serverへのrequest json---
    // {song: [obj], singer: [obj]}
    // botにいいねした、歌と歌い手さんの情報を通知
    // ユーザーに次に行くかどうかを聞く

    var attributes = handlerInput.sessionAttributeManager.getSessionAttributes();

    // attributesからaudioInfoを取得
    var audioInfo = attributes.audioInfo;

    const userId = handlerInput.requestEnvelope.session.user.userId;

    // serverにいいねされたことを通知
    postLikeSongToServer(audioInfo.song, audioInfo.singer);

    // botにいいねした歌い手と歌の情報を通知
    await postLikeSongToBot(audioInfo.song, audioInfo.singer, userId);

    // ユーザーに次の曲を聞くかどうかを聞く
    var msg = "いいねしました。歌の詳細はLINEに送りました。次の曲を聞きますか？";
    var reprompt = '次の曲を聞きますか？';
    return handlerInput.responseBuilder
      .speak(msg)
      .reprompt(reprompt)
      .getResponse();
  }
}

function postLikeSongToServer(song, singer, userId){
  console.log('post for server');
  return this;
}

// botにいいねしたこと、歌い手、歌の情報をpush
function postLikeSongToBot(song, singer){
  return new Promise( (resolve, reject) => {
    const line = require('@line/bot-sdk');

    const client = new line.Client({
      channelAccessToken: process.env["channelAccessToken"]
    });

    var twitterURL = singer.twitter_url || "https://hogehgoe";
    var imageURL = singer.image_url || "https://hogehgoe";

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
          },
        ],
        thumbnailImageUrl: imageURL,
        title: `${singer.name}の曲をいいねしました。`,
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

    // TODO
    userId = "Ue96ac7997c2c11739989823a47ff1c6b";
    client.pushMessage(userId, message).then( () => {
      console.log('post for bot');
      resolve();
    }).catch((err) => {
      console.log(err);
      reject();
    });
  });
}
