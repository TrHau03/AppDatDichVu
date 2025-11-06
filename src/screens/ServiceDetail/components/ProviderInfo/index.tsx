import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-gesture-handler';
import Icons from '../../../../components/AppIcon';
import { colors } from '../../../../config/styles/color';
import { styles } from './styles';

interface ProviderInfoProps {
  provider?: string;
}

const ProviderInfo = ({ provider }: ProviderInfoProps) => {
  return (
    <View style={styles.container}>
      {/* Mock avatar */}
      <View style={styles.avatar} />
      <View style={styles.providerInfo}>
        <Text>{provider}</Text>
        <Text>*5.0</Text>
      </View>
      <View style={styles.viewMore}>
        <Text style={styles.viewMoreText}>Xem thêm</Text>
        <Icons
          name="chevron-forward"
          el="Ionicons"
          isPaddingIcon={false}
          size="md"
          color={colors.blue}
        />
      </View>
    </View>
  );
};

export default ProviderInfo;
