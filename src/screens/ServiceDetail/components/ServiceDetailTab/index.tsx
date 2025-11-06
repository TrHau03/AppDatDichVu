import React, { memo, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { ServiceDetailType } from '../../type';
import { styles } from './styles';

type TabType = 'info' | 'additionalServices' | 'reviews';

interface InfoProps {
  description?: string;
  duration?: string;
  address?: string;
  phoneNumber?: string;
  model?: string;
}

interface MoreServicesProps {
  moreServices?: ServiceDetailType['moreServices'];
  onChangeQuantity: (total: number) => void;
}

interface ServiceDetailTabProps extends ServiceDetailType {}

const Info = memo(
  ({ description, duration, address, phoneNumber, model }: InfoProps) => {
    return (
      <View style={styles.tabContentContainer}>
        <Text style={styles.content}>Mô tả dịch vụ</Text>
        <Text style={styles.descriptionText}>{description}</Text>
        <Text style={styles.content}>Thời lượng: {duration}</Text>
        <Text style={styles.content}>Địa chỉ: {address}</Text>
        <Text style={styles.content}>Số điện thoại: {phoneNumber}</Text>
        <Text style={styles.content}>Mô hình: {model}</Text>
      </View>
    );
  },
);

const MoreServices = memo(
  ({ moreServices, onChangeQuantity }: MoreServicesProps) => {
    const [quantities, setQuantities] = useState<{ [key: string]: number }>({});

    React.useEffect(() => {
      const total = Object.entries(quantities).reduce(
        (sum, [serviceId, qty]) => {
          const service = moreServices?.find(
            (s, index) => (s.title || index.toString()) === serviceId,
          );
          const price = service?.price || 0;
          return sum + qty * price;
        },
        0,
      );
      onChangeQuantity(total);
    }, [quantities]);

    const handleIncrease = (serviceId: string) => {
      setQuantities(prev => ({
        ...prev,
        [serviceId]: (prev[serviceId] || 0) + 1,
      }));
    };

    const handleDecrease = (serviceId: string) => {
      setQuantities(prev => ({
        ...prev,
        [serviceId]: Math.max((prev[serviceId] || 0) - 1, 0),
      }));
    };

    return (
      <View style={styles.tabContentContainer}>
        {moreServices && moreServices.length > 0 ? (
          moreServices.map((service, index) => (
            <View key={index} style={styles.serviceItem}>
              <View style={styles.serviceInfo}>
                <Text style={styles.serviceName}>
                  {service.title || 'Dịch vụ'}
                </Text>
                <Text style={styles.servicePrice}>
                  {service.price?.toLocaleString('vi-VN')}đ
                </Text>
              </View>
              <View style={styles.quantityContainer}>
                <TouchableOpacity
                  style={styles.quantityButton}
                  onPress={() =>
                    handleDecrease(service.title || index.toString())
                  }
                >
                  <Text style={styles.quantityButtonText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.quantityText}>
                  {quantities[service.title || index.toString()] || 0}
                </Text>
                <TouchableOpacity
                  style={styles.quantityButton}
                  onPress={() =>
                    handleIncrease(service.title || index.toString())
                  }
                >
                  <Text style={styles.quantityButtonText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        ) : (
          <Text style={styles.emptyText}>Không có dịch vụ thêm</Text>
        )}
      </View>
    );
  },
);

const ServiceDetailTab = (
  info: ServiceDetailTabProps & { onChangeQuantity: (total: number) => void },
) => {
  const [activeTab, setActiveTab] = useState<TabType>('info');

  const tabs = [
    { key: 'info' as TabType, label: 'Thông tin' },
    { key: 'additionalServices' as TabType, label: 'Dịch vụ thêm' },
    { key: 'reviews' as TabType, label: 'Đánh giá' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'info':
        return <Info {...info} />;
      case 'additionalServices':
        return (
          <MoreServices
            moreServices={info.moreServices}
            onChangeQuantity={info?.onChangeQuantity}
          />
        );
      case 'reviews':
        return <Text style={styles.content}>Đánh giá</Text>;
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        {tabs.map(tab => (
          <TouchableOpacity
            key={tab.key}
            style={[styles.tab, activeTab === tab.key && styles.activeTab]}
            onPress={() => setActiveTab(tab.key)}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === tab.key && styles.activeTabText,
              ]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <ScrollView style={styles.contentContainer}>{renderContent()}</ScrollView>
    </View>
  );
};

export default ServiceDetailTab;
