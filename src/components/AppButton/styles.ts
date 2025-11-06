import { StyleSheet } from 'react-native';
import { borderRadius } from '../../config/styles/borderRadius';
import { colors } from '../../config/styles/color';
import { padding } from '../../config/styles/spacing';

export const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: colors.blue,
    paddingVertical: padding.md,
    borderRadius: borderRadius.full,
  },
  buttonText: {
    color: colors.white,
    fontWeight: '600',
  },
});
