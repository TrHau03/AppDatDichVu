import { StyleSheet } from 'react-native';
import { borderRadius } from '../../config/styles/borderRadius';
import { colors } from '../../config/styles/color';
import { padding } from '../../config/styles/spacing';
import { getFontSize } from '../../utils/normalize';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: padding.md,
    alignItems: 'center',
    flexDirection: 'row',
    gap: padding.md,
  },
  title: {
    fontSize: getFontSize(18),
    fontWeight: 'bold',
    maxWidth: '55%',
  },
  backButton: {
    padding: padding.sm,
    borderRadius: borderRadius.full,
    backgroundColor: colors.blueBG,
  },
  rightHeaderContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
});
export default styles;
