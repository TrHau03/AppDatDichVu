import { StyleSheet } from 'react-native';
import { borderRadius } from '../../config/styles/borderRadius';
import { margin, padding } from '../../config/styles/spacing';
import { getFontSize } from '../../utils/normalize';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: padding.md,
  },
  cardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: padding.md,
    backgroundColor: '#fff',
    borderRadius: borderRadius.md,
    marginBottom: margin.sm,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: borderRadius.lg,
    borderWidth: 2,
    borderColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: margin.sm,
  },
  checkboxInner: {
    width: 14,
    height: 14,
    borderRadius: borderRadius.md,
    backgroundColor: '#007AFF',
  },
  cardInfo: {
    flex: 1,
  },
  cardLabel: {
    fontSize: getFontSize(16),
    fontWeight: '600',
    color: '#333',
  },
  cardNumber: {
    fontSize: 14,
    color: '#666',
    marginTop: margin.sm,
  },
  addButton: {
    marginTop: margin.md,
    padding: padding.md,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: '#007AFF',
    borderStyle: 'dashed',
    alignItems: 'center',
  },
  addButtonText: {
    color: '#007AFF',
    fontSize: getFontSize(16),
    fontWeight: '600',
  },
  removeIcon: {},
});
