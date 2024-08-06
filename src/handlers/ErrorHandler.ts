import {HandlerInput, ErrorHandler} from 'ask-sdk';

const ErrorHandler: ErrorHandler = {
  canHandle(handlerInput: HandlerInput, error: Error): boolean {
    return true;
  },
  handle(handlerInput: HandlerInput, error: Error) {
    console.error(`Error handled: ${error.message}`);
    const text =
      'Lo siento, no he entendido tu comando. Por favor, dilo de nuevo.';

    return handlerInput.responseBuilder
      .speak(text)
      .reprompt(text)
      .getResponse();
  },
};

export default ErrorHandler;
