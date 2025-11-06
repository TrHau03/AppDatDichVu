import { StyleSheet } from 'react-native';
import { padding } from '../../config/styles/spacing';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starContainer: {
    position: 'relative',
  },
  starButton: {
    padding: padding.xs,
  },
  starButtonHalf: {
    paddingLeft: 0,
  },
  halfButton: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: '50%',
    zIndex: 1,
  },
});
