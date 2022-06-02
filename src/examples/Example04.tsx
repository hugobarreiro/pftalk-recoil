import React, { useCallback } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

import {
  atom,
  selector,
  selectorFamily,
  useRecoilState,
  useRecoilValue,
} from 'recoil';

const numberTypeAtom = atom<number>({
  default: 0,
  key: 'Example04/numberTyped',
});

const isDivisibleBySelector = selectorFamily<boolean, number>({
  get:
    (divisor) =>
    ({ get }) =>
      !(get(numberTypeAtom) % divisor),
  key: 'Example04/IsDivisbleBy',
});

const isPrimeSelector = selector<boolean>({
  get: ({ get }) => {
    const typed = get(numberTypeAtom);
    if (typed < 2) {
      return false;
    }
    for (let div = 2; div < Math.sqrt(typed); div++) {
      if (get(isDivisibleBySelector(div))) {
        return false;
      }
    }
    return true;
  },
  key: 'Example04/IsPrime',
});

interface IDivisiblePillProps {
  divisor: number;
}

const DivisiblePill: React.FC<IDivisiblePillProps> = ({ divisor }) => {
  const isDivisible = useRecoilValue(isDivisibleBySelector(divisor));
  return (
    <View style={[styles.pill, isDivisible && styles.pillSelected]}>
      <Text style={styles.pillText}>{divisor}</Text>
    </View>
  );
};

const DivisibleBoard: React.FC = () => {
  return (
    <View style={styles.pillBoard}>
      <DivisiblePill divisor={2} />
      <DivisiblePill divisor={3} />
      <DivisiblePill divisor={4} />
      <DivisiblePill divisor={5} />
      <DivisiblePill divisor={6} />
      <DivisiblePill divisor={7} />
      <DivisiblePill divisor={8} />
      <DivisiblePill divisor={9} />
      <DivisiblePill divisor={10} />
    </View>
  );
};

const PrimeFlag: React.FC = () => {
  const isPrime = useRecoilValue(isPrimeSelector);
  return (
    <Text style={styles.primeText}>{isPrime ? 'Prime!' : 'Not Prime!'}</Text>
  );
};

const Example04: React.FC = () => {
  const [value, setValue] = useRecoilState(numberTypeAtom);

  const handleChangeText = useCallback(
    (text: string): void => {
      setValue(Number(text));
    },
    [setValue],
  );

  return (
    <View style={styles.container}>
      <TextInput
        editable={true}
        keyboardType={'number-pad'}
        style={styles.inputText}
        value={String(value)}
        onChangeText={handleChangeText}
      />
      <DivisibleBoard />
      <PrimeFlag />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
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
  pill: {
    align: 'center',
    backgroundColor: 'grey',
    borderColor: 'transparent',
    borderRadius: 15,
    borderWidth: 1,
    marginHorizontal: 20,
    marginVertical: 10,
    width: 70,
  },
  pillBoard: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  pillSelected: {
    backgroundColor: 'green',
  },
  pillText: {
    color: 'white',
    fontSize: 25,
    lineHeight: 30,
    textAlign: 'center',
  },
  primeText: {
    color: 'black',
    fontSize: 32,
    fontWeight: 'bold',
  },
});

export default Example04;
