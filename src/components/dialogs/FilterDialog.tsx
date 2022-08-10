import React, {useState} from 'react';
import {Dropdown} from 'react-native-element-dropdown';
import {Dialog, Button, Icon, Divider, FAB} from '@rneui/themed';
import {StyleSheet, View, Platform, Alert} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Text} from '@rneui/base';

interface FilterDialogProps {
  isVisible: boolean;
  onBackdropPress(): void;
  onPressSearch(flightDirection: string, fromDate: Date, toDate: Date): void;
}

const FilterDialog: React.FC<FilterDialogProps> = (
  props: FilterDialogProps,
) => {
  const [flightDirection, setFlightDirection] = useState('');
  const [isFocus, setIsFocus] = useState(false);
  const [fromDate, setFromDate] = useState(new Date());
  const [showFromDate, setShowFromDate] = useState(false);
  const [toDate, setToDate] = useState(new Date());
  const [showToDate, setShowToDate] = useState(false);

  const data = [
    {label: 'Arrival', value: 'Arrival'},
    {label: 'Departure', value: 'Departure'},
    {label: 'Both', value: 'Both'},
  ];

  const onPressSearch = () => {
    let differenceBetweenDates =
      (toDate.getTime() - fromDate.getTime()) / (1000 * 3600 * 24);
    if (differenceBetweenDates > 2) {
      Alert.alert(
        '',
        'The date interval is not valid. Allowed days between the from and to dates is 3',
      );
    } else if (differenceBetweenDates < 0) {
      Alert.alert(
        '',
        'The date interval is not valid. To date must be bigger than or equal to from date',
      );
    } else {
      props.onPressSearch(flightDirection.substring(0, 1), fromDate, toDate);
    }
  };
  return (
    <Dialog isVisible={props.isVisible} onBackdropPress={props.onBackdropPress}>
      <Dialog.Title title="Filter" />
      <Dropdown
        style={[styles.dropdown, isFocus && {borderColor: 'steelblue'}]}
        data={data}
        maxHeight={200}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? 'ChooseDirection' : '...'}
        value={flightDirection}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          setFlightDirection(item.value);
          setIsFocus(false);
        }}
      />

      <Divider color="black" />

      <View
        style={{flexDirection: 'column', marginTop: 15, alignItems: 'stretch'}}>
        <Text
          style={{
            alignSelf: Platform.OS == 'ios' ? 'flex-start' : 'center',
            marginBottom: 5,
          }}>
          FROM
        </Text>
        {(showFromDate || Platform.OS == 'ios') && (
          <DateTimePicker
            style={{}}
            testID="dateTimePickerFrom"
            value={fromDate}
            mode={'date'}
            onChange={(event, date) => {
              setShowFromDate(false);
              setFromDate(date != undefined ? date : new Date());
            }}
          />
        )}
        {Platform.OS == 'android' && (
          <Button
            onPress={() => setShowFromDate(true)}
            radius={8}
            type="outline">
            <Icon
              containerStyle={{
                left: 7,
                position: 'absolute',
              }}
              name="date-range"
              color="steelblue"
            />
            {fromDate.toDateString()}
          </Button>
        )}
      </View>

      <View
        style={{
          flexDirection: 'column',
          marginTop: 5,
          marginBottom: 15,
          alignItems: 'stretch',
        }}>
        <Text
          style={{
            alignSelf: Platform.OS == 'ios' ? 'flex-start' : 'center',
            marginBottom: 5,
          }}>
          TO
        </Text>
        {(showToDate || Platform.OS == 'ios') && (
          <DateTimePicker
            testID="dateTimePickerTo"
            value={toDate}
            mode={'date'}
            onChange={(event, date) => {
              setShowToDate(false);
              setToDate(date != undefined ? date : new Date());
            }}
          />
        )}
        {Platform.OS == 'android' && (
          <Button
            color="secondary"
            onPress={() => setShowToDate(true)}
            radius={8}
            type="outline">
            <Icon
              containerStyle={{
                left: 7,
                position: 'absolute',
              }}
              name="date-range"
              color="steelblue"
            />
            {toDate.toDateString()}
          </Button>
        )}
      </View>

      <Divider color="black" />

      <FAB
        onPress={() => onPressSearch()}
        color="steelblue"
        style={{marginTop: 15}}
        icon={{name: 'search', color: 'white'}}
        size="small"
      />
    </Dialog>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 16,
  },
  dropdown: {
    marginBottom: 20,
    height: 40,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  dateContainer: {
    alignItems: 'center',
    backgroundColor: 'red',
  },
});

export default FilterDialog;
