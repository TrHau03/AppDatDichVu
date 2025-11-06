import React, { useEffect, useRef, useState } from 'react';
import {
  Dimensions,
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  View,
} from 'react-native';
import { styles } from './styles';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const SliderService = ({ imageUrl }: { imageUrl: string[] }) => {
  const scrollViewRef = useRef<ScrollView>(null);
  const [currentIndex, setCurrentIndex] = useState(1);
  const autoScrollTimer = useRef<any>(null);

  // Clone images để tạo hiệu ứng vô hạn
  const clonedImages = [
    imageUrl[imageUrl.length - 1],
    ...imageUrl,
    imageUrl[0],
  ];

  // Auto scroll
  useEffect(() => {
    startAutoScroll();
    return () => {
      if (autoScrollTimer.current) {
        clearInterval(autoScrollTimer.current);
      }
    };
  }, [currentIndex]);

  const startAutoScroll = () => {
    if (autoScrollTimer.current) {
      clearInterval(autoScrollTimer.current);
    }

    autoScrollTimer.current = setInterval(() => {
      const nextIndex = currentIndex + 1;
      scrollViewRef.current?.scrollTo({
        x: nextIndex * SCREEN_WIDTH,
        animated: true,
      });
    }, 3000);
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / SCREEN_WIDTH);

    if (index !== currentIndex) {
      setCurrentIndex(index);
    }
  };

  const handleScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / SCREEN_WIDTH);

    if (index === 0) {
      // scroll về image cuối
      scrollViewRef.current?.scrollTo({
        x: imageUrl.length * SCREEN_WIDTH,
        animated: false,
      });
      setCurrentIndex(imageUrl.length);
    } else if (index === clonedImages.length - 1) {
      // scroll về image đầu
      scrollViewRef.current?.scrollTo({
        x: SCREEN_WIDTH,
        animated: false,
      });
      setCurrentIndex(1);
    }
  };

  // Tính index thật
  const getRealIndex = () => {
    if (currentIndex === 0) return imageUrl.length - 1;
    if (currentIndex === clonedImages.length - 1) return 0;
    return currentIndex - 1;
  };

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        onMomentumScrollEnd={handleScrollEnd}
        scrollEventThrottle={16}
        contentOffset={{ x: SCREEN_WIDTH, y: 0 }}
      >
        {clonedImages.map((url, index) => (
          <View key={index} style={styles.imageContainer}>
            <Image source={{ uri: url }} style={styles.image} />
          </View>
        ))}
      </ScrollView>

      {/* Dots indicator */}
      <View style={styles.dotsContainer}>
        {imageUrl.map((_, index) => (
          <View
            key={index}
            style={[styles.dot, getRealIndex() === index && styles.activeDot]}
          />
        ))}
      </View>
    </View>
  );
};

export default SliderService;
