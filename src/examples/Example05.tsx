import React, { useCallback, useMemo } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import {
  atom,
  readOnlySelector,
  selectorFamily,
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
} from 'recoil';

const techs = ['Android', 'GraphQL', 'iOS', 'React', 'React Native'] as const;

type TTechs = typeof techs[number];

const techsAtom = atom<Set<TTechs>>({
  default: new Set(),
  key: 'Example05/Techs',
});

const techsAtomReadonly = readOnlySelector(techsAtom);

const isSelectedSelector = selectorFamily<boolean, TTechs>({
  get:
    (tech) =>
    ({ get }) =>
      get(techsAtom).has(tech),
  key: 'Example05/IsSelected',
  set:
    (tech) =>
    ({ set }, isSelected) => {
      if (isSelected) {
        set(techsAtom, (prevState) => {
          const newState = new Set(prevState);
          newState.add(tech);
          return newState;
        });
      } else {
        set(techsAtom, (prevState) => {
          const newState = new Set(prevState);
          newState.delete(tech);
          return newState;
        });
      }
    },
});

const SelectedList: React.FC = () => {
  const selected = useRecoilValue(techsAtomReadonly);

  return (
    <Text style={styles.selectedText}>
      {JSON.stringify(Array.from(selected), undefined, 2)}
    </Text>
  );
};

interface IPillProps {
  tech: TTechs;
}

const Pill: React.FC<IPillProps> = ({ tech }) => {
  const [isSelected, setIsSelected] = useRecoilState(isSelectedSelector(tech));
  const handlePress = useCallback(() => {
    setIsSelected((prevState) => !prevState);
  }, [setIsSelected]);
  return (
    <TouchableOpacity
      style={[styles.pill, isSelected && styles.pillSelected]}
      onPress={handlePress}
    >
      <Text style={styles.pillText}>{tech}</Text>
    </TouchableOpacity>
  );
};

const ResetPill: React.FC = () => {
  const reset = useResetRecoilState(techsAtom);
  return (
    <TouchableOpacity style={styles.pill} onPress={reset}>
      <Text style={styles.pillText}>{'Reset'}</Text>
    </TouchableOpacity>
  );
};

const Example05: React.FC = () => {
  const pills = useMemo(
    () => techs.map((tech) => <Pill key={tech} tech={tech} />),
    [],
  );
  return (
    <View style={styles.container}>
      <SelectedList />
      {pills}
      <ResetPill />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
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
  pillSelected: {
    backgroundColor: 'green',
  },
  pillText: {
    color: 'white',
    fontSize: 25,
    lineHeight: 30,
    textAlign: 'center',
  },
  selectedText: {
    color: 'black',
    fontSize: 32,
    fontWeight: 'bold',
  },
});

export default Example05;
