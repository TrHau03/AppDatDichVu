import { StyleSheet } from 'react-native';
import { margin } from '../../../config/styles/spacing';
import Device from '../../../utils/device';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: Device.getDeviceWidth() - 40,
    height: 48,
    backgroundColor: '#0FA958',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  label: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  heading: {
    fontWeight: 'bold',
    fontSize: 20,
    marginVertical: margin.lg,
  },
  description: {
    textAlign: 'center',
    marginHorizontal: margin.xl,
    marginBottom: margin.lg,
    fontSize: 16,
  },
});

export default styles;
