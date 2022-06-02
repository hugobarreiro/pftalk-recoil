import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

import { atom, selector, useRecoilState, useRecoilValue } from 'recoil';

const textAtom = atom<string>({
  default: '',
  key: 'Example02/Text',
});

interface ITextStatsSelector {
  characters: number;
  words: number;
}

const textStatsSelector = selector<ITextStatsSelector>({
  get: ({ get }) => {
    const text = get(textAtom);
    return {
      characters: text.length,
      words: text ? text.trim().split(/\s+/g).length : 0,
    };
  },
  key: 'Example02/Stats',
});

const Constants = {
  labels: {
    characters: 'Characters: ',
    words: 'Words: ',
  },
};

const Stats: React.FC = () => {
  const { characters, words } = useRecoilValue(textStatsSelector);
  return (
    <View style={styles.statsContainer}>
      <Text style={styles.statsLabelText}>
        {Constants.labels.characters}
        <Text style={styles.statsText}>{characters}</Text>
      </Text>
      <Text style={styles.statsLabelText}>
        {Constants.labels.words}
        <Text style={styles.statsText}>{words}</Text>
      </Text>
    </View>
  );
};

const Example02: React.FC = () => {
  const [text, setText] = useRecoilState(textAtom);

  return (
    <View style={styles.container}>
      <TextInput
        accessibilityLabel={'Text input field'}
        editable={true}
        multiline={true}
        style={styles.inputText}
        value={text}
        onChangeText={setText}
      />
      <Stats />
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
  statsContainer: {
    paddingVertical: 30,
  },
  statsLabelText: {
    color: 'black',
    fontSize: 32,
    fontWeight: 'bold',
  },
  statsText: {
    fontWeight: 'normal',
  },
});

export default Example02;
