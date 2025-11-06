import { StyleSheet } from 'react-native';
import { borderRadius } from '../../config/styles/borderRadius';
import { colors } from '../../config/styles/color';
import { margin, padding } from '../../config/styles/spacing';

export const styles = StyleSheet.create({
  container: {
    gap: padding.md,
    marginTop: margin.md,
    paddingBottom: margin.md,
  },
  iconRightComponent: {
    backgroundColor: colors.blueBG,
    borderRadius: borderRadius.full,
  },
});
