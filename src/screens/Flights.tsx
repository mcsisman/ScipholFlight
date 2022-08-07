import React, {useEffect, useState} from 'react';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import {FAB, Divider, Dialog} from '@rneui/themed';
import {
  FLIGHT_APP_KEY,
  FLIGHT_APP_ID,
  WINDOW_WIDTH,
  WINDOW_HEIGHT,
} from '../utils/utils';
import FlightListItem from '../components/FlightListItem';
import FlightListHeader from '../components/FlightListHeader';
import {Flight} from '../utils/Flight';
import FilterDialog from '../components/FilterDialog';

import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  ListRenderItem,
  View,
  FlatList,
} from 'react-native';

const Flights: React.FC = () => {
  const [flightList, setFlightList] = useState<Flight[]>([]);
  const tabBarHeight = useBottomTabBarHeight();
  const [filterDialogVisible, setFilterDialogVisible] = useState(false);
  const toggleFilterDialog = () => {
    setFilterDialogVisible(!filterDialogVisible);
    return '';
  };
  const testApi = () => {
    const data = {flightDirection: 'D', page: '0'};
    let URL: string = 'https://api.schiphol.nl/public-flights/flights?';
    URL += 'flightDirection=' + encodeURIComponent(data.flightDirection);
    URL += '&page=' + encodeURIComponent(data.page);
    console.log('URL:' + URL);
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
      .then(response => response.json())
      .then(data => {
        setFlightList(data.flights);
        console.log('data arrived');
        //console.log(data.flights[0]);
      })
      .catch(error => console.log('err:' + error));
  };

  useEffect(() => testApi(), []);

  const renderItem: ListRenderItem<Flight> = item => {
    return (
      <FlightListItem
        width={WINDOW_WIDTH}
        height={WINDOW_HEIGHT / 10}
        flightDirection={flightList[item.index].flightDirection}
        flightName={flightList[item.index].flightName}
        flightNumber={flightList[item.index].flightNumber.toString()}
        scheduleDate={flightList[item.index].scheduleDate}
        scheduleTime={flightList[item.index].scheduleTime}
      />
    );
  };

  return (
    <SafeAreaView style={[styles.container, {paddingBottom: tabBarHeight}]}>
      <FlightListHeader width={WINDOW_WIDTH} height={WINDOW_HEIGHT / 15} />
      <Divider color={'black'} />

      <FlatList
        data={flightList}
        renderItem={renderItem}
        ItemSeparatorComponent={() => (
          <Divider inset={true} insetType={'right'} color={'steelblue'} />
        )}
        keyExtractor={item => item.id}
      />

      <FAB
        style={[styles.QRButton, {paddingBottom: tabBarHeight}]}
        color={'steelblue'}
        icon={{name: 'qr-code-scanner', color: 'white'}}
      />
      <FAB
        onPress={toggleFilterDialog}
        style={[styles.filterButton, {paddingBottom: tabBarHeight}]}
        color={'steelblue'}
        icon={{name: 'filter-list', color: 'white'}}
      />
      <FilterDialog
        isVisible={filterDialogVisible}
        onBackdropPress={() => toggleFilterDialog()}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    display: 'flex',
  },
  QRButton: {
    left: 25,
    alignSelf: 'center',
    position: 'absolute',
    bottom: 5,
  },
  filterButton: {
    right: 25,
    alignSelf: 'center',
    position: 'absolute',
    bottom: 5,
  },
});

export default Flights;
