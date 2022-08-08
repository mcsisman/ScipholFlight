import React, {useEffect, useState, useMemo} from 'react';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import {Divider, SpeedDial} from '@rneui/themed';
import {convertDateToYYMMDD} from '../utils/DateHelper';

import {getRequestURL, Request} from '../utils/FlightRequest';
import {
  FLIGHT_APP_KEY,
  FLIGHT_APP_ID,
  WINDOW_WIDTH,
  WINDOW_HEIGHT,
} from '../utils/utils';
import FlightListItem from '../components/FlightListItem';
import FlightListHeader from '../components/FlightListHeader';
import {Flight} from '../utils/Flight';
import FilterDialog from './FilterDialog';

import {
  StatusBar,
  StyleSheet,
  Text,
  ListRenderItem,
  SafeAreaView,
  FlatList,
  View,
} from 'react-native';

interface ActionMenuProps {
  onPressSearch(flightDirection: string, fromDate: Date, toDate: Date): string;
}
const ActionMenu: React.FC<ActionMenuProps> = (props: ActionMenuProps) => {
  const [speedDialOpen, setSpeedDialOpen] = useState(false);
  const [filterDialogVisible, setFilterDialogVisible] = useState(false);

  const toggleFilterDialog = () => {
    setFilterDialogVisible(!filterDialogVisible);

    return '';
  };
  const onPressSearch = (
    flightDirection: string,
    fromDate: Date,
    toDate: Date,
  ) => {
    props.onPressSearch(flightDirection, fromDate, toDate);
    toggleFilterDialog();
    return '';
  };
  return (
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
      <FilterDialog
        onPressSearch={(flightDirection, fromDate, toDate) =>
          onPressSearch(flightDirection, fromDate, toDate)
        }
        isVisible={filterDialogVisible}
        onBackdropPress={() => toggleFilterDialog()}
      />
    </SpeedDial>
  );
};

const styles = StyleSheet.create({});

export default ActionMenu;
