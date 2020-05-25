import React from 'react';
import { StyleSheet, StyleProp, ViewStyle, View } from 'react-native';
import { useTheme } from 'react-native-paper';

type CenterContainerProps = {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};

export default function CenterContainer(props: CenterContainerProps) {
  const { colors } = useTheme();
  return <View style={[styles.container, { backgroundColor: colors.primary }]} {...props} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
