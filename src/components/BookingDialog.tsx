import React, {useState, type PropsWithChildren} from 'react';
import {Dropdown} from 'react-native-element-dropdown';
import {Dialog, Button, Divider, Input} from '@rneui/themed';
import {Alert, StyleSheet, Text, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
    let arr = await AsyncStorage.getAllKeys();
    (await arr).forEach(element => console.log('lement:' + element));
    if (name === '' || selectedSeat === -1) {
      Alert.alert('', 'Please fill every field!');
      return;
    }
    if (await getData(props.flightName)) {
      Alert.alert('', 'You already booked this flight!');
      return;
    }
    await storeData(
      {date: props.scheduleDate, time: props.scheduleTime, seat: selectedSeat},
      props.flightName,
    );
    setShowQR(true);
  };
  const storeData = async (value: any, key: string) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
      // saving error
    }
  };
  const getData = async (key: string) => {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
    }
  };

  return (
    <Dialog isVisible={props.isVisible} onBackdropPress={props.onBackdropPress}>
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
