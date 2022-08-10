import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
interface FlightListItemProps {
  height?: number;
  width?: number;
  flightDirection: string;
  flightName: string;
  flightNumber: string;
  scheduleDate: string;
  scheduleTime: string;
  flightId: string;
  onPressBook(
    flightName: string,
    scheduleDate: string,
    scheduleTime: string,
  ): void;
  onPressDetails(flightId: string): void;
}
const FlightListItem: React.FC<FlightListItemProps> = (
  props: FlightListItemProps,
) => {
  const onPressBook = () => {
    if (props.flightDirection == 'D') {
      props.onPressBook(
        props.flightName,
        props.scheduleDate,
        props.scheduleTime,
      );
    }
  };
  return (
    <TouchableOpacity
      onPress={() => props.onPressDetails(props.flightId)}
      activeOpacity={1}
      style={[styles.container]}>
      <View style={styles.directionContainer}>
        <MaterialIcons
          name={
            props.flightDirection === 'A' ? 'flight-land' : 'flight-takeoff'
          }
          size={25}
          color={'steelblue'}
        />
      </View>
      <View style={styles.flightNoContainer}>
        <Text>{props.flightNumber} </Text>
      </View>

      <View style={styles.nameContainer}>
        <Text>{props.flightName} </Text>
      </View>

      <View style={styles.dateTimeContainer}>
        <Text>{props.scheduleDate} </Text>
        <Text>{props.scheduleTime} </Text>
      </View>

      <TouchableOpacity
        activeOpacity={1}
        onPress={() => onPressBook()}
        style={styles.detailsButton}>
        <MaterialIcons
          name={'add-shopping-cart'}
          size={25}
          color={'cadetblue'}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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

export default FlightListItem;
