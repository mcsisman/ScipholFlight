import React, {useState, useEffect} from 'react';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import {Divider} from '@rneui/themed';
import {convertDateToYYMMDD} from '../utils/DateHelper';
import ActionMenu from '../components/ActionMenu';
import {getRequestURL, Request} from '../utils/FlightRequest';
import {RecyclerListView, DataProvider, LayoutProvider} from 'recyclerlistview';
import {
  FLIGHT_APP_KEY,
  FLIGHT_APP_ID,
  WINDOW_WIDTH,
  WINDOW_HEIGHT,
} from '../utils/utils';
import FlightListItem from '../components/FlightListItem';
import FlightListHeader from '../components/FlightListHeader';
import {Flight} from '../utils/Flight';

import {StyleSheet, SafeAreaView} from 'react-native';

const Flights: React.FC = () => {
  console.log('RE-RENDER');
  const tabBarHeight = useBottomTabBarHeight();

  const [flightList, setFlightList] = useState<Flight[]>([]);
  const [requestParams, setRequestParams] = useState<Request>({});

  var dataProvider: DataProvider = new DataProvider(
    (r1, r2) => r1 !== r2,
  ).cloneWithRows(flightList);

  //useEffect(() => fetchFlightList(getRequestURL(requestParams)), []);

  const layoutProvider = new LayoutProvider(
    i => {
      return i;
    },
    (type, dim) => {
      switch (type) {
        default:
          dim.width = WINDOW_WIDTH;
          dim.height = WINDOW_HEIGHT / 12;
      }
    },
  );

  const onPressSearch = (
    flightDirection: string,
    fromDate: Date,
    toDate: Date,
  ) => {
    requestParams.flightDirection = flightDirection;
    requestParams.page = '0';
    requestParams.fromScheduleDate = convertDateToYYMMDD(fromDate);
    requestParams.toScheduleDate = convertDateToYYMMDD(toDate);
    setFlightList([]);
    fetchFlightList(getRequestURL(requestParams));
    return '';
  };

  const fetchFlightList = (URL: string) => {
    console.log('URL:' + URL);

    if (URL == '') {
      dataProvider = new DataProvider((r1, r2) => r1 !== r2).cloneWithRows(
        flightList,
      );
      setFlightList(flightList);
      return;
    }

    let links = '';
    fetch(URL, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        app_id: FLIGHT_APP_ID,
        app_key: FLIGHT_APP_KEY,
        ResourceVersion: 'v4',
      },
    })
      .then(response => {
        links = response.headers.get('link') as string;
        URL = getNextURL(links);
        return response.json();
      })
      .then(data => {
        flightList.push(...data.flights);
        fetchFlightList(URL);
      })
      .catch(error => console.log('err:' + error));
  };

  const getNextURL = (links: string) => {
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

  const rowRenderer = (type: any, data: Flight) => {
    return (
      <FlightListItem
        height={WINDOW_HEIGHT / 12}
        width={WINDOW_WIDTH}
        flightDirection={data.flightDirection}
        flightName={data.flightName}
        flightNumber={data.flightNumber.toString()}
        scheduleDate={data.scheduleDate}
        scheduleTime={data.scheduleTime}
      />
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <FlightListHeader width={WINDOW_WIDTH} height={WINDOW_HEIGHT / 15} />
      <Divider color={'black'} />
      {dataProvider.getSize() != 0 && (
        <RecyclerListView
          style={{flex: 1}}
          layoutProvider={layoutProvider}
          dataProvider={dataProvider}
          rowRenderer={rowRenderer}
        />
      )}
      <ActionMenu onPressSearch={onPressSearch} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
});

export default Flights;
