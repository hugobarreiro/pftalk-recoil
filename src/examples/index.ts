import React from 'react';

import { Screens } from '@app/navigation/types';

import Example01 from './Example01';
import Example02 from './Example02';
import Example03 from './Example03';
import Example04 from './Example04';

interface IExampleConfig {
  component: React.ComponentType;
  route: Screens;
  title: string;
}
const examples: IExampleConfig[] = [
  {
    component: Example01,
    route: Screens.Example01,
    title: 'Example 01: Atom',
  },
  {
    component: Example02,
    route: Screens.Example02,
    title: 'Example 02: Selector',
  },
  {
    component: Example03,
    route: Screens.Example03,
    title: 'Example 03: Atom Family',
  },
  {
    component: Example04,
    route: Screens.Example04,
    title: 'Example 04: Selector Family',
  },
];

export default examples;
