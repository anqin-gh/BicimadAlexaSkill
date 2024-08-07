import axios from 'axios';
import {retry} from 'ts-retry-promise';
import {inspect} from 'util';

const AUTH_URL = 'https://openapi.emtmadrid.es/v2/mobilitylabs/user/login/';
const BICIMAD_X_CLIENT_ID = process.env.clientId;
const BICIMAD_PASS_KEY = process.env.passKey;

type BicimadAuthResponse = {
  data: {
    accessToken: string;
  }[];
};

async function getAccessToken() {
  try {
    const {data} = await retry(
      () =>
        axios.get<BicimadAuthResponse>(AUTH_URL, {
          headers: {
            'X-ClientId': BICIMAD_X_CLIENT_ID,
            passKey: BICIMAD_PASS_KEY,
          },
        }),
      {retries: 10}
    );

    const accessToken = data.data[0].accessToken;
    return accessToken;
  } catch (err) {
    console.error('Error while restrieving accessToken: ' + inspect(err));
  }
}

export default getAccessToken;
