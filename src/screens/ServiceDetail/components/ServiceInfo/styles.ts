import { StyleSheet } from 'react-native';
import { colors } from '../../../../config/styles/color';
import { padding } from '../../../../config/styles/spacing';
import { getFontSize } from '../../../../utils/normalize';

export const styles = StyleSheet.create({
  container: {
    gap: padding.sm,
    paddingHorizontal: padding.md,
  },
  openingHoursContainer: {
    flexDirection: 'row',
  },
  pointsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  name: { fontSize: getFontSize(16), fontWeight: 'bold' },
  category: { fontSize: getFontSize(14), color: colors.gray5 },
  openingHoursText: { fontSize: getFontSize(14), color: colors.gray5 },
  tag: {
    position: 'absolute',
    right: padding.sm,
    paddingVertical: padding.sm,
    paddingHorizontal: padding.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: padding.sm,
    backgroundColor: colors.blueBG,
    borderRadius: 8,
  },
});
