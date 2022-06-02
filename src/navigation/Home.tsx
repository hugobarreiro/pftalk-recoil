import React from 'react';
import { Button, StyleSheet, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import examples from '@app/examples';
import { TRootNavigationProps } from '@app/navigation/types';

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<TRootNavigationProps>();
  return (
    <View style={styles.container}>
      {examples.map((config) => (
        <Button
          key={config.route}
          title={config.title}
          onPress={() => navigation.navigate(config.route)}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'space-evenly',
    paddingVertical: 100,
  },
});

export default HomeScreen;
