import { Dimensions, PixelRatio, Platform } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const DESIGN_WIDTH = Dimensions.get('window').width;
const DESIGN_HEIGHT = Dimensions.get('window').height;

export const normalize = (size: number): number => {
  const scale = SCREEN_WIDTH / DESIGN_WIDTH;
  const newSize = size * scale;

  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  }
  return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
};

export const getPadding = (base: number, scale: number = 1): number => {
  const isSmallDevice = SCREEN_WIDTH < 375;
  const isMediumDevice = SCREEN_WIDTH >= 375 && SCREEN_WIDTH < 414;
  const isLargeDevice = SCREEN_WIDTH >= 414;

  let padding = base;

  if (isSmallDevice) {
    padding = base * 0.85 * scale;
  } else if (isMediumDevice) {
    padding = base * scale;
  } else if (isLargeDevice) {
    padding = base * 1.15 * scale;
  }

  return normalize(padding);
};

export const getVerticalSpacing = (base: number): number => {
  const scale = SCREEN_HEIGHT / DESIGN_HEIGHT;
  return Math.round(base * scale);
};

export const getFontSize = (size: number): number => {
  const scale = SCREEN_WIDTH / DESIGN_WIDTH;
  const newSize = size * scale;

  const minScale = 0.85;
  const maxScale = 1.15;
  const clampedScale = Math.max(minScale, Math.min(maxScale, scale));

  const fontSize = size * clampedScale;

  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(fontSize));
  }
  return Math.round(PixelRatio.roundToNearestPixel(fontSize));
};
