import React, {useEffect, useState} from 'react';
import {BarCodeScanner} from 'expo-barcode-scanner';
import {Dialog, Divider} from '@rneui/themed';
import {StyleSheet} from 'react-native';
import {getData} from '../../utils/LocalStorage';
import DetailsDialog from './DetailsDialog';

interface QRScannerDialogProps {
  isVisible?: boolean;
  onBackdropPress?(): void;
  onFoundFlight?(flight: any): any;
}
const QRScannerDialog: React.FC<QRScannerDialogProps> = (
  props: QRScannerDialogProps,
) => {
  const [hasPermission, setHasPermission] = useState(false);
  const [scanned, setScanned] = useState(false);
  const [scannedFlight, setScannedFlight] = useState<any>();
  const [detailsIsVisible, setDetailsIsVisible] = useState(false);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const {status} = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };
    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = ({type, data}: any) => {
    findScannedFlight(data);
  };

  const findScannedFlight = async (flightName: string) => {
    let bookedFlights = await getData('myFlights');
    let flight;
    setScanned(true);
    await bookedFlights?.find((element: any) => {
      element.flightName === flightName;
      flight = element;
    });
    if (flight) {
      setScannedFlight(flight);
      setDetailsIsVisible(true);
    }
  };

  return (
    <Dialog isVisible={props.isVisible} onBackdropPress={props.onBackdropPress}>
      <Dialog.Title title={'QR SCANNER'} />
      <Divider color="black" />

      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={styles.QRScanner}
      />
      <DetailsDialog
        seat={scannedFlight?.seat}
        bookedBy={scannedFlight?.name}
        date={scannedFlight?.date}
        time={scannedFlight?.time}
        flightName={scannedFlight?.flightName}
        isVisible={detailsIsVisible}
        onBackdropPress={() => {
          setDetailsIsVisible(false), setScanned(false);
        }}
      />
    </Dialog>
  );
};

const styles = StyleSheet.create({
  QRScanner: {
    marginTop: 20,
    height: '60%',
  },
});
export default QRScannerDialog;
