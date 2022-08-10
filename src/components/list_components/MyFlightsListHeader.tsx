import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Divider} from '@rneui/themed';

interface MyFlightsListHeaderProps {
  height: number;
  width: number;
}
const MyFlightsListHeader: React.FC<MyFlightsListHeaderProps> = (
  props: MyFlightsListHeaderProps,
) => {
  return (
    <View
      style={[styles.container, {height: props.height, width: props.width}]}>
      <View style={styles.nameContainer}>
        <Text>{'Flight Name'} </Text>
      </View>

      <Divider orientation="vertical" />

      <View style={styles.seatContainer}>
        <Text>{'Seat'} </Text>
      </View>
      <Divider orientation="vertical" />

      <View style={styles.userNameContainer}>
        <Text>{'Booked by'} </Text>
      </View>
      <Divider orientation="vertical" />
      <View style={styles.dateTimeContainer}>
        <Text>{'Date & Time'} </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  nameContainer: {
    //backgroundColor: 'red',
    height: '100%',
    width: '25%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateTimeContainer: {
    //backgroundColor: 'blue',
    height: '100%',
    width: '35%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  userNameContainer: {
    //backgroundColor: 'red',
    height: '100%',
    width: '25%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  seatContainer: {
    //backgroundColor: 'red',
    height: '100%',
    width: '15%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MyFlightsListHeader;
