import React, {useState, useEffect} from 'react';
import {Divider} from '@rneui/themed';
import {RecyclerListView, DataProvider, LayoutProvider} from 'recyclerlistview';
import MyFlightsListHeader from '../components/list_components/MyFlightsListHeader';
import {WINDOW_WIDTH, WINDOW_HEIGHT} from '../utils/utils';
import MyFlightsListItem from '../components/list_components/MyFlightsListItem';
import {getData} from '../utils/LocalStorage';
import {Flight} from '../utils/Flight';
import {useIsFocused} from '@react-navigation/native';

import {StyleSheet, SafeAreaView, Text} from 'react-native';

const MyFlights: React.FC = () => {
  const [flightList, setFlightList] = useState<Flight[]>([]);
  const isFocused = useIsFocused();
  useEffect(() => {
    const fetchFlightList = async () => {
      let arr = await getData('myFlights');
      if (!arr) return;
      setFlightList(arr);
      dataProvider = new DataProvider((r1, r2) => r1 !== r2).cloneWithRows(
        flightList,
      );
    };
    fetchFlightList();
  }, [isFocused]);

  var dataProvider: DataProvider = new DataProvider(
    (r1, r2) => r1 !== r2,
  ).cloneWithRows(flightList);

  const layoutProvider = new LayoutProvider(
    i => {
      return i;
    },
    (type, dim) => {
      switch (type) {
        default:
          dim.width = WINDOW_WIDTH;
          dim.height = WINDOW_HEIGHT / 12;
      }
    },
  );
  const rowRenderer = (type: any, data: any) => {
    return (
      <MyFlightsListItem
        height={WINDOW_HEIGHT / 12}
        width={WINDOW_WIDTH}
        flightName={data.flightName}
        scheduleDate={data.date}
        scheduleTime={data.time}
        seat={data.seat}
        name={data.name}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <MyFlightsListHeader width={WINDOW_WIDTH} height={WINDOW_HEIGHT / 15} />
      <Divider color={'black'} />
      {dataProvider.getSize() != 0 && (
        <RecyclerListView
          style={{flex: 1}}
          layoutProvider={layoutProvider}
          dataProvider={dataProvider}
          rowRenderer={rowRenderer}
        />
      )}
      {dataProvider.getSize() == 0 && <Text> No data!</Text>}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
});

export default MyFlights;
