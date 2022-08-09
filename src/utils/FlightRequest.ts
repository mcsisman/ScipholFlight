import {convertDateToYYMMDD} from './DateHelper';
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
  let key: keyof typeof requestObj;
  let index = 0;
  for (key in requestObj) {
    if (index != 0) URL += '&';
    URL += key + '=' + requestObj[key];
    index++;
  }

  return URL;
};

export const getNextURL = (links: string) => {
  let linkArr;
  linkArr = links?.split(', ');
  let newURL = '';
  linkArr?.map((element: string) => {
    if (element.includes('next')) {
      newURL = element.substring(
        element.indexOf('<') + 1,
        element.indexOf('>'),
      );
    }
  });
  return newURL;
};

export const getRequestObj = (
  flightDirection: string,
  fromDate: Date,
  toDate: Date,
) => {
  let request: Request = {};

  if (flightDirection != undefined || flightDirection != 'B') {
    request.flightDirection = flightDirection;
  }
  request.page = '0';
  request.fromScheduleDate = convertDateToYYMMDD(fromDate);
  request.toScheduleDate = convertDateToYYMMDD(toDate);
  return request;
};
