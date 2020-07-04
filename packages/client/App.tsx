import { NavigationContainer } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { Platform } from 'react-native';
import { Provider as PaperProvider, ActivityIndicator } from 'react-native-paper';
import { RecoilRoot } from 'recoil';

import theme from './src/constant/theme';
import HomeStack from './src/navigation/HomeStack';
import loadFonts from './src/utils/fonts';

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  const loadRessources = async () => {
    await loadFonts();
    setFontLoaded(true);
  };

  useEffect(function mount() {
    if (Platform.OS !== 'web') {
      loadRessources();
    }
  }, []);

  return (
    <>
      <RecoilRoot>
        {Platform.OS !== 'web' && !fontLoaded ? (
          <ActivityIndicator />
        ) : (
          <PaperProvider theme={theme}>
            <NavigationContainer linking={{ enabled: true, prefixes: [] }}>
              <HomeStack />
            </NavigationContainer>
          </PaperProvider>
        )}
      </RecoilRoot>
    </>
  );
}
