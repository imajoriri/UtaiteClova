var rp = require('request-promise');
var clova = require("love-clova");

const { LaunchRequestHandler } = require('./handlers/LaunchRequestHandler.js');
const { SessionEndedRequestHandler } = require('./handlers/SessionEndedRequestHandler.js');
const { ClovaGuideIntentHandler } = require('./handlers/ClovaGuideIntentHandler.js');
const { ErrorHandler } = require('./handlers/ErrorHandler.js');

const { SampleIntentHandler } = require('./handlers/SampleIntentHandler.js');
const { SongTypeIntentHandler } = require('./handlers/SongTypeIntentHandler.js');
const { NextIntentHandler } = require('./handlers/NextIntentHandler.js');
const { LikeIntentHandler } = require('./handlers/LikeIntentHandler.js');
const { YesIntentHandler } = require('./handlers/YesIntentHandler.js');
const { NoIntentHandler } = require('./handlers/NoIntentHandler.js');

exports.handler = async function(event, content) {
  clova.extensionBuilders.addRequestHandlers(
    LaunchRequestHandler,
    SessionEndedRequestHandler,
    ClovaGuideIntentHandler,
    SongTypeIntentHandler,
    NextIntentHandler,
    LikeIntentHandler,
    YesIntentHandler,
    NoIntentHandler,
  )
    .addErrorHandlers(ErrorHandler)

  var options = {
    method: 'POST',
    uri: 'http://' + process.env["serverIP"] + "/api/v1/cek/session_log",
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

  return clova.extensionBuilders.invoke(event);
};
