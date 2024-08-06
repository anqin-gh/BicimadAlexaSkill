import {HandlerInput, RequestHandler} from 'ask-sdk';

const LaunchRequestHandler: RequestHandler = {
  canHandle(handlerInput: HandlerInput): boolean {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'LaunchRequest';
  },
  handle(handlerInput: HandlerInput) {
    const speechText =
      'Estás utilizando el skill de Bicimad. ¡Pregúntame por la información de Bicimad!';

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .getResponse();
  },
};

export default LaunchRequestHandler;
