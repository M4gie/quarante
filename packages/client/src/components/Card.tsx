import { FontAwesome5 } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, StyleProp, ViewStyle, TouchableOpacity } from 'react-native';
import { useTheme } from 'react-native-paper';

import Text from '../components/Text';
import { titleCase } from '../utils/text';

type ButtonProps = {
  icon: string;
  title: string;
  subTitle: string;
  players: number;
  style?: StyleProp<ViewStyle>;
  onPress?: (id?: any) => void;
};

export default function Card({ style, ...props }: ButtonProps) {
  const { colors } = useTheme();
  return (
    <TouchableOpacity style={styles.cardContainter} onPress={props.onPress}>
      <FontAwesome5 style={styles.icon} name={props.icon} size={64} color={colors.primary} />
      <Text style={[{ color: colors.primary }, styles.title]} fontFamily="medium" fontSize="lg">
        {props.title.toUpperCase()}
      </Text>
      <Text style={[{ color: colors.primary }, styles.subTitle]} fontFamily="regular" fontSize="md">
        {titleCase(props.subTitle)}
      </Text>
      <Text style={[{ color: colors.primary }]} fontFamily="regular" fontSize="md">
        {props.players} joueurs
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cardContainter: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    width: 200,
    padding: 20,
    margin: 5,
  },
  icon: {
    paddingBottom: 10,
  },
  title: {
    paddingTop: 10,
    textAlign: 'center',
    paddingBottom: 10,
  },
  subTitle: {
    paddingTop: 10,
    marginTop: 'auto',
  },
});
