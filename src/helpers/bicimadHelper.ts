import axios from 'axios';
import getAccessToken from './authHelper';
import {inspect} from 'util';
import {retry} from 'ts-retry-promise';

const BICIMAD_STATIONS_URL =
  'https://openapi.emtmadrid.es/v1/transport/bicimad/stations/';
export const BICIMAD_HOME_STATION_ID = 1576;
export const BICIMAD_WORK_STATION_ID = 1524;

type BicimadStationInformationResponse = {
  data: {
    dock_bikes: number;
    free_bases: number;
  }[];
};

async function getInfoForStation(id: number) {
  try {
    const accessToken = await getAccessToken();
    const {data} = await retry(
      () =>
        axios.get<BicimadStationInformationResponse>(
          BICIMAD_STATIONS_URL + id,
          {
            headers: {
              accessToken,
            },
          }
        ),
      {retries: 10}
    );
    return data.data[0];
  } catch (err) {
    console.error('Error while restrieving Bicimad info: ' + inspect(err));
  }
}

export default getInfoForStation;
