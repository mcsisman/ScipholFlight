import React, {useEffect, type PropsWithChildren} from 'react';
import QRCode from 'react-native-qrcode-svg';
import {StatusBar, StyleSheet, Text, View} from 'react-native';
const MyFlights: React.FC = () => {
  return <QRCode value="http://awesome.link.qr" />;
};

const styles = StyleSheet.create({});

export default MyFlights;
