import { StyleSheet } from 'react-native';
import { colors } from '../../../../config/styles/color';
import { padding } from '../../../../config/styles/spacing';
import { getFontSize } from '../../../../utils/normalize';

export const styles = StyleSheet.create({
  container: {
    padding: padding.md,
    gap: padding.md,
    backgroundColor: `${colors.gray2}60`,
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: padding.sm,
  },
  addressContent: {
    flex: 1,
    gap: padding.xs,
  },
  addressText: {
    fontSize: getFontSize(16),
    fontWeight: 'bold',
  },
  addressDescription: {
    fontSize: getFontSize(14),
    color: colors.blue,
    fontWeight: '700',
  },
  userPhone: {
    flex: 1,
    fontSize: getFontSize(16),
    fontWeight: 'bold',
  },
  typeText: {
    fontSize: getFontSize(16),
    fontWeight: 'bold',
  },
  descriptionInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    padding: padding.sm,
    fontSize: getFontSize(14),
  },
  saveButton: {
    color: '#007AFF',
    fontWeight: '600',
    fontSize: getFontSize(14),
  },
  cancelButton: {
    color: '#666',
    fontWeight: '600',
    fontSize: getFontSize(14),
  },
});
