import { StyleSheet } from 'react-native';
import { borderRadius } from '../../../../config/styles/borderRadius';
import { colors } from '../../../../config/styles/color';
import { padding } from '../../../../config/styles/spacing';
import { getFontSize } from '../../../../utils/normalize';

const styles = StyleSheet.create({
  container: {
    paddingVertical: padding.md,
    gap: padding.md,
    backgroundColor: colors.surface,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: padding.sm,
    paddingHorizontal: padding.md,
  },
  headerLeft: {
    gap: padding.sm,
  },
  headerRight: { alignItems: 'flex-end', gap: padding.sm },
  name: { fontSize: getFontSize(16), fontWeight: 'bold' },
  details: { fontSize: getFontSize(14), color: colors.gray5 },
  price: { fontSize: getFontSize(16), fontWeight: 'bold', color: colors.black },
  type: { fontSize: getFontSize(14), color: colors.gray5 },
  imageContainer: { paddingHorizontal: padding.md },
  iconContainer: {
    backgroundColor: colors.blueBG,
    borderRadius: borderRadius.full,
  },
  actionContainer: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: padding.md,
    paddingVertical: padding.sm,
    gap: padding.md,
  },
  bookButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.blueBG,
    paddingVertical: padding.sm,
    paddingHorizontal: padding.lg,
    borderRadius: borderRadius.full,
  },
  bookText: {
    color: colors.blue,
    fontSize: getFontSize(16),
    fontWeight: 'bold',
  },
});

export default styles;
