import { StyleSheet } from 'react-native';
import { borderRadius } from '../../../../config/styles/borderRadius';
import { colors } from '../../../../config/styles/color';
import { padding } from '../../../../config/styles/spacing';
import { getFontSize } from '../../../../utils/normalize';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: padding.md,
    paddingHorizontal: padding.md,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: borderRadius.full,
    backgroundColor: colors.gray3,
  },
  providerInfo: {
    flex: 1,
    gap: padding.xs,
  },
  viewMore: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: padding.xs,
    backgroundColor: colors.blueBG,
    alignSelf: 'flex-start',
    paddingVertical: padding.sm,
    paddingHorizontal: padding.md,
    borderRadius: borderRadius.full,
  },
  viewMoreText: {
    color: colors.blue,
    fontWeight: 'bold',
    fontSize: getFontSize(16),
  },
});
