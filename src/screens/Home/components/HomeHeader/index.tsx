import React, { memo } from 'react';
import { Text, View } from 'react-native';
import Icons from '../../../../components/AppIcon';
import { colors } from '../../../../config/styles/color';
import { styles } from './styles';

const HomeHeader = () => {
  return (
    <View style={styles.headerContainer}>
      <Icons name="chevron-back" el="Ionicons" color={colors.black} />
      <View>
        <Text style={styles.title}>Địa chỉ của bạn</Text>
        <Text style={styles.subtitle}>Số 5, Đường ABC, Quận 1</Text>
      </View>
    </View>
  );
};

export default memo(HomeHeader);
