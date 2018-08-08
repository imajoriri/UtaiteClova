
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
  
  return clova.extensionBuilders.invoke(event);
};
