type Config = {
  mapBoxAccessToken: string;
  randomUserMaxDistanceKm: number;
  randomUserMinDistanceKm: number;
  randomUserCount: number;
};

const ApplicationConfig: Config = {
  mapBoxAccessToken:
    'pk.eyJ1Ijoicml6dmFucnpheWV2IiwiYSI6ImNsZDNqeGFiNDBqZDMzcHByMmpoMDZ2bnEifQ.1oz6Ztjzxamxu8JmP5wcoQ',
  randomUserMaxDistanceKm: 20,
  randomUserMinDistanceKm: 1,
  randomUserCount: 50,
};

export default ApplicationConfig;
