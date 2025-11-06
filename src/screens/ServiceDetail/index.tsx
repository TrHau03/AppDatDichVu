import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import { View } from 'react-native';
import AppHeader from '../../components/AppHeader';
import Icons from '../../components/AppIcon';
import Footer from '../../components/Footer';
import Wrapper from '../../components/Wrapper';
import { colors } from '../../config/styles/color';
import { mockServiceDetails } from '../../helper/data';
import { useFavoriteService } from '../../hooks/useFavoriteService';
import {
  RootStackEnum,
  RootStackParamList,
  StackNavigationProps,
} from '../../navigation/stack/type';
import ProviderInfo from './components/ProviderInfo';
import ServiceDetailTab from './components/ServiceDetailTab';
import ServiceInfo from './components/ServiceInfo';
import SliderService from './components/SliderService';
import { styles } from './styles';
const RightHeaderComponent = ({ serviceId }: { serviceId: string }) => {
  const { handleFavoriteToggle, isFavorite } = useFavoriteService(serviceId);
  return (
    <View style={styles.rightHeaderContainer}>
      <Icons
        name="heart-outline"
        size="lg"
        el="Ionicons"
        color={isFavorite ? colors.red : colors.blue}
        containerStyle={[
          styles.iconContainer,
          isFavorite && { backgroundColor: `${colors.red}60` },
        ]}
        onPress={handleFavoriteToggle}
      />
      <Icons
        name="share-social-outline"
        size="lg"
        el="Ionicons"
        color={colors.blue}
        containerStyle={styles.iconContainer}
      />
    </View>
  );
};

const ServiceDetail = () => {
  const { serviceId } =
    useRoute<RouteProp<RootStackParamList, RootStackEnum.ServiceDetail>>()
      .params;
  const navigation = useNavigation<StackNavigationProps>();
  const [service, setService] = useState(() => {
    const foundService = mockServiceDetails.find(item => item.id === serviceId);
    return foundService || null;
  });
  const [totalPrice, setTotalPrice] = useState(service?.price || 0);
  if (!service) {
    return null;
  }

  const handlePressFooter = () => {
    navigation.navigate(RootStackEnum.BookService, {
      serviceId: service.id,
      moreServicesTotal: totalPrice - service.price,
    });
  };

  return (
    <Wrapper isSafeArea={false}>
      <AppHeader
        isSafeArea={false}
        rightComponent={<RightHeaderComponent serviceId={serviceId} />}
      />
      <SliderService imageUrl={service?.imageUrl} />
      <View style={styles.contentContainer}>
        <ServiceInfo
          serviceName={service?.name}
          category={service?.category}
          points={service?.points}
          openingHours={service?.openTime}
          closingHours={service?.closeTime}
        />
        <ProviderInfo provider={service.provider} />
        <ServiceDetailTab
          {...service}
          onChangeQuantity={total =>
            setTotalPrice(prev => service.price + total)
          }
        />
        <Footer type="booking" price={totalPrice} onPress={handlePressFooter} />
      </View>
    </Wrapper>
  );
};

export default ServiceDetail;
