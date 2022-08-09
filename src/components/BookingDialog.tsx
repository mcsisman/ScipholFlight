import React, {useState, type PropsWithChildren} from 'react';
import {Dropdown} from 'react-native-element-dropdown';
import {Dialog, Button, Divider, Input} from '@rneui/themed';
import {Alert, StyleSheet, Text, View} from 'react-native';
import {storeData, getData} from '../utils/LocalStorage';
import QRCode from 'react-native-qrcode-svg';

interface BookingDialogProps {
  isVisible: boolean;
  onBackdropPress(): void;
  flightName: string;
  scheduleDate: string;
  scheduleTime: string;
}

const BookingDialog: React.FC<BookingDialogProps> = (
  props: BookingDialogProps,
) => {
  const [isFocus, setIsFocus] = useState(false);
  const [selectedSeat, setSelectedSeat] = useState(-1);
  const [showQR, setShowQR] = useState(false);
  const [name, setName] = useState('');
  const seatArray = (n: number) => {
    let seatArray = new Array();
    for (let i = 0; i < n; i++) {
      seatArray[i] = {label: (i + 1).toString(), value: (i + 1).toString()};
    }
    return seatArray;
  };

  const dropdownData = seatArray(100);
  const onPressBookingComplete = async () => {
    let myFlightList = await getData('myFlights');
    if (name === '' || selectedSeat === -1) {
      Alert.alert('', 'Please fill every field!');
      return;
    }
    let flag: boolean = false;
    myFlightList?.forEach((element: any) => {
      if (
        element.flightName == props.flightName &&
        element.seat == selectedSeat
      )
        flag = true;
    });
    if (flag) {
      Alert.alert('', 'You already booked this seat for the flight!');
      return;
    }
    await storeData(
      {
        flightName: props.flightName,
        date: props.scheduleDate,
        time: props.scheduleTime,
        seat: selectedSeat,
        name: name,
      },
      'myFlights',
    );
    setShowQR(true);
  };

  const onBackdropPress = () => {
    setSelectedSeat(-1);
    setShowQR(false);
    props.onBackdropPress;
  };
  return (
    <Dialog isVisible={props.isVisible} onBackdropPress={onBackdropPress}>
      <Dialog.Title title={'Booking for Flight: ' + props.flightName} />
      <Divider color="black" />

      <Text style={{marginVertical: 5}}>{'Date: ' + props.scheduleDate}</Text>
      <Text style={{marginVertical: 5}}>{'Time: ' + props.scheduleTime}</Text>
      <Divider color="black" />
      <Input placeholder="Full Name" onChangeText={value => setName(value)} />
      <Divider color="black" />
      <Dropdown
        style={[styles.dropdown, isFocus && {borderColor: 'steelblue'}]}
        data={dropdownData}
        maxHeight={200}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? 'Choose Seat' : '...'}
        value={selectedSeat}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item: any) => {
          setSelectedSeat(item.value);
          setIsFocus(false);
        }}
      />

      {showQR && (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 20,
          }}>
          <QRCode value={props.flightName} />
          <Text style={{marginTop: 10, color: 'limegreen'}}>
            Please save your QR code!
          </Text>
        </View>
      )}
      <Button onPress={onPressBookingComplete} color={'steelblue'}>
        Book!
      </Button>
    </Dialog>
  );
};

const styles = StyleSheet.create({
  dropdown: {
    marginTop: 20,
    marginBottom: 20,
    height: 40,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
});

export default BookingDialog;
