import {RequestHandler, HandlerInput} from 'ask-sdk';
import {inspect} from 'util';

const SessionEndedRequestHandler: RequestHandler = {
  canHandle(handlerInput: HandlerInput): boolean {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'SessionEndedRequest';
  },
  handle(handlerInput: HandlerInput) {
    console.log(
      `Sesión finalizada con reason: ${inspect(handlerInput.requestEnvelope.request)}`
    );

    return handlerInput.responseBuilder.getResponse();
  },
};

export default SessionEndedRequestHandler;
