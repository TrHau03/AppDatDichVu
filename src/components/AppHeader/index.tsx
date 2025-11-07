import { useNavigation } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { Pressable, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../../config/styles/color';
import {
  RootStackEnum,
  StackNavigationProps,
} from '../../navigation/stack/type';
import Icons from '../AppIcon';
import styles from './styles';

interface AppHeaderProps {
  isSafeArea?: boolean;
  title?: string;
  rightComponent?: React.ReactNode;
}

const AppHeader = ({ isSafeArea, title, rightComponent }: AppHeaderProps) => {
  const { top } = useSafeAreaInsets();
  const navigation = useNavigation<StackNavigationProps>();

  const handleGoBack = useCallback(() => {
    navigation.canGoBack()
      ? navigation.goBack()
      : navigation.navigate(RootStackEnum.Home);
  }, [navigation]);
  return (
    <View style={[styles.container, !isSafeArea && { paddingTop: top + 10 }]}>
      <Pressable style={styles.backButton} onPress={handleGoBack}>
        <Icons
          name="arrow-back"
          el="Ionicons"
          size="md"
          color={colors.blue}
          isPaddingIcon={false}
        />
      </Pressable>
      {title && (
        <Text
          style={[styles.title, { maxWidth: rightComponent ? '55%' : '70%' }]}
          numberOfLines={1}
        >
          {title}
        </Text>
      )}
      <View style={styles.rightHeaderContainer}>{rightComponent}</View>
    </View>
  );
};

export default AppHeader;
