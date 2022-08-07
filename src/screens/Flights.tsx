import React, {useEffect, useState} from 'react';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import {Divider, SpeedDial} from '@rneui/themed';
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
  StatusBar,
  StyleSheet,
  Text,
  ListRenderItem,
  SafeAreaView,
  FlatList,
} from 'react-native';

const Flights: React.FC = () => {
  const [flightList, setFlightList] = useState<Flight[]>([]);
  const tabBarHeight = useBottomTabBarHeight();
  const [filterDialogVisible, setFilterDialogVisible] = useState(false);
  const [speedDialOpen, setSpeedDialOpen] = React.useState(false);
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
        height={WINDOW_HEIGHT / 12}
        flightDirection={flightList[item.index].flightDirection}
        flightName={flightList[item.index].flightName}
        flightNumber={flightList[item.index].flightNumber.toString()}
        scheduleDate={flightList[item.index].scheduleDate}
        scheduleTime={flightList[item.index].scheduleTime}
      />
    );
  };

  return (
    <SafeAreaView style={[styles.container, {marginBottom: tabBarHeight - 8}]}>
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

      <SpeedDial
        color="steelblue"
        isOpen={speedDialOpen}
        icon={{name: 'edit', color: 'white'}}
        openIcon={{name: 'close', color: 'white'}}
        onOpen={() => setSpeedDialOpen(!speedDialOpen)}
        onClose={() => setSpeedDialOpen(!speedDialOpen)}>
        <SpeedDial.Action
          color="steelblue"
          icon={{name: 'filter-list', color: 'white'}}
          onPress={() => {
            toggleFilterDialog();
            setSpeedDialOpen(!speedDialOpen);
          }}
        />
        <SpeedDial.Action
          color="steelblue"
          icon={{name: 'qr-code-scanner', color: 'white'}}
          onPress={() => console.log('Delete Something')}
        />
      </SpeedDial>

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
  },
});

export default Flights;
