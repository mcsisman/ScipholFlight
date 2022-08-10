import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Divider} from '@rneui/themed';

interface FlightListHeaderProps {
  height: number;
  width: number;
}
const FlightListHeader: React.FC<FlightListHeaderProps> = (
  props: FlightListHeaderProps,
) => {
  return (
    <View
      style={[styles.container, {height: props.height, width: props.width}]}>
      <View style={styles.directionContainer}>
        <Text>{'A/D'} </Text>
      </View>
      <Divider orientation="vertical" />
      <View style={styles.flightNoContainer}>
        <Text>{'No'} </Text>
      </View>
      <Divider orientation="vertical" />
      <View style={styles.nameContainer}>
        <Text>{'Name'} </Text>
      </View>
      <Divider orientation="vertical" />
      <View style={styles.dateTimeContainer}>
        <Text>{'Date & Time'} </Text>
      </View>
      <Divider orientation="vertical" />
      <View style={styles.detailsButton}>
        <Text>{'Book'} </Text>
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
    width: '20%',
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
  flightNoContainer: {
    //backgroundColor: 'green',
    height: '100%',
    width: '15%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  directionContainer: {
    //backgroundColor: 'pink',
    height: '100%',
    width: '15%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailsButton: {
    //backgroundColor: 'pink',
    height: '100%',
    width: '15%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default FlightListHeader;
