import { useFonts, ZillaSlab_400Regular, ZillaSlab_500Medium } from '@expo-google-fonts/zilla-slab';
import { NavigationContainer } from '@react-navigation/native';
import { FontDisplay } from 'expo-font';
import React from 'react';
import { Platform } from 'react-native';
import { Provider as PaperProvider, ActivityIndicator } from 'react-native-paper';
import { RecoilRoot } from 'recoil';

import theme from './src/constant/theme';
import HomeStack from './src/navigation/HomeStack';

export default function App() {
  const [fontsLoaded] = useFonts({
    ZillaSlab_400Regular: { uri: ZillaSlab_400Regular, display: FontDisplay.SWAP },
    ZillaSlab_500Medium: { uri: ZillaSlab_500Medium, display: FontDisplay.SWAP },
  });

  return (
    <>
      <RecoilRoot>
        {!fontsLoaded && Platform.OS !== 'web' ? (
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
