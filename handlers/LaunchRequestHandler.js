const { getAudioInfo } = require('./../functions/getAudioInfo');
const { soundEffects } = require('./../functions/soundEffects');

exports.LaunchRequestHandler = {
  canHandle: function(handlerInput){
    return handlerInput.requestEnvelope.isMatch('LaunchRequest');
  },
  handle: async function(handlerInput, context){
    //var msg = "いいねしたことがない曲なら、１。いいねしたことある曲なら、２。と答えてください。";
    //return handlerInput.responseBuilder.speak(msg).reprompt(msg).getResponse();


    // songTypeとuser_idを取得
    const songType = 1;
    const userId = handlerInput.requestEnvelope.session.user.userId;

    const alias = context.invokedFunctionArn.split(':').pop();
    const serverIP = process.env["serverIP" + "_" + alias];

    // songtypeとuseridを乗せて/api/v1/cek/get_audioにpost
    const audioInfo = await getAudioInfo(songType, userId, serverIP);

    // 取得した歌がなかった時
    if(audioInfo.song === null){
      return handlerInput.responseBuilder
        .speak("申し訳ございません。ただいま聞くことのできる歌がありません。")
        .getResponse();
    }

    // attributes保存
    const attributes = {
      audioInfo: audioInfo,
      songType: songType,
    }
    handlerInput.sessionAttributeManager.setSessionAttributes(attributes);

    const audioURL = audioInfo.song.sound.url;

    if(audioInfo.isFirst === true){
      var firstMsg = "初めまして。ボイスシンガーへようこそ。"
        + "私はこのスキルの案内人のものです。初めましてですので、このスキルについて説明をさせていただきますね。"
        + "これからあなたには素敵な歌に出会っていただきます。"
        + "たくさんの歌に出会ってほしいため、１曲あたりの聞ける時間をわずか数秒にしました。"
        + "もっとその歌を聞きたいと思ったら、その歌に「いいね」と伝えてあげてください。"
        + "わたくしがあなた宛にLINEで素敵なメッセージを送らせていただきます。"
        + "もし、まだLINEでこのスキルのアカウントを友達追加していないようでしたら、スキルストアから友達追加することができます。"
        + "それでは、ごゆっくり。"
    }else{
      var firstMsg = "こんにちは。"
        + "またお会いしましたね。"
        + "今回もまた、あなたのために素敵な歌を用意しました。"
        + "それではどうぞごゆっくり。"
    }
    var lastMsg = "次の曲にいきますか？それともこの歌にいいねを送りますか？"
      + "いいねを送る場合は、いいね、と言ってください。";

    return handlerInput.responseBuilder
      .speak(firstMsg)
      .audioPlay(soundEffects.radio)
      .audioPlay(audioURL)
      .speak(lastMsg)
      .reprompt(lastMsg)
      .getResponse();

  }
}
