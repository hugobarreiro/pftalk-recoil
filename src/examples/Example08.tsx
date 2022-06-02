import React, { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

import {
  atom,
  atomFamily,
  DefaultValue,
  selector,
  selectorFamily,
  useRecoilCallback,
  useRecoilValue,
} from 'recoil';

const valueStoredFamily = atomFamily<string, string>({
  default: '',
  key: 'Example08/ValueStored',
});

const keysStoredAtom = atom<string[]>({
  default: [],
  key: 'Example08/KeysStored',
});

const valueFamily = selectorFamily<string, string>({
  get:
    (key) =>
    ({ get }) =>
      get(valueStoredFamily(key)),
  key: 'Example08/Value',
  set:
    (key) =>
    ({ get, set, reset }, value) => {
      if (value instanceof DefaultValue) {
        set(keysStoredAtom, (prev) => {
          return prev.filter((k) => k !== key);
        });
        reset(valueStoredFamily(key));
      } else {
        if (!get(keysStoredAtom).includes(key)) {
          set(keysStoredAtom, (prev) => [...prev, key]);
        }
        set(valueStoredFamily(key), value);
      }
    },
});

const allValuesStored = selector<Record<string, string>>({
  get: ({ get }) => {
    const keys = get(keysStoredAtom);
    return keys.reduce(
      (record, key) => ({
        ...record,
        [key]: get(valueFamily(key)),
      }),
      {},
    );
  },
  key: 'Example08/AllValues',
});

const AddForm: React.FC = () => {
  const [key, setKey] = useState<string>('');
  const [value, setValue] = useState<string>('');

  const submit = useRecoilCallback(
    ({ set }) =>
      () => {
        set(valueFamily(key), value);
        setKey('');
        setValue('');
      },
    [key, value],
  );

  return (
    <View style={styles.contentContainer}>
      <Text style={styles.titleText}>{'Add/Change stuff'}</Text>
      <View style={styles.rowContainer}>
        <Text style={styles.labelText}>{'Key'}</Text>
        <TextInput style={styles.inputText} value={key} onChangeText={setKey} />
      </View>
      <View style={styles.rowContainer}>
        <Text style={styles.labelText}>{'Value'}</Text>
        <TextInput
          style={styles.inputText}
          value={value}
          onChangeText={setValue}
        />
      </View>
      <Button title={'Submit'} onPress={submit} />
    </View>
  );
};

const DeleteForm: React.FC = () => {
  const [key, setKey] = useState<string>('');
  const submit = useRecoilCallback(
    ({ reset }) =>
      () => {
        reset(valueFamily(key));
        setKey('');
      },
    [key],
  );

  return (
    <View style={styles.contentContainer}>
      <Text style={styles.titleText}>{'Delete stuff'}</Text>
      <View style={styles.rowContainer}>
        <Text style={styles.labelText}>{'Key'}</Text>
        <TextInput style={styles.inputText} value={key} onChangeText={setKey} />
      </View>
      <Button title={'Submit'} onPress={submit} />
    </View>
  );
};

const AllData: React.FC = () => {
  const all = useRecoilValue(allValuesStored);

  return (
    <Text style={styles.storedText}>{JSON.stringify(all, undefined, 4)}</Text>
  );
};

const Example08: React.FC = () => {
  return (
    <View style={styles.container}>
      <AddForm />
      <DeleteForm />
      <AllData />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'space-around',
    paddingHorizontal: 40,
    paddingVertical: 50,
  },
  contentContainer: {
    borderColor: 'black',
    borderRadius: 10,
    borderWidth: 2,
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  inputText: {
    borderColor: 'black',
    borderRadius: 10,
    borderWidth: 1,
    color: 'black',
    fontSize: 25,
    paddingHorizontal: 5,
    width: 250,
  },
  labelText: {
    color: 'black',
    fontSize: 20,
    paddingHorizontal: 5,
    textAlign: 'right',
    textAlignVertical: 'center',
    width: 80,
  },
  rowContainer: {
    flexDirection: 'row',
  },
  storedText: {
    color: 'black',
    fontSize: 20,
  },
  titleText: {
    color: 'black',
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Example08;
