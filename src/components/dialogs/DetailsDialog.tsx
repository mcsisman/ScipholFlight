import React from 'react';
import {Dialog, Divider} from '@rneui/themed';
import {StyleSheet, Text} from 'react-native';
import {Flight} from '../../utils/Flight';

interface DetailsDialogProps {
  isVisible?: boolean;
  onBackdropPress?(): void;
  flightData?: Flight;
}
const DetailsDialog: React.FC<DetailsDialogProps> = (
  props: DetailsDialogProps,
) => {
  return (
    <Dialog isVisible={props.isVisible} onBackdropPress={props.onBackdropPress}>
      <Dialog.Title
        title={'Details of Flight ' + props.flightData?.flightName}
      />
      <Divider color="black" />

      {props.flightData?.terminal && (
        <Text style={styles.textStyle}>
          {'Terminal: ' + props.flightData?.terminal}
        </Text>
      )}
      {props.flightData?.gate && (
        <Text style={styles.textStyle}>
          {'Gate: ' + props.flightData?.gate}
        </Text>
      )}

      <Text style={styles.textStyle}>
        {'Scheduled Date: ' + props.flightData?.scheduleDate}
      </Text>
      <Text style={styles.textStyle}>
        {'Scheduled Time: ' + props.flightData?.scheduleTime}
      </Text>
    </Dialog>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    marginVertical: 5,
  },
});
export default DetailsDialog;
