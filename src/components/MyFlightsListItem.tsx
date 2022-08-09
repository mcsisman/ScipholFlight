import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
interface MyFlightListItemProps {
  height?: number;
  width?: number;
  flightName: string;
  scheduleDate: string;
  scheduleTime: string;
  seat: string;
  name: string;
}
const MyFlightsListItem: React.FC<MyFlightListItemProps> = (
  props: MyFlightListItemProps,
) => {
  const onPressDetails = () => {
    console.log('ON PRESS DETAILS');
  };
  return (
    <View style={[styles.container]}>
      <View style={styles.nameContainer}>
        <Text>{props.flightName} </Text>
      </View>

      <View style={styles.seatContainer}>
        <Text>{props.seat} </Text>
      </View>

      <View style={styles.userNameContainer}>
        <Text>{props.name} </Text>
      </View>
      <View style={styles.dateTimeContainer}>
        <Text>{props.scheduleDate} </Text>
        <Text>{props.scheduleTime} </Text>
      </View>
    </View>
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

export default MyFlightsListItem;
