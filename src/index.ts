import {SkillBuilders} from 'ask-sdk';
import LaunchRequestHandler from './handlers/LaunchRequestHandler';
import AskBicimadInfoHandler from './handlers/AskBicimadInfoHandler';
import HelpIntentHandler from './handlers/HelpIntentHandler';
import CancelAndStopIntentHandler from './handlers/CancelAndStopIntentHandler';
import SessionEndedRequestHandler from './handlers/SessionEndedRequestHandler';
import ErrorHandler from './handlers/ErrorHandler';

exports.handler = SkillBuilders.custom()
  .addRequestHandlers(
    LaunchRequestHandler,
    AskBicimadInfoHandler,
    HelpIntentHandler,
    CancelAndStopIntentHandler,
    SessionEndedRequestHandler
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();
