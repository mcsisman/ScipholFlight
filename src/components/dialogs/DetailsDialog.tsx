import React from 'react';
import {Dialog, Divider} from '@rneui/themed';
import {StyleSheet, Text} from 'react-native';
import {Flight} from '../../utils/Flight';

interface DetailsDialogProps {
  isVisible?: boolean;
  onBackdropPress?(): void;
  terminal?: number;
  gate?: string;
  date?: string;
  time?: string;
  seat?: string;
  flightName?: string;
  bookedBy?: string;
}
const DetailsDialog: React.FC<DetailsDialogProps> = (
  props: DetailsDialogProps,
) => {
  return (
    <Dialog isVisible={props.isVisible} onBackdropPress={props.onBackdropPress}>
      <Dialog.Title
        title={
          props.seat === '' || props.seat === undefined
            ? 'Details of Flight ' + props.flightName
            : 'Details of Booked Flight:' + props.flightName
        }
      />
      <Divider color="black" />

      {props.terminal && (
        <Text style={styles.textStyle}>{'Terminal: ' + props.terminal}</Text>
      )}
      {props.gate && (
        <Text style={styles.textStyle}>{'Gate: ' + props.gate}</Text>
      )}
      {props.seat != '' && props.seat != undefined && (
        <Text style={styles.textStyle}>{'Seat: ' + props.seat}</Text>
      )}
      {props.bookedBy != '' && props.bookedBy != undefined && (
        <Text style={styles.textStyle}>{'Booked by: ' + props.bookedBy}</Text>
      )}

      <Text style={styles.textStyle}>{'Scheduled Date: ' + props.date}</Text>
      <Text style={styles.textStyle}>{'Scheduled Time: ' + props.time}</Text>
    </Dialog>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    marginVertical: 5,
  },
});
export default DetailsDialog;
