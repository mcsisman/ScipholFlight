export interface Request {
  scheduleDate?: string;
  scheduleTime?: string;
  flightName?: string;
  flightDirection?: string;
  airline?: string;
  airlineCode?: string;
  route?: string;
  includedelays?: string;
  page?: string;
  sort?: string;
  fromDateTime?: string;
  toDateTime?: string;
  searchDateTimeField?: string;
  fromScheduleDate?: string;
  toScheduleDate?: string;
}

export const getRequestURL = (requestObj: Request) => {
  let URL = 'https://api.schiphol.nl/public-flights/flights?';
  console.group('asked for URL');
  let key: keyof typeof requestObj;
  let index = 0;
  for (key in requestObj) {
    if (index != 0) URL += '&';
    URL += key + '=' + requestObj[key];
    index++;
  }

  return URL;
};
