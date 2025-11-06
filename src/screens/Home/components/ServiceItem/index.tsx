import { useNavigation } from '@react-navigation/native';
import React, { memo, useCallback } from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Icons from '../../../../components/AppIcon';
import { colors } from '../../../../config/styles/color';
import { useFavoriteService } from '../../../../hooks/useFavoriteService';
import {
  RootStackEnum,
  StackNavigationProps,
} from '../../../../navigation/stack/type';
import { formatNumber } from '../../../../utils/formatNumber';
import styles from './styles';
import { Service } from './type';

const ServiceAction = memo(({ serviceId }: { serviceId: string }) => {
  const navigation = useNavigation<StackNavigationProps>();
  const { handleFavoriteToggle, isFavorite } = useFavoriteService(serviceId);

  const handleBookNow = useCallback(() => {
    navigation.navigate(RootStackEnum.ServiceDetail, { serviceId });
  }, [navigation, serviceId]);

  return (
    <View style={styles.actionContainer}>
      <Pressable style={styles.bookButton} onPress={handleBookNow}>
        <Text style={styles.bookText}>Book ngay</Text>
      </Pressable>
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
});

const ServiceItem = ({ service }: { service: Service }) => {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.headerLeft}>
          <Text style={styles.name}>{service.name}</Text>
          <Text style={styles.details}>
            {service.points} • {service.provider} • {service.distance}
          </Text>
        </View>
        <View style={styles.headerRight}>
          <Text style={styles.price}>{formatNumber(service.price)}</Text>
          <Text style={styles.type}>{service.type}</Text>
        </View>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.imageContainer}
      >
        {service.imageUrl.map((url, index) => (
          <View key={index} style={{ marginRight: 10 }}>
            <Image
              source={{ uri: url }}
              alt={`Service ${service.name} ${index + 1}`}
              style={{ width: 100, height: 100, borderRadius: 8 }}
            />
          </View>
        ))}
      </ScrollView>
      <ServiceAction serviceId={service.id} />
    </View>
  );
};

export default ServiceItem;
