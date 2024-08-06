import axios from 'axios';
import getAccessToken from './authHelper';
import {inspect} from 'util';

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
    const {data} = await axios.get<BicimadStationInformationResponse>(
      BICIMAD_STATIONS_URL + id,
      {
        headers: {
          accessToken,
        },
      }
    );
    return data.data[0];
  } catch (err) {
    console.error('Error while restrieving accessToken: ' + inspect(err));
  }
}

export default getInfoForStation;
