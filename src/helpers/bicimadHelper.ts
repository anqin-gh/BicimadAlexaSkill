import axios from 'axios';
import getAccessToken from './authHelper';
import {z} from 'zod';
import {retry} from 'ts-retry-promise';
import {inspect} from 'util';

const BICIMAD_STATIONS_URL =
  'https://openapi.emtmadrid.es/v1/transport/bicimad/stations/';
export const BICIMAD_HOME_STATION_ID = 1576;
export const BICIMAD_WORK_STATION_ID = 1524;

const bicimadStationInformationResponseSchema = z.object({
  data: z.object({
    data: z.array(
      z.object({
        dock_bikes: z.number(),
        free_bases: z.number(),
      })
    ),
  }),
});

async function getInfoForStation(id: number) {
  try {
    const accessToken = await getAccessToken();
    const {data} = await retry(
      () =>
        axios.get(BICIMAD_STATIONS_URL + id, {
          headers: {
            accessToken,
          },
        }),
      {retries: 12, backoff: 'EXPONENTIAL'}
    ).then(res => {
      console.log(`Response: ${inspect(res)}`);
      return bicimadStationInformationResponseSchema.parse(res);
    });

    return data.data[0];
  } catch (err) {
    console.error('Error while restrieving Bicimad info: ' + inspect(err));
  }
}

export default getInfoForStation;
