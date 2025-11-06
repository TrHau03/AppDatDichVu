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
  container: {
    backgroundColor: 'white',
    borderRadius: borderRadius.md,
    padding: padding.md,
    width: '85%',
    maxWidth: 400,
  },
  title: {
    fontSize: getFontSize(18),
    fontWeight: 'bold',
    marginBottom: margin.md,
    textAlign: 'center',
  },
  typeSelector: {
    flexDirection: 'row',
    marginBottom: margin.md,
    gap: padding.md,
  },
  typeButton: {
    flex: 1,
    paddingVertical: padding.sm,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    backgroundColor: '#F5F5F5',
  },
  typeButtonActive: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  typeButtonText: {
    textAlign: 'center',
    fontSize: getFontSize(14),
    color: '#666',
  },
  typeButtonTextActive: {
    color: 'white',
    fontWeight: '600',
  },
  inputContainer: {
    marginBottom: margin.md,
  },
  label: {
    fontSize: getFontSize(14),
    fontWeight: '600',
    marginBottom: margin.sm,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: padding.md,
    fontSize: getFontSize(16),
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: padding.sm,
  },
  button: {
    flex: 1,
    paddingVertical: padding.sm,
    borderRadius: borderRadius.md,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#F5F5F5',
  },
  cancelButtonText: {
    color: '#666',
    fontSize: getFontSize(16),
    fontWeight: '600',
  },
  addButton: {
    backgroundColor: '#007AFF',
  },
  addButtonText: {
    color: 'white',
    fontSize: getFontSize(16),
    fontWeight: '600',
  },
  errorText: {
    color: '#ff3b30',
    fontSize: getFontSize(14),
    marginTop: 4,
  },
});
