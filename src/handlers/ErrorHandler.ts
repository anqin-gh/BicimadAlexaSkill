import {HandlerInput, ErrorHandler} from 'ask-sdk';
import {inspect} from 'util';

const ErrorHandler: ErrorHandler = {
  canHandle(handlerInput: HandlerInput, error: Error): boolean {
    return true;
  },
  handle(handlerInput: HandlerInput, error: Error) {
    console.error(`Error handled: ${inspect(error)}`);
    const text =
      'Lo siento, no he entendido tu comando. Por favor, dilo de nuevo.';

    return handlerInput.responseBuilder
      .speak(text)
      .reprompt(text)
      .getResponse();
  },
};

export default ErrorHandler;
