import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { styles } from './styles';

const AppButton = ({
  label,
  onPress,
}: {
  label: string;
  onPress?: () => void;
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={styles.container}
      onPress={onPress}
    >
      <Text style={styles.buttonText}>{label}</Text>
    </TouchableOpacity>
  );
};

export default AppButton;
