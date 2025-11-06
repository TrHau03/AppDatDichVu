import { StyleSheet } from 'react-native';
import { colors } from '../../../../config/styles/color';
import { padding } from '../../../../config/styles/spacing';
import { getFontSize } from '../../../../utils/normalize';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: padding.md,
    gap: padding.md,
    backgroundColor: `${colors.gray2}60`,
  },
  paymentDetailText: {
    fontSize: getFontSize(18),
    fontWeight: '600',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    fontSize: getFontSize(16),
  },
});
