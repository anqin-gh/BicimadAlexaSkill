import {RequestHandler, HandlerInput} from 'ask-sdk';

const CancelAndStopIntentHandler: RequestHandler = {
  canHandle(handlerInput: HandlerInput): boolean {
    const {request} = handlerInput.requestEnvelope;
    return (
      request.type === 'IntentRequest' &&
      ['AMAZON.CancelIntent', 'AMAZON.StopIntent'].some(
        intent => intent === request.intent.name
      )
    );
  },
  handle(handlerInput: HandlerInput) {
    return handlerInput.responseBuilder
      .speak('¡Hasta luego!')
      .withShouldEndSession(true)
      .getResponse();
  },
};

export default CancelAndStopIntentHandler;
