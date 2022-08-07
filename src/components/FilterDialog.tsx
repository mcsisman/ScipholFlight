import React, {useState, type PropsWithChildren} from 'react';
import {Dropdown} from 'react-native-element-dropdown';
import {Dialog, Button, Icon, Divider} from '@rneui/themed';
import {StyleSheet, View, Platform} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Text} from '@rneui/base';

interface FilterDialogProps {
  isVisible: boolean;
  onBackdropPress(): string;
}

const FilterDialog: React.FC<FilterDialogProps> = (
  props: FilterDialogProps,
) => {
  const [value, setValue] = useState(null);
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
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          setValue(item.value);
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
        style={{flexDirection: 'column', marginTop: 5, alignItems: 'stretch'}}>
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
