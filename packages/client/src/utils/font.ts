import { loadAsync } from 'expo-font';

export default async function loadFonts() {
  try {
    await loadAsync({
      'zilla-slab-regular': require('../../assets/fonts/ZillaSlab-Regular.ttf'),
      'zilla-slab-medium': require('../../assets/fonts/ZillaSlab-Medium.ttf'),
      'zilla-slab-light': require('../../assets/fonts/ZillaSlab-Light.ttf'),
    });
  } catch (e) {
    console.warn("Can't load font: ", e?.code, e?.message);
  }
}
