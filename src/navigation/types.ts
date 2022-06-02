import { NavigationProp } from '@react-navigation/native';

export enum Screens {
  Example01 = 'Example01',
  Example02 = 'Example02',
  Example03 = 'Example03',
  Example04 = 'Example04',
  Home = 'Home',
}

export type TNavigationParamsList = Record<Screens, undefined>;
export type TRootNavigationProps = NavigationProp<TNavigationParamsList>;
