import React from 'react';

import { Screens } from '@app/navigation/types';

import Example01 from './Example01';
import Example02 from './Example02';
import Example03 from './Example03';
import Example04 from './Example04';
import Example05 from './Example05';
import Example06 from './Example06';
import Example07 from './Example07';
import Example08 from './Example08';

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
  {
    component: Example05,
    route: Screens.Example05,
    title: 'Example 05: Selectors Read/Write',
  },
  {
    component: Example06,
    route: Screens.Example06,
    title: 'Example 06: Selectors without Atom',
  },
  {
    component: Example07,
    route: Screens.Example07,
    title: 'Example 07: Recoil Callbacks',
  },
  {
    component: Example08,
    route: Screens.Example08,
    title: 'Example 08: Track Family Params',
  },
];

export default examples;
