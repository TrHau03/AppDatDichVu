import React, { useEffect, useRef } from 'react';
import { Animated, View } from 'react-native';
import { colors } from '../../../../config/styles/color';
import { padding } from '../../../../config/styles/spacing';

const ServiceItemSkeleton = () => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, []);

  const opacity = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.7],
  });

  const SkeletonBox = ({ width, height, style }: any) => (
    <Animated.View
      style={[
        {
          width,
          height,
          backgroundColor: colors.gray4,
          borderRadius: 8,
          opacity,
        },
        style,
      ]}
    />
  );

  return (
    <View
      style={{
        backgroundColor: colors.white,
        borderRadius: 12,
        padding: padding.md,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
      }}
    >
      {/* Header */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: padding.md,
        }}
      >
        <View style={{ flex: 1 }}>
          <SkeletonBox width="60%" height={20} style={{ marginBottom: 8 }} />
          <SkeletonBox width="80%" height={14} />
        </View>
        <View style={{ alignItems: 'flex-end' }}>
          <SkeletonBox width={80} height={20} style={{ marginBottom: 8 }} />
          <SkeletonBox width={60} height={14} />
        </View>
      </View>

      {/* Images */}
      <View style={{ flexDirection: 'row', gap: 10, marginBottom: padding.md }}>
        <SkeletonBox width={100} height={100} />
        <SkeletonBox width={100} height={100} />
        <SkeletonBox width={100} height={100} />
      </View>

      {/* Actions */}
      <View style={{ flexDirection: 'row', gap: 10 }}>
        <SkeletonBox width="60%" height={40} />
        <SkeletonBox width={40} height={40} />
        <SkeletonBox width={40} height={40} />
      </View>
    </View>
  );
};

export default ServiceItemSkeleton;
