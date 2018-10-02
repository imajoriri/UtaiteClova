var rp = require('request-promise');

var { postLikeSongToServer } = require('./../functions/postLikeSongToServer.js');
var { postLikeSongToBot } = require('./../functions/postLikeSongToBot.js');
const { soundEffects } = require('./../functions/soundEffects');

exports.LikeIntentHandler = {
  canHandle: function(handlerInput){
    return handlerInput.requestEnvelope.isMatch('LikeIntent');
  },
  handle: async function(handlerInput, context){
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

    const alias = context.invokedFunctionArn.split(':').pop();
    const serverIP = process.env["serverIP" + "_" + alias];

    // // serverにいいねされたことを通知
    // //await postLikeSongToServer(audioInfo.song, userId);
    // postLikeSongToServer(audioInfo.song, userId, serverIP);

    // // botにいいねした歌い手と歌の情報を通知
    // // しかし、非同期にできないので踏み台Lambdaを作成している
    // await postLikeSongToBot(audioInfo.song, audioInfo.singer, userId, alias);
    // //postLikeSongToBot(audioInfo.song, audioInfo.singer, userId);

    // 友達追加されているかを確認。
    var options = {
      method: 'GET',
      uri: 'https://api.line.me/v2/bot/profile/' + userId,
      headers: {
        "Authorization": "Bearer {" + process.env["channelAccessToken" + "_" + alias] + "}"
      }
    };

    var response;
    await rp(options)
    // userがいる時
      .then( async (data) => {
        var msg = "いいねしました。歌の詳細はLINEに送りました。次の曲を聞きますか？";
        var reprompt = '次の曲を聞きますか？';

        await postLikeSongToBot(audioInfo.song, audioInfo.singer, userId, alias);
        postLikeSongToServer(audioInfo.song, userId, serverIP);

        response = handlerInput.responseBuilder
          .audioPlay(soundEffects.liked)
          .speak(msg)
          .reprompt(reprompt)
          .getResponse();
      })
    // userがいない時
      .catch( err => {
        console.log(err);
        var msg = "いいねを送ろうとしましたが、友達追加されていないため送ることができませんでした。スキルストアより友達追加するとLINEアプリの方に通知することができます。次の曲に進みますか？";
        var reprompt = '次の曲を聞きますか？';
        
        response = handlerInput.responseBuilder
          .speak(msg)
          .reprompt(reprompt)
          .getResponse();
      });

    return response;
    //return handlerInput.responseBuilder
    //  .audioPlay(soundEffects.liked)
    //  .speak(msg)
    //  .reprompt(reprompt)
    //  .getResponse();
  }
}


