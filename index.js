var rp = require('request-promise');
var clova = require("love-clova");

// /handlers
const { LaunchRequestHandler } = require('./handlers/LaunchRequestHandler.js');
const { SessionEndedRequestHandler } = require('./handlers/SessionEndedRequestHandler.js');
const { ErrorHandler } = require('./handlers/ErrorHandler.js');

// sample
const { SampleIntentHandler } = require('./handlers/SampleIntentHandler.js');

const { GuideIntentHandler } = require('./handlers/GuideIntentHandler.js');
const { SongTypeIntentHandler } = require('./handlers/SongTypeIntentHandler.js');
const { NextIntentHandler } = require('./handlers/NextIntentHandler.js');
const { LikeIntentHandler } = require('./handlers/LikeIntentHandler.js');
const { YesIntentHandler } = require('./handlers/YesIntentHandler.js');
const { NoIntentHandler } = require('./handlers/NoIntentHandler.js');
const { AgainIntentHandler } = require('./handlers/AgainIntentHandler.js');
const { SongInfoIntentHandler } = require('./handlers/SongInfoIntentHandler.js');

// /functions
const { postCreateUser } = require('./functions/postCreateUser.js');

exports.handler = async function(event, context, callback) {
  console.log(JSON.stringify(event));

  clova.extensionBuilders.addRequestHandlers(
    LaunchRequestHandler,
    SessionEndedRequestHandler,
    SongTypeIntentHandler,
    NextIntentHandler,
    LikeIntentHandler,
    YesIntentHandler,
    NoIntentHandler,
    GuideIntentHandler,
    AgainIntentHandler,
    SongInfoIntentHandler,
  )
    .addErrorHandlers(ErrorHandler)

  // Eventrequestの時はログを送らない
  // Eventrequestの時はUserを作成するだけ
  if(event.request.type === "EventRequest" && event.request.event.name === 'SkillEnabled'){
    // user作成
    await postCreateUser(event);
    return {status: "ok"}

  }else if(event.request.type !== "EventRequest"){

    const alias = context.invokedFunctionArn.split(':').pop();
    const serverIP = process.env["serverIP" + "_" + alias];

    var options = {
      method: 'POST',
      uri: 'http://' + serverIP + "/api/v1/cek/session_log",
      form: {
        userId: event.session.user.userId,
        skill_session_id: event.session.sessionId,
        request_type: event.request.type,
        intent_name: null,
      },
    };

    // IntentRequestの時はインテント名もつける
    if(event.request.type === "IntentRequest"){
      options.form.intent_name = event.request.intent.name
    }
    // logを送信
    rp(options)

    return clova.extensionBuilders.invoke(event, context);
  }

};
