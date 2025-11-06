import { StyleSheet } from 'react-native';
import { borderRadius } from '../../../../config/styles/borderRadius';
import { margin, padding } from '../../../../config/styles/spacing';
import { getFontSize } from '../../../../utils/normalize';

export const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: 'white',
    borderRadius: borderRadius.md,
    padding: padding.md,
    width: '85%',
    maxWidth: 400,
  },
  title: {
    fontSize: getFontSize(18),
    fontWeight: '600',
    marginBottom: margin.md,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: margin.md,
  },
  label: {
    fontSize: getFontSize(16),
    fontWeight: '500',
    marginBottom: margin.xs,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: borderRadius.md,
    padding: padding.sm,
    fontSize: getFontSize(16),
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: margin.md,
    gap: padding.md,
  },
  cancelButton: {
    flex: 1,
    padding: padding.sm,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    color: '#666',
  },
  saveButton: {
    flex: 1,
    padding: padding.sm,
    borderRadius: borderRadius.md,
    backgroundColor: '#007AFF',
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: getFontSize(16),
    color: 'white',
    fontWeight: '600',
  },
});
