import React, { useCallback, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import {
  atom,
  useRecoilCallback,
  useRecoilValue,
  useSetRecoilState,
} from 'recoil';

const currentValueAtom = atom<number>({
  default: 0,
  key: 'Example07/CurrentValue',
});

interface IRenderDateComponentProps {
  onPress?: () => void;
  title: string;
  value: number;
}

const RenderDateComponent: React.FC<IRenderDateComponentProps> = ({
  title,
  onPress,
  value,
}) => {
  return (
    <View style={styles.contentContainer}>
      <Text style={styles.titleText}>{`${title}: ${value}`}</Text>
      <Text style={styles.dateText}>{new Date().toISOString()}</Text>
      {onPress && (
        <TouchableOpacity style={styles.pill} onPress={onPress}>
          <Text style={styles.pillText}>{'Refresh'}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const SubscriberComponent: React.FC = () => {
  const value = useRecoilValue(currentValueAtom);
  return <RenderDateComponent title={'Subscriber'} value={value} />;
};

const UnsubscriberComponent: React.FC = () => {
  const [value, setValue] = useState<number>(0);
  const handlePress = useRecoilCallback(
    ({ snapshot }) =>
      async () => {
        setValue(await snapshot.getPromise(currentValueAtom));
      },
    [],
  );
  return (
    <RenderDateComponent
      title={'Unsubscriber'}
      value={value}
      onPress={handlePress}
    />
  );
};

const UpdateDate: React.FC = () => {
  const updateDate = useSetRecoilState(currentValueAtom);
  const handlePress = useCallback(() => {
    updateDate(Math.ceil(Math.random() * 1000));
  }, [updateDate]);
  return (
    <TouchableOpacity style={styles.pill} onPress={handlePress}>
      <Text style={styles.pillText}>{'Update value'}</Text>
    </TouchableOpacity>
  );
};

const Example07: React.FC = () => {
  return (
    <View style={styles.container}>
      <SubscriberComponent />
      <UnsubscriberComponent />
      <UpdateDate />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  contentContainer: {
    borderColor: 'black',
    borderRadius: 10,
    borderWidth: 2,
    paddingHorizontal: 20,
  },
  dateText: {
    color: 'black',
    fontSize: 15,
    textAlign: 'center',
  },
  pill: {
    align: 'center',
    backgroundColor: 'grey',
    borderColor: 'transparent',
    borderRadius: 15,
    borderWidth: 1,
    marginVertical: 10,
    width: 200,
  },
  pillText: {
    color: 'white',
    fontSize: 15,
    lineHeight: 30,
    textAlign: 'center',
  },
  titleText: {
    color: 'black',
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Example07;
