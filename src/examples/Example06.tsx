import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { selector, useRecoilRefresher_UNSTABLE, useRecoilValue } from 'recoil';

const getlessSelector = selector<Date>({
  get: () => new Date(),
  key: 'Example06/GetlessSelector',
});

const RefreshPill: React.FC = () => {
  const refresh = useRecoilRefresher_UNSTABLE(getlessSelector);
  return (
    <TouchableOpacity style={styles.pill} onPress={refresh}>
      <Text style={styles.pillText}>{'Refresh'}</Text>
    </TouchableOpacity>
  );
};

const Example06: React.FC = () => {
  const date = useRecoilValue(getlessSelector);

  return (
    <View style={styles.container}>
      <Text
        style={styles.dateText}
      >{`Last Updated: ${date.toISOString()}`}</Text>
      <RefreshPill />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  dateText: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  pill: {
    align: 'center',
    backgroundColor: 'grey',
    borderColor: 'transparent',
    borderRadius: 15,
    borderWidth: 1,
    marginHorizontal: 20,
    marginVertical: 10,
    width: 200,
  },
  pillText: {
    color: 'white',
    fontSize: 25,
    lineHeight: 30,
    textAlign: 'center',
  },
});

export default Example06;
