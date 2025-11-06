import { getPadding } from '../../utils/normalize';

export const padding = {
  xs: getPadding(4),
  sm: getPadding(8),
  md: getPadding(16),
  lg: getPadding(24),
  xl: getPadding(32),
  xxl: getPadding(48),
} as const;

export const margin = {
  xs: getPadding(4),
  sm: getPadding(8),
  md: getPadding(16),
  lg: getPadding(24),
  xl: getPadding(32),
  xxl: getPadding(48),
} as const;
