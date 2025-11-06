import React from 'react';
import { Text, View } from 'react-native';
import Icons from '../../../../components/AppIcon';
import StarRange from '../../../../components/StarRange';
import { colors } from '../../../../config/styles/color';
import { styles } from './styles';

interface ServiceInfoProps {
  serviceName: string;
  category: string;
  points: number;
  openingHours: string;
  closingHours: string;
}

const ServiceInfo = ({
  serviceName,
  category,
  points,
  openingHours,
  closingHours,
}: ServiceInfoProps) => {
  const checkIsOpen = () => {
    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes();

    const [openHour, openMinute] = openingHours.split(':').map(Number);
    const [closeHour, closeMinute] = closingHours.split(':').map(Number);

    const openTime = openHour * 60 + openMinute;
    const closeTime = closeHour * 60 + closeMinute;

    return currentTime >= openTime && currentTime <= closeTime;
  };

  const isOpen = checkIsOpen();

  return (
    <View style={styles.container}>
      <Text style={styles.name}>Tên dịch vụ: {serviceName}</Text>
      <Text style={styles.category}>Danh mục: {category}</Text>
      <View style={styles.pointsContainer}>
        <StarRange value={points} />
        <Text>{points}</Text>
      </View>
      <View style={styles.openingHoursContainer}>
        <Text
          style={[styles.openingHoursText, { color: isOpen ? 'green' : 'red' }]}
        >
          {isOpen ? 'Đang hoạt động ' : 'Đã đóng cửa '}
        </Text>
        <Text style={styles.openingHoursText}>
          • {openingHours} - {closingHours}
        </Text>
      </View>
      <View style={styles.tag}>
        <Icons
          name="flash"
          el="Ionicons"
          color={colors.primary}
          isPaddingIcon={false}
        />
        <Text>Làm ngay</Text>
      </View>
    </View>
  );
};

export default ServiceInfo;
