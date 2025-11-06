import { StyleSheet } from 'react-native';
import { borderRadius } from '../../../../config/styles/borderRadius';
import { colors } from '../../../../config/styles/color';
import { padding } from '../../../../config/styles/spacing';
import { getFontSize } from '../../../../utils/normalize';

export const styles = StyleSheet.create({
  container: {
    padding: padding.md,
    gap: padding.md,
    backgroundColor: `${colors.gray2}60`,
  },
  text: {
    fontSize: getFontSize(16),
    fontWeight: '700',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: padding.sm,
  },
  servicesContainer: {
    backgroundColor: colors.surface,
    padding: padding.md,
    borderRadius: borderRadius.md,
    gap: padding.sm,
  },
  providerContainer: {
    gap: padding.sm,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.full,
    backgroundColor: colors.white,
  },
});
