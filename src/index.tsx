import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { RecoilRoot } from 'recoil';

import RootNavigation from '@app/navigation';

const App: React.FC = () => {
  return (
    <RecoilRoot>
      <NavigationContainer>
        <RootNavigation />
      </NavigationContainer>
    </RecoilRoot>
  );
};

export default App;
