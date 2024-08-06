import {RequestHandler, HandlerInput} from 'ask-sdk';
import {SessionEndedRequest} from 'ask-sdk-model';

const SessionEndedRequestHandler: RequestHandler = {
  canHandle(handlerInput: HandlerInput): boolean {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'SessionEndedRequest';
  },
  handle(handlerInput: HandlerInput) {
    console.log(
      `Sesión finalizada con reason: ${(handlerInput.requestEnvelope.request as SessionEndedRequest).reason}`
    );

    return handlerInput.responseBuilder.getResponse();
  },
};

export default SessionEndedRequestHandler;
