import { StyleSheet } from 'react-native';
import { borderRadius } from '../../config/styles/borderRadius';
import { colors } from '../../config/styles/color';
import { padding } from '../../config/styles/spacing';
import { getFontSize } from '../../utils/normalize';

export const styles = StyleSheet.create({
  priceContainer: {
    borderTopLeftRadius: borderRadius.xl,
    borderTopRightRadius: borderRadius.xl,
    paddingHorizontal: padding.md,
    paddingTop: padding.md,
    paddingBottom: padding.lg,
    backgroundColor: colors.white,
    alignItems: 'center',
    gap: padding.md,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 10,
  },
  row: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    gap: padding.md,
  },
  priceLabel: {
    fontSize: getFontSize(16),
  },
  priceValue: {
    fontSize: getFontSize(16),
    fontWeight: 'bold',
  },
  chipContainer: {
    flex: 1,
    backgroundColor: colors.blueBG,
    borderRadius: borderRadius.full,
    padding: padding.sm,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: padding.sm,
  },
  chipText: {
    fontSize: getFontSize(16),
    color: colors.blue,
    fontWeight: '700',
  },
});
