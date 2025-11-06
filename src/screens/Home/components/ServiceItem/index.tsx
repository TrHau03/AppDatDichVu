import React from 'react';
import { Text, View } from 'react-native';
import styles from './styles';
import { Service } from './type';

const ServiceItem = ({ service }: { service: Service }) => {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.headerLeft}>
          <Text>{service.name}</Text>
          <Text>
            {service.points} • {service.provider} • {service.distance}
          </Text>
        </View>
        <View style={styles.headerRight}>
          <Text>{service.price} VND</Text>
          <Text>{service.type}</Text>
        </View>
      </View>
    </View>
  );
};

export default ServiceItem;
