import { StyleSheet } from 'react-native';
import { borderRadius } from '../../../../config/styles/borderRadius';
import { colors } from '../../../../config/styles/color';
import { padding } from '../../../../config/styles/spacing';
import { getFontSize } from '../../../../utils/normalize';

export const styles = StyleSheet.create({
  container: {
    position: 'relative',
    paddingHorizontal: padding.md,
    flexDirection: 'row',
    gap: padding.sm,
  },
  inputContainer: {
    flex: 1,
  },
  actionContainer: {
    flexDirection: 'row',
    gap: padding.sm,
    backgroundColor: colors.gray2,
    borderRadius: borderRadius.md,
  },
  actionText: {
    fontSize: getFontSize(14),
    color: colors.black,
  },
  activeActionText: {
    fontWeight: 'bold',
    color: colors.primary,
  },
  nowActionContainer: {
    backgroundColor: colors.gray2,
    padding: padding.sm,
    gap: padding.sm,
    borderRadius: borderRadius.md,
    flexDirection: 'row',
    alignItems: 'center',
  },
  activeNowActionContainer: {
    backgroundColor: colors.white,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    paddingHorizontal: padding.sm,
    borderRadius: borderRadius.md,
  },
});
