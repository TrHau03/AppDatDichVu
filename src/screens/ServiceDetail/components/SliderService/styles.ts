import { Dimensions, StyleSheet } from 'react-native';
import { padding } from '../../../../config/styles/spacing';
const { width: SCREEN_WIDTH } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    height: '30%',
    position: 'absolute',
    top: 0,
    zIndex: -1,
  },
  imageContainer: {
    width: SCREEN_WIDTH,
    height: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  dotsContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: padding.md,
    alignSelf: 'center',
    gap: padding.sm,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  activeDot: {
    backgroundColor: '#FFFFFF',
    width: 24,
  },
});
