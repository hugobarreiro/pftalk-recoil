import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import examples from '@app/examples';

import HomeScreen from './Home';
import { Screens, TNavigationParamsList } from './types';

const RootStack = createNativeStackNavigator<TNavigationParamsList>();

const RootNavigation: React.FC = () => {
  return (
    <RootStack.Navigator initialRouteName={Screens.Home}>
      <RootStack.Screen component={HomeScreen} name={Screens.Home} />
      <RootStack.Group>
        {examples.map((example) => (
          <RootStack.Screen
            component={example.component}
            key={example.route}
            name={example.route}
            options={{ title: example.title }}
          />
        ))}
      </RootStack.Group>
    </RootStack.Navigator>
  );
};

export default RootNavigation;
