import React, {useEffect, useState} from 'react';
import {BarCodeScanner} from 'expo-barcode-scanner';
import {Dialog, Button, Divider} from '@rneui/themed';
import {StyleSheet} from 'react-native';

interface QRScannerDialogProps {
  isVisible?: boolean;
  onBackdropPress?(): void;
}
const QRScannerDialog: React.FC<QRScannerDialogProps> = (
  props: QRScannerDialogProps,
) => {
  const [hasPermission, setHasPermission] = useState(false);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const {status} = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };
    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = ({type, data}: any) => {
    setScanned(true);
    console.log(
      `Bar code with type ${type} and data ${data} has been scanned!`,
    );
  };

  return (
    <Dialog isVisible={props.isVisible} onBackdropPress={props.onBackdropPress}>
      <Dialog.Title title={'QR SCANNER'} />
      <Divider color="black" />

      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={styles.QRScanner}
      />

      {scanned && (
        <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />
      )}
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
