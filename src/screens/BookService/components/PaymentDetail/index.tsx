import React from 'react';
import { Text, View } from 'react-native';
import { formatNumber } from '../../../../utils/formatNumber';
import { styles } from './styles';

const PaymentDetail = ({ totalAmount }: { totalAmount: number }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.paymentDetailText}>Chi tiết thanh toán</Text>
      <View style={styles.row}>
        <Text style={styles.text}>Tổng tiền dịch vụ</Text>
        <Text style={styles.text}>{formatNumber(totalAmount)}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.text}>Khuyến mãi / Ưu đãi</Text>
        <Text style={styles.text}>--</Text>
      </View>
    </View>
  );
};

export default PaymentDetail;
