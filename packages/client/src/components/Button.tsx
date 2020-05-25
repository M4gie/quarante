import React from 'react';
import { StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { Button as PaperButton, useTheme } from 'react-native-paper';

type ButtonProps = {
  children: React.ReactNode;
  primary?: boolean;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
};

export default function Button(props: ButtonProps) {
  const { colors } = useTheme();
  return (
    <PaperButton
      {...props}
      style={[
        props.style,
        styles.button,
        { backgroundColor: props.primary ? colors.primary : colors.text },
      ]}>
      {props.children}
    </PaperButton>
  );
}

const styles = StyleSheet.create({
  button: {
    margin: 2,
  },
});
