import { StyleSheet } from 'react-native';
import { borderRadius } from '../../../../config/styles/borderRadius';
import { colors } from '../../../../config/styles/color';
import { margin, padding } from '../../../../config/styles/spacing';
import { getFontSize } from '../../../../utils/normalize';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: padding.md,
  },
  tab: {
    flex: 1,
    paddingVertical: padding.sm,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: colors.primary,
  },
  tabText: {
    fontSize: getFontSize(14),
    color: '#666',
  },
  activeTabText: {
    color: colors.white,
    fontWeight: '600',
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: padding.md,
  },
  content: {
    fontSize: getFontSize(14),
    color: colors.black,
    fontWeight: '600',
  },
  descriptionText: {
    fontSize: getFontSize(14),
    color: colors.gray5,
  },
  tabContentContainer: {
    flex: 1,
    marginVertical: padding.md,
    backgroundColor: colors.gray2,
    borderRadius: borderRadius.md,
    padding: padding.md,
    gap: padding.sm,
  },
  sectionTitle: {
    fontSize: getFontSize(18),
    fontWeight: '600',
    marginBottom: margin.sm,
    color: '#000',
  },
  serviceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: padding.sm,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  serviceInfo: {
    flex: 1,
  },
  serviceName: {
    fontSize: getFontSize(16),
    fontWeight: '500',
    color: '#000',
    marginBottom: margin.xs,
  },
  servicePrice: {
    fontSize: getFontSize(14),
    color: '#666',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: padding.sm,
  },
  quantityButton: {
    width: 32,
    height: 32,
    borderRadius: borderRadius.lg,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButtonText: {
    fontSize: getFontSize(20),
    color: '#fff',
    fontWeight: '600',
  },
  quantityText: {
    fontSize: getFontSize(16),
    fontWeight: '500',
    minWidth: 24,
    textAlign: 'center',
  },
  emptyText: {
    fontSize: getFontSize(14),
    color: '#999',
    textAlign: 'center',
    marginTop: margin.lg,
  },
});
