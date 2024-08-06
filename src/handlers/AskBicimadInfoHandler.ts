import {RequestHandler, HandlerInput} from 'ask-sdk';
import getInfoForStation, {
  BICIMAD_HOME_STATION_ID,
  BICIMAD_WORK_STATION_ID,
} from '../helpers/bicimadHelper';
import {inspect} from 'util';

const AskBicimadInfoHandler: RequestHandler = {
  canHandle(handlerInput: HandlerInput): boolean {
    const {request} = handlerInput.requestEnvelope;
    return (
      request.type === 'IntentRequest' &&
      request.intent.name === 'AskForBasicInfo'
    );
  },
  async handle(handlerInput: HandlerInput) {
    try {
      const homeInfo = await getInfoForStation(BICIMAD_HOME_STATION_ID);
      const workInfo = await getInfoForStation(BICIMAD_WORK_STATION_ID);
      return handlerInput.responseBuilder
        .speak(
          `Hay ${homeInfo?.dock_bikes} bicis en la estación de casa y ${workInfo?.free_bases} bases libres en la de trabajo.`
        )
        .getResponse();
    } catch (err) {
      console.error(inspect(err));
      throw err;
    }
  },
};

export default AskBicimadInfoHandler;
