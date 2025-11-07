import { StyleSheet } from 'react-native';
import { borderRadius } from '../../config/styles/borderRadius';
import { colors } from '../../config/styles/color';
import { padding } from '../../config/styles/spacing';

export const styles = StyleSheet.create({
  iconContainer: {
    backgroundColor: colors.blueBG,
    borderRadius: borderRadius.full,
  },
  rightHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: padding.md,
  },
  contentContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '70%',
    paddingTop: padding.md,
  },
});
