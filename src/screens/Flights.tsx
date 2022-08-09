import React, {useState, useEffect} from 'react';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import {Divider} from '@rneui/themed';
import ActionMenu from '../components/ActionMenu';
import BookingDialog from '../components/BookingDialog';
import {getRequestURL, getNextURL, getRequestObj} from '../utils/FlightRequest';
import {RecyclerListView, DataProvider, LayoutProvider} from 'recyclerlistview';
import QRScannerDialog from '../components/QRScannerDialog';

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
  const [bookingData, setBookingData] = useState({
    flightName: '',
    flightDate: '',
    flightTime: '',
  });
  const [bookingIsVisible, setBookingIsVisible] = useState(false);
  const [flightList, setFlightList] = useState<Flight[]>([]);
  const [QRScannerIsVisible, setQRScannerVisible] = useState(false);

  var dataProvider: DataProvider = new DataProvider(
    (r1, r2) => r1 !== r2,
  ).cloneWithRows(flightList);

  const toggleBookingVisibility = () => {
    setBookingIsVisible(!bookingIsVisible);
  };

  const toggleQRScannerVisibility = () => {
    setQRScannerVisible(!QRScannerIsVisible);
  };

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

  const onPressBook = (name: string, date: string, time: string) => {
    bookingData.flightName = name;
    bookingData.flightDate = date;
    bookingData.flightTime = time;
    console.log('nameÇ:' + bookingData.flightName);
    toggleBookingVisibility();
  };
  const onPressSearch = (
    flightDirection: string,
    fromDate: Date,
    toDate: Date,
  ) => {
    setFlightList([]);
    dataProvider = new DataProvider((r1, r2) => false).cloneWithRows([]);
    let newRequest = getRequestObj(flightDirection, fromDate, toDate);
    fetchFlightList(getRequestURL(newRequest));
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

  const rowRenderer = (type: any, data: Flight) => {
    return (
      <FlightListItem
        onPressBook={(name, date, time) => onPressBook(name, date, time)}
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

  console.log('size:' + dataProvider.getSize());
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
      <ActionMenu
        onPressQRButton={() => setQRScannerVisible(true)}
        onPressSearch={onPressSearch}
      />
      <BookingDialog
        flightName={bookingData.flightName}
        scheduleDate={bookingData.flightDate}
        scheduleTime={bookingData.flightTime}
        isVisible={bookingIsVisible}
        onBackdropPress={toggleBookingVisibility}
      />

      <QRScannerDialog
        isVisible={QRScannerIsVisible}
        onBackdropPress={toggleQRScannerVisibility}
      />
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
