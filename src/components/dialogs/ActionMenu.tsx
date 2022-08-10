import React, {useState} from 'react';
import {SpeedDial} from '@rneui/themed';

import FilterDialog from './FilterDialog';

import {StyleSheet} from 'react-native';

interface ActionMenuProps {
  onPressSearch(flightDirection: string, fromDate: Date, toDate: Date): void;
  onPressQRButton(): void;
}
const ActionMenu: React.FC<ActionMenuProps> = (props: ActionMenuProps) => {
  const [speedDialOpen, setSpeedDialOpen] = useState(false);
  const [filterDialogVisible, setFilterDialogVisible] = useState(false);

  const toggleFilterDialog = () => {
    setFilterDialogVisible(!filterDialogVisible);
  };
  const onPressSearch = (
    flightDirection: string,
    fromDate: Date,
    toDate: Date,
  ) => {
    props.onPressSearch(flightDirection, fromDate, toDate);
    toggleFilterDialog();
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
        onPress={props.onPressQRButton}
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

export default ActionMenu;
