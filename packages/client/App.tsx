import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Provider as PaperProvider, ActivityIndicator } from 'react-native-paper';

import theme from './src/constant/theme';
import HomeStack from './src/navigation/HomeStack';
import loadFonts from './src/utils/font';

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  const loadRessources = async () => {
    await loadFonts();
    setFontLoaded(true);
  };

  useEffect(function mount() {
    loadRessources();
  }, []);

  return (
    <>
      {fontLoaded ? (
        <PaperProvider theme={theme}>
          <NavigationContainer linking={{ enabled: true, prefixes: [] }}>
            <HomeStack />
          </NavigationContainer>
        </PaperProvider>
      ) : (
        <ActivityIndicator />
      )}
    </>
  );
}
