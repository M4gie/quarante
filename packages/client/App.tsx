import { useFonts, ZillaSlab_400Regular, ZillaSlab_500Medium } from '@expo-google-fonts/zilla-slab';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { Platform } from 'react-native';
import { Provider as PaperProvider, ActivityIndicator } from 'react-native-paper';
import { RecoilRoot } from 'recoil';

import theme from './src/constant/theme';
import HomeStack from './src/navigation/HomeStack';

export default function App() {
  let fontsLoaded;

  if (Platform.OS !== 'web') {
    [fontsLoaded] = useFonts({
      ZillaSlab_400Regular,
      ZillaSlab_500Medium,
    });
  }

  return (
    <>
      <RecoilRoot>
        {Platform.OS !== 'web' && !fontsLoaded ? (
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
