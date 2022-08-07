import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
interface FlightListItemProps {
  height: number;
  width: number;
  flightDirection: string;
  flightName: string;
  flightNumber: string;
  scheduleDate: string;
  scheduleTime: string;
}
const FlightListItem: React.FC<FlightListItemProps> = (
  props: FlightListItemProps,
) => {
  const onPressBook = () => {
    console.log('ON PRESS BOOK');
    console.log(props.flightNumber);
  };

  const onPressDetails = () => {
    console.log('ON PRESS DETAILS');
    console.log(props.flightNumber);
  };

  console.log('item: ' + props.flightNumber);
  return (
    <TouchableOpacity
      onPress={onPressDetails}
      activeOpacity={1}
      style={[styles.container, {height: props.height, width: props.width}]}>
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
        onPress={onPressBook}
        style={styles.detailsButton}>
        <MaterialIcons
          name={props.flightDirection === 'D' ? 'add-shopping-cart' : ''}
          size={25}
          color={'cadetblue'}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
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

export default FlightListItem;
