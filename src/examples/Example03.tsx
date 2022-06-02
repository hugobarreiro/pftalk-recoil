import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

import { atomFamily, selector, useRecoilState, useRecoilValue } from 'recoil';

type TFields = 'firstName' | 'lastName';

const userAtom = atomFamily<string, TFields>({
  default: '',
  key: 'Example03/User',
});

const fullNameSelector = selector<string>({
  get: ({ get }) => {
    const first = get(userAtom('firstName'));
    const last = get(userAtom('lastName'));

    return `${first}${first && last ? ' ' : ''}${last}`;
  },
  key: 'Example03/FullName',
});

interface IInputProps {
  field: TFields;
  label: string;
}

const Input: React.FC<IInputProps> = ({ field, label }) => {
  const [text, setText] = useRecoilState(userAtom(field));
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.inputLabel}>{label}</Text>
      <TextInput
        editable={true}
        style={styles.inputText}
        value={text}
        onChangeText={setText}
      />
    </View>
  );
};

const FullNameText: React.FC = () => {
  const fullName = useRecoilValue(fullNameSelector);
  return <Text style={styles.fullnameText}>{fullName}</Text>;
};

const Example03: React.FC = () => {
  return (
    <View style={styles.container}>
      <Input field={'firstName'} label={'First'} />
      <Input field={'lastName'} label={'Last'} />
      <FullNameText />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  fullnameText: {
    color: 'black',
    fontSize: 32,
    fontWeight: 'bold',
  },
  inputContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  inputLabel: {
    color: 'black',
    fontSize: 25,
    paddingHorizontal: 5,
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
});

export default Example03;
