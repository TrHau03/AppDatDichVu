import React from 'react';
import { Text, View } from 'react-native';
import Icons from '../../../../components/AppIcon';
import { formatNumber } from '../../../../utils/formatNumber';
import { styles } from './styles';

interface JobInfoProps {
  price: number;
  morePrice?: number;
  provider?: string;
}

const JobInfo = ({ price, morePrice, provider }: JobInfoProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Thông tin công việc</Text>
      <View style={styles.row}>
        <Icons name="clock" size="md" el="Entypo" isPaddingIcon={false} />
        <Text style={styles.text}>Làm ngay</Text>
      </View>
      <View style={styles.row}>
        <Icons
          name="document-text"
          size="md"
          el="Ionicons"
          isPaddingIcon={false}
        />
        <Text style={styles.text}>Dịch vụ:</Text>
      </View>
      <View style={styles.servicesContainer}>
        <View style={styles.row}>
          <Text style={[styles.text, { flex: 1 }]}>Dịch vụ</Text>
          <Text style={styles.text}>{formatNumber(price)}</Text>
        </View>
        {morePrice && (
          <View style={styles.row}>
            <Text style={[styles.text, { flex: 1 }]}>Dịch vụ thêm</Text>
            <Text style={styles.text}>{formatNumber(morePrice) || '0'}</Text>
          </View>
        )}
      </View>
      <View style={styles.providerContainer}>
        <View style={styles.row}>
          <Icons
            name="person-circle"
            size="lg"
            el="Ionicons"
            isPaddingIcon={false}
          />
          <Text style={styles.text}>Người thực hiện</Text>
        </View>
        <View style={styles.row}>
          <View style={styles.avatar} />
          <View>
            <Text style={styles.text}>{provider || 'Chưa có tên'}</Text>
            <Text style={styles.text}>*5.0</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default JobInfo;
