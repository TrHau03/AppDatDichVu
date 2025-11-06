import { useNavigation } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { Pressable, Text, View } from 'react-native';
import { useAppSelector } from '../../hooks/useRedux';
import {
  RootStackEnum,
  StackNavigationProps,
} from '../../navigation/stack/type';
import { formatNumber } from '../../utils/formatNumber';
import AppButton from '../AppButton';
import Icons from '../AppIcon';
import { styles } from './styles';
interface FooterProps {
  type: 'booking' | 'request';
  price: number;
  onPress?: () => void;
}

const Footer = ({ price, type, onPress }: FooterProps) => {
  const navigation = useNavigation<StackNavigationProps>();
  const currentPaymentMethod = useAppSelector(
    state => state.root.user.payment.current,
  );
  const handleOnPressCard = useCallback(() => {
    navigation.navigate(RootStackEnum.PaymentMethod);
  }, []);

  return (
    <View style={[styles.priceContainer]}>
      <View style={styles.row}>
        <Text style={styles.priceLabel}>Tổng tiền:</Text>
        <Text style={styles.priceValue}>{formatNumber(price)}</Text>
      </View>
      {type === 'request' && (
        <View style={styles.row}>
          <Pressable style={styles.chipContainer} onPress={handleOnPressCard}>
            <Icons name="card-outline" el="Ionicons" isPaddingIcon={false} />
            <Text style={styles.chipText}>
              {currentPaymentMethod.type === 'cash' && 'Tiền mặt'}
              {currentPaymentMethod.type === 'bank' && 'Thẻ'}
              {currentPaymentMethod.type === 'wallet' && 'Ví'}{' '}
              {currentPaymentMethod.cardNumber?.slice(
                currentPaymentMethod.cardNumber.length - 4,
                currentPaymentMethod.cardNumber.length,
              )}
            </Text>
            <Icons
              name="chevron-down-outline"
              el="Ionicons"
              isPaddingIcon={false}
            />
          </Pressable>
          <View style={styles.chipContainer}>
            <Text style={styles.chipText}>Ưu đãi</Text>
            <Icons
              name="chevron-down-outline"
              el="Ionicons"
              isPaddingIcon={false}
            />
          </View>
        </View>
      )}
      <AppButton
        label={type === 'booking' ? 'Xác nhận' : 'Tạo yêu cầu'}
        onPress={onPress}
      />
    </View>
  );
};

export default Footer;
