import { StyleSheet } from 'react-native';
import { padding } from '../../../../config/styles/spacing';
import { getFontSize } from '../../../../utils/normalize';

export const styles = StyleSheet.create({
  headerContainer: {
    paddingRight: padding.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: padding.sm,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: getFontSize(12),
    color: '#666',
  },
  subtitle: {
    fontSize: getFontSize(14),
    fontWeight: 'bold',
  },
});
